import { randomUUID } from "crypto";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../config/prisma";
import { AppError } from "../../common/http";
import { AccountingService } from "./accounting.service";
import {
  FINANCIAL_TEMPLATE_SEED_LINES,
  TemplateStatementSide,
  TemplateStatementType,
} from "./financial-statements.data";

type TemplateLineRow = {
  id: string;
  statementType: TemplateStatementType;
  statementSide: TemplateStatementSide;
  rowOrder: number;
  ref: string | null;
  label: string;
  note: string | null;
  sign: string | null;
  accountPrefixes: Prisma.JsonValue | null;
  formula: string | null;
  isTitle: boolean;
};

type AccountBalanceForCalc = {
  accountNumber: string;
  debit: number;
  credit: number;
};

type ComputedLine = {
  rowOrder: number;
  ref: string | null;
  label: string;
  note: string | null;
  sign: string | null;
  isTitle: boolean;
  amount: number | null;
};

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function normalizePrefixes(value: Prisma.JsonValue | null): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function evaluateFormula(formula: string, valuesByRef: Map<string, number>): number {
  const compact = formula.replace(/\s+/g, "");
  const tokens = compact.match(/[+-]?[^+-]+/g) ?? [];
  let total = 0;

  for (const token of tokens) {
    const sign = token.startsWith("-") ? -1 : 1;
    const ref = token.replace(/^[+-]/, "").trim();
    total += sign * (valuesByRef.get(ref) ?? 0);
  }

  return round2(total);
}

export class FinancialStatementsService {
  private static async ensureTemplateTable(): Promise<void> {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "financial_statement_template_lines" (
        "id" TEXT PRIMARY KEY,
        "statementType" TEXT NOT NULL,
        "statementSide" TEXT NOT NULL,
        "rowOrder" INTEGER NOT NULL,
        "ref" TEXT,
        "label" TEXT NOT NULL,
        "note" TEXT,
        "sign" TEXT,
        "accountPrefixes" JSONB,
        "formula" TEXT,
        "isTitle" BOOLEAN NOT NULL DEFAULT FALSE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        UNIQUE ("statementType", "statementSide", "rowOrder")
      );
    `);
  }

  private static async ensureTemplateSeeded(): Promise<void> {
    await this.ensureTemplateTable();

    const [{ count }] = (await prisma.$queryRawUnsafe(
      `SELECT COUNT(*)::int AS count FROM "financial_statement_template_lines"`,
    )) as Array<{ count: number }>;

    if (count > 0) return;

    for (const line of FINANCIAL_TEMPLATE_SEED_LINES) {
      await prisma.$executeRaw`
        INSERT INTO "financial_statement_template_lines" (
          "id",
          "statementType",
          "statementSide",
          "rowOrder",
          "ref",
          "label",
          "note",
          "sign",
          "accountPrefixes",
          "formula",
          "isTitle"
        ) VALUES (
          ${randomUUID()},
          ${line.statementType},
          ${line.statementSide},
          ${line.rowOrder},
          ${line.ref},
          ${line.label},
          ${line.note},
          ${line.sign},
          ${JSON.stringify(line.accountPrefixes)}::jsonb,
          ${line.formula},
          ${line.isTitle}
        )
        ON CONFLICT ("statementType", "statementSide", "rowOrder")
        DO UPDATE SET
          "ref" = EXCLUDED."ref",
          "label" = EXCLUDED."label",
          "note" = EXCLUDED."note",
          "sign" = EXCLUDED."sign",
          "accountPrefixes" = EXCLUDED."accountPrefixes",
          "formula" = EXCLUDED."formula",
          "isTitle" = EXCLUDED."isTitle",
          "updatedAt" = NOW();
      `;
    }
  }

  private static async getTemplateLines(
    statementType: TemplateStatementType,
    statementSide: TemplateStatementSide,
  ): Promise<TemplateLineRow[]> {
    await this.ensureTemplateSeeded();

    return (await prisma.$queryRaw`
      SELECT
        id,
        "statementType",
        "statementSide",
        "rowOrder",
        ref,
        label,
        note,
        sign,
        "accountPrefixes",
        formula,
        "isTitle"
      FROM "financial_statement_template_lines"
      WHERE "statementType" = ${statementType}
        AND "statementSide" = ${statementSide}
      ORDER BY "rowOrder" ASC;
    `) as TemplateLineRow[];
  }

  private static sumByPrefixes(balances: AccountBalanceForCalc[], prefixes: string[]): { debit: number; credit: number } {
    if (prefixes.length === 0) return { debit: 0, credit: 0 };

    let debit = 0;
    let credit = 0;

    for (const balance of balances) {
      if (!prefixes.some((prefix) => balance.accountNumber.startsWith(prefix))) continue;
      debit += balance.debit;
      credit += balance.credit;
    }

    return { debit: round2(debit), credit: round2(credit) };
  }

  private static computeDirectAmount(
    line: TemplateLineRow,
    balances: AccountBalanceForCalc[],
    statementType: TemplateStatementType,
    statementSide: TemplateStatementSide,
  ): number | null {
    const prefixes = normalizePrefixes(line.accountPrefixes);
    if (prefixes.length === 0) return null;

    const totals = this.sumByPrefixes(balances, prefixes);
    const sign = (line.sign ?? "").trim();

    if (sign === "+") return round2(totals.credit - totals.debit);
    if (sign === "-") return round2(totals.debit - totals.credit);
    if (sign === "+/-") return round2(totals.credit - totals.debit);
    if (sign === "-/+") return round2(totals.debit - totals.credit);

    if (statementType === "BALANCE_SHEET") {
      return statementSide === "PASSIF"
        ? round2(totals.credit - totals.debit)
        : round2(totals.debit - totals.credit);
    }

    return round2(Math.abs(totals.credit - totals.debit));
  }

  private static async getBalancesForFiscalYear(fiscalYearId: string): Promise<AccountBalanceForCalc[]> {
    const balances = await AccountingService.getAccountBalances(fiscalYearId);
    return balances.map((line) => ({
      accountNumber: line.accountNumber,
      debit: toNumber(line.debit),
      credit: toNumber(line.credit),
    }));
  }

  private static async resolvePreviousFiscalYearId(fiscalYearId: string): Promise<string | null> {
    const current = await prisma.fiscalYear.findUnique({ where: { id: fiscalYearId } });
    if (!current) throw new AppError("Exercice comptable non trouve", 404);

    const previous = await prisma.fiscalYear.findFirst({
      where: { endDate: { lt: current.startDate } },
      orderBy: { endDate: "desc" },
      select: { id: true },
    });

    return previous?.id ?? null;
  }

  private static computeLines(
    lines: TemplateLineRow[],
    balances: AccountBalanceForCalc[],
    statementType: TemplateStatementType,
    statementSide: TemplateStatementSide,
  ): ComputedLine[] {
    const valuesByRef = new Map<string, number>();
    const output: ComputedLine[] = [];

    for (const line of lines) {
      let amount = this.computeDirectAmount(line, balances, statementType, statementSide);

      if (line.formula) {
        amount = evaluateFormula(line.formula, valuesByRef);
      }

      if (line.ref && amount !== null) {
        valuesByRef.set(line.ref, amount);
      }

      output.push({
        rowOrder: line.rowOrder,
        ref: line.ref,
        label: line.label,
        note: line.note,
        sign: line.sign,
        isTitle: line.isTitle,
        amount,
      });
    }

    return output;
  }

  static async getIncomeStatementV2(fiscalYearId: string) {
    const [currentLines, previousFiscalYearId] = await Promise.all([
      this.getTemplateLines("INCOME_STATEMENT", "MAIN"),
      this.resolvePreviousFiscalYearId(fiscalYearId),
    ]);

    const [balancesN, balancesN1] = await Promise.all([
      this.getBalancesForFiscalYear(fiscalYearId),
      previousFiscalYearId ? this.getBalancesForFiscalYear(previousFiscalYearId) : Promise.resolve([]),
    ]);

    const computedN = this.computeLines(currentLines, balancesN, "INCOME_STATEMENT", "MAIN");
    const computedN1 = this.computeLines(currentLines, balancesN1, "INCOME_STATEMENT", "MAIN");

    const n1Map = new Map(computedN1.filter((line) => line.ref).map((line) => [line.ref as string, line.amount]));

    const rows = computedN.map((line) => ({
      rowOrder: line.rowOrder,
      ref: line.ref,
      libelle: line.label,
      note: line.note,
      signe: line.sign,
      isTitle: line.isTitle,
      exercice: {
        n: line.amount,
        n1: line.ref ? (n1Map.get(line.ref) ?? null) : null,
      },
    }));

    const net = rows.find((line) => line.ref === "XI")?.exercice.n ?? 0;

    return {
      fiscalYearId,
      previousFiscalYearId,
      structure: rows,
      chiffres: {
        resultatNet: net,
      },
    };
  }

  static async getBalanceSheetV2(fiscalYearId: string) {
    const [actifLines, passifLines, previousFiscalYearId] = await Promise.all([
      this.getTemplateLines("BALANCE_SHEET", "ACTIF"),
      this.getTemplateLines("BALANCE_SHEET", "PASSIF"),
      this.resolvePreviousFiscalYearId(fiscalYearId),
    ]);

    const [balancesN, balancesN1] = await Promise.all([
      this.getBalancesForFiscalYear(fiscalYearId),
      previousFiscalYearId ? this.getBalancesForFiscalYear(previousFiscalYearId) : Promise.resolve([]),
    ]);

    const actifN = this.computeLines(actifLines, balancesN, "BALANCE_SHEET", "ACTIF");
    const actifN1 = this.computeLines(actifLines, balancesN1, "BALANCE_SHEET", "ACTIF");
    const passifN = this.computeLines(passifLines, balancesN, "BALANCE_SHEET", "PASSIF");
    const passifN1 = this.computeLines(passifLines, balancesN1, "BALANCE_SHEET", "PASSIF");

    const actifN1ByRef = new Map(actifN1.filter((line) => line.ref).map((line) => [line.ref as string, line.amount]));
    const passifN1ByRef = new Map(passifN1.filter((line) => line.ref).map((line) => [line.ref as string, line.amount]));

    const passifByRow = new Map(passifN.map((line) => [line.rowOrder, line]));

    const rows = actifN.map((actifLine) => {
      const passifLine = passifByRow.get(actifLine.rowOrder) ?? null;

      return {
        rowOrder: actifLine.rowOrder,
        actif: {
          ref: actifLine.ref,
          libelle: actifLine.label,
          note: actifLine.note,
          isTitle: actifLine.isTitle,
          exercice: {
            n: actifLine.amount,
            n1: actifLine.ref ? (actifN1ByRef.get(actifLine.ref) ?? null) : null,
          },
        },
        passif: passifLine
          ? {
              ref: passifLine.ref,
              libelle: passifLine.label,
              note: passifLine.note,
              isTitle: passifLine.isTitle,
              exercice: {
                n: passifLine.amount,
                n1: passifLine.ref ? (passifN1ByRef.get(passifLine.ref) ?? null) : null,
              },
            }
          : null,
      };
    });

    const totalActif = rows.find((line) => line.actif.ref === "BZ")?.actif.exercice.n ?? 0;
    const totalPassif = rows
      .map((line) => line.passif)
      .find((line) => line && line.libelle.toUpperCase() === "TOTAL GENERAL")
      ?.exercice.n ?? 0;

    return {
      fiscalYearId,
      previousFiscalYearId,
      structure: rows,
      chiffres: {
        totalActif,
        totalPassif,
        ecart: round2(toNumber(totalActif) - toNumber(totalPassif)),
      },
    };
  }

  static async getFinancialStatementsPackage(fiscalYearId: string) {
    const [compteResultat, bilan] = await Promise.all([
      this.getIncomeStatementV2(fiscalYearId),
      this.getBalanceSheetV2(fiscalYearId),
    ]);

    return {
      fiscalYearId,
      compteResultat,
      bilan,
    };
  }
}
