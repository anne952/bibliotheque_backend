import { JournalType, Prisma, SourceType } from "../../generated/prisma/client";
import { Router } from "express";
import { AppError, asyncHandler } from "../../common/http";
import { prisma } from "../../config/prisma";
import { AccountingService } from "./accounting.service";
import { ReportsService } from "../reports/reports.service";
import ExcelJS from "exceljs";

export const accountingRoutes = Router();

function toNumeric(value: unknown): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  if (typeof value === "object" && value !== null && "toNumber" in value && typeof (value as { toNumber: () => number }).toNumber === "function") {
    return (value as { toNumber: () => number }).toNumber();
  }
  return 0;
}

function formatDate(value: unknown): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function autoFitColumns(ws: ExcelJS.Worksheet): void {
  ws.columns.forEach((column) => {
    let maxLength = 10;
    if (!column.eachCell) return;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const raw = cell.value;
      const cellValue = raw === null || raw === undefined ? "" : String(raw);
      if (cellValue.length > maxLength) maxLength = cellValue.length;
    });

    column.width = Math.min(maxLength + 2, 40);
  });
}

function addWorksheetFromRows(
  workbook: ExcelJS.Workbook,
  sheetName: string,
  headers: string[],
  rows: Array<Array<string | number | null | undefined>>,
): void {
  const ws = workbook.addWorksheet(sheetName);
  ws.addRow(headers);
  ws.getRow(1).font = { bold: true };

  for (const row of rows) {
    ws.addRow(row.map((cell) => (cell === undefined ? "" : cell)));
  }

  autoFitColumns(ws);
}

function validateLines(lines: Array<{ accountId?: string; accountNumber?: string; debit?: number; credit?: number }>): void {
  if (!Array.isArray(lines) || lines.length < 2) {
    throw new AppError("Une ecriture doit contenir au moins 2 lignes", 400);
  }

  let debitTotal = new Prisma.Decimal(0);
  let creditTotal = new Prisma.Decimal(0);

  for (const line of lines) {
    if (!line.accountId && !line.accountNumber) throw new AppError("accountId ou accountNumber obligatoire sur chaque ligne", 400);

    const debit = typeof line.debit === "number" ? line.debit : 0;
    const credit = typeof line.credit === "number" ? line.credit : 0;

    if (debit < 0 || credit < 0) throw new AppError("debit/credit ne peuvent pas etre negatifs", 400);
    if ((debit === 0 && credit === 0) || (debit > 0 && credit > 0)) {
      throw new AppError("Chaque ligne doit etre soit au debit, soit au credit", 400);
    }

    debitTotal = debitTotal.add(debit);
    creditTotal = creditTotal.add(credit);
  }

  if (!debitTotal.equals(creditTotal)) {
    throw new AppError("Ecriture non equilibree: total debit different du total credit", 400);
  }
}

accountingRoutes.get(
  "/entries",
  asyncHandler(async (_req, res) => {
    const entries = await prisma.journalEntry.findMany({
      include: { lines: true },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });

    res.status(200).json(entries);
  }),
);

accountingRoutes.get(
  "/entries/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const entry = await prisma.journalEntry.findUnique({ where: { id }, include: { lines: true } });
    if (!entry) throw new AppError("Ecriture introuvable", 404);
    res.status(200).json(entry);
  }),
);

accountingRoutes.post(
  "/entries",
  asyncHandler(async (req, res) => {
    const body = req.body as {
      fiscalYearId?: string;
      date?: string;
      journalType?: JournalType;
      pieceNumber?: string;
      description?: string;
      sourceType?: SourceType;
      sourceId?: string;
      lines?: Array<{ accountId?: string; accountNumber?: string; debit?: number; credit?: number; description?: string }>;
    };

    if (!body.fiscalYearId) throw new AppError("fiscalYearId obligatoire", 400);
    if (!body.date) throw new AppError("date obligatoire", 400);
    if (!body.journalType) throw new AppError("journalType obligatoire", 400);
    if (!body.description?.trim()) throw new AppError("description obligatoire", 400);

    const fiscalYearId = body.fiscalYearId;
    const entryDate = new Date(body.date);
    const journalType = body.journalType;
    const description = body.description.trim();
    const lines = body.lines ?? [];

    validateLines(lines);

    const entry = await prisma.$transaction(async (tx) => {
      const fy = await tx.fiscalYear.findUnique({ where: { id: fiscalYearId } });
      if (!fy) throw new AppError("Exercice comptable introuvable", 404);
      if (fy.isClosed) throw new AppError("Exercice comptable ferme", 400);

      // Résoudre accountNumber en accountId si nécessaire
      const resolvedLines = await Promise.all(
        lines.map(async (line) => {
          let accountId = line.accountId;
          
          // Si accountNumber est fourni au lieu de accountId, le résoudre
          if (!accountId && line.accountNumber) {
            const account = await tx.account.findFirst({
              where: { accountNumber: line.accountNumber, isActive: true },
              select: { id: true },
            });
            if (!account) {
              throw new AppError(`Compte comptable introuvable: ${line.accountNumber}`, 400);
            }
            accountId = account.id;
          }

          return {
            accountId: accountId as string,
            debit: new Prisma.Decimal(typeof line.debit === "number" ? line.debit : 0),
            credit: new Prisma.Decimal(typeof line.credit === "number" ? line.credit : 0),
            description: line.description,
          };
        }),
      );

      const count = await tx.journalEntry.count({ where: { fiscalYearId: fy.id } });
      const entryNumber = `${fy.name}-${String(count + 1).padStart(5, "0")}`;

      return tx.journalEntry.create({
        data: {
          entryNumber,
          fiscalYearId: fy.id,
          date: entryDate,
          journalType,
          pieceNumber: body.pieceNumber,
          description,
          sourceType: body.sourceType,
          sourceId: body.sourceId,
          lines: {
            create: resolvedLines,
          },
        },
        include: { lines: true },
      });
    });

    res.status(201).json(entry);
  }),
);

accountingRoutes.put(
  "/entries/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body as {
      fiscalYearId?: string;
      date?: string;
      journalType?: JournalType;
      pieceNumber?: string;
      description?: string;
      sourceType?: SourceType;
      sourceId?: string;
      lines?: Array<{ accountId?: string; debit?: number; credit?: number; description?: string }>;
    };

    const updated = await prisma.$transaction(async (tx) => {
      const entry = await tx.journalEntry.findUnique({ where: { id } });
      if (!entry) throw new AppError("Ecriture introuvable", 404);
      if (entry.isValidated) {
        throw new AppError("Modification interdite: ecriture deja validee", 400);
      }

      const data: Prisma.JournalEntryUpdateInput = {};

      if (body.fiscalYearId) {
        const fy = await tx.fiscalYear.findUnique({ where: { id: body.fiscalYearId } });
        if (!fy) throw new AppError("Exercice comptable introuvable", 404);
        if (fy.isClosed) throw new AppError("Exercice comptable ferme", 400);
        data.fiscalYear = { connect: { id: fy.id } };
      }

      if (body.date) {
        const date = new Date(body.date);
        if (Number.isNaN(date.getTime())) {
          throw new AppError("date invalide", 400);
        }

        data.date = date;
      }

      if (body.journalType) data.journalType = body.journalType;
      if (body.pieceNumber !== undefined) data.pieceNumber = body.pieceNumber;
      if (body.description !== undefined) {
        const description = body.description.trim();
        if (!description) throw new AppError("description obligatoire", 400);
        data.description = description;
      }
      if (body.sourceType !== undefined) data.sourceType = body.sourceType;
      if (body.sourceId !== undefined) data.sourceId = body.sourceId;

      if (body.lines) {
        validateLines(body.lines);
        data.lines = {
          deleteMany: {},
          create: body.lines.map((line) => ({
            accountId: line.accountId as string,
            debit: new Prisma.Decimal(typeof line.debit === "number" ? line.debit : 0),
            credit: new Prisma.Decimal(typeof line.credit === "number" ? line.credit : 0),
            description: line.description,
          })),
        };
      }

      return tx.journalEntry.update({
        where: { id },
        data,
        include: { lines: true },
      });
    });

    res.status(200).json(updated);
  }),
);

accountingRoutes.put(
  "/entries/:id/validate",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const updated = await prisma.journalEntry.update({
      where: { id },
      data: { isValidated: true, validatedAt: new Date() },
      include: { lines: true },
    });

    res.status(200).json(updated);
  }),
);

accountingRoutes.delete(
  "/entries/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const entry = await prisma.journalEntry.findUnique({ where: { id }, include: { lines: true } });
    if (!entry) throw new AppError("Ecriture introuvable", 404);
    if (entry.isValidated) throw new AppError("Suppression interdite: ecriture deja validee", 400);

    await prisma.$transaction(async (tx) => {
      await tx.deletedItem.create({
        data: {
          originalTable: "JournalEntry",
          originalId: entry.id,
          data: JSON.parse(JSON.stringify(entry)),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      await tx.journalEntry.delete({ where: { id: entry.id } });
    });

    res.status(204).send();
  }),
);

accountingRoutes.get(
  "/balance-sheet",
  asyncHandler(async (req, res) => {
    const fiscalYearId = String(req.query.fiscalYearId ?? "");
    if (!fiscalYearId) throw new AppError("fiscalYearId obligatoire", 400);

    const balanceSheet = await AccountingService.getBalanceSheet(
      fiscalYearId,
    );
    res.status(200).json(balanceSheet);
  }),
);

accountingRoutes.get(
  "/income-statement",
  asyncHandler(async (req, res) => {
    const fiscalYearId = String(req.query.fiscalYearId ?? "");
    if (!fiscalYearId) throw new AppError("fiscalYearId obligatoire", 400);

    const incomeStatement = await AccountingService.getIncomeStatement(
      fiscalYearId,
    );
    res.status(200).json(incomeStatement);
  }),
);

accountingRoutes.get(
  "/trial-balance",
  asyncHandler(async (req, res) => {
    const fiscalYearId = String(req.query.fiscalYearId ?? "");
    if (!fiscalYearId) throw new AppError("fiscalYearId obligatoire", 400);

    const trialBalance = await AccountingService.getTrialBalance(
      fiscalYearId,
    );
    res.status(200).json(trialBalance);
  }),
);

accountingRoutes.get(
  "/account-balances",
  asyncHandler(async (req, res) => {
    const fiscalYearId = String(req.query.fiscalYearId ?? "");
    if (!fiscalYearId) throw new AppError("fiscalYearId obligatoire", 400);

    const accountBalances = await AccountingService.getAccountBalances(
      fiscalYearId,
    );
    res.status(200).json(accountBalances);
  }),
);

accountingRoutes.get(
  "/general-ledger",
  asyncHandler(async (req, res) => {
    const accountId = String(req.query.accountId ?? "");
    if (!accountId) throw new AppError("accountId obligatoire", 400);
    const fiscalYearId = req.query.fiscalYearId
      ? String(req.query.fiscalYearId)
      : undefined;

    const ledger = await AccountingService.getGeneralLedger(accountId, fiscalYearId);
    res.status(200).json(ledger);
  }),
);

accountingRoutes.get(
  "/cash-journal",
  asyncHandler(async (req, res) => {
    const fiscalYearId = req.query.fiscalYearId
      ? String(req.query.fiscalYearId)
      : undefined;

    const journal = await AccountingService.getCashJournal(fiscalYearId);
    res.status(200).json(journal);
  }),
);

accountingRoutes.get(
  "/export/excel",
  asyncHandler(async (req, res) => {
    const section = req.query.section ? String(req.query.section).toLowerCase() : "all";
    const fiscalYearId = req.query.fiscalYearId ? String(req.query.fiscalYearId) : undefined;
    const accountId = req.query.accountId ? String(req.query.accountId) : undefined;

    const allowedSections = [
      "all",
      "journal",
      "cash-journal",
      "donors",
      "general-ledger",
      "balance-sheet",
      "trial-balance",
      "income-statement",
    ];

    if (!allowedSections.includes(section)) {
      throw new AppError("section invalide", 400);
    }

    const needsFiscalYear =
      section === "all" ||
      section === "general-ledger" ||
      section === "balance-sheet" ||
      section === "trial-balance" ||
      section === "income-statement";

    if (needsFiscalYear && !fiscalYearId) {
      throw new AppError("fiscalYearId obligatoire pour cette section", 400);
    }

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Backend Bibliotheque";
    workbook.created = new Date();

    if (section === "all" || section === "journal") {
      const entries = await prisma.journalEntry.findMany({
        where: {
          ...(fiscalYearId ? { fiscalYearId } : {}),
        },
        include: {
          lines: {
            include: {
              account: {
                select: { accountNumber: true, name: true },
              },
            },
          },
        },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      });

      addWorksheetFromRows(
        workbook,
        "Journal Comptable",
        [
          "Date",
          "Numero Ecriture",
          "Journal",
          "Description",
          "Piece",
          "Validee",
          "Source Type",
          "Source ID",
          "Compte",
          "Libelle Compte",
          "Debit",
          "Credit",
          "Libelle Ligne",
        ],
        entries.flatMap((entry) =>
          entry.lines.map((line) => [
            formatDate(entry.date),
            entry.entryNumber,
            entry.journalType,
            entry.description,
            entry.pieceNumber,
            entry.isValidated ? "Oui" : "Non",
            entry.sourceType,
            entry.sourceId,
            line.account.accountNumber,
            line.account.name,
            toNumeric(line.debit),
            toNumeric(line.credit),
            line.description,
          ]),
        ),
      );
    }

    if (section === "all" || section === "cash-journal") {
      const cashEntries = await AccountingService.getCashJournal(fiscalYearId);

      addWorksheetFromRows(
        workbook,
        "Journal Caisse",
        [
          "Date",
          "Numero Ecriture",
          "Description",
          "Piece",
          "Source Type",
          "Source ID",
          "Compte",
          "Libelle Compte",
          "Debit",
          "Credit",
        ],
        cashEntries.flatMap((entry) =>
          entry.lines.map((line) => [
            formatDate(entry.date),
            entry.entryNumber,
            entry.description,
            entry.pieceNumber,
            entry.sourceType,
            entry.sourceId,
            line.account.accountNumber,
            line.account.name,
            toNumeric(line.debit),
            toNumeric(line.credit),
          ]),
        ),
      );
    }

    if (section === "all" || section === "donors") {
      const donors = await ReportsService.getDonorsReport();

      addWorksheetFromRows(
        workbook,
        "Donateurs",
        [
          "ID",
          "Nom",
          "Email",
          "Telephone",
          "Total Dons",
          "Total Financier",
          "Total Materiel",
          "Dernier Don",
        ],
        donors.map((donor) => [
          donor.donor.id,
          `${donor.donor.firstName} ${donor.donor.lastName}`,
          donor.donor.email,
          donor.donor.phone,
          donor.totalDonations,
          donor.totalFinancial,
          donor.totalMaterial,
          formatDate(donor.lastDonation),
        ]),
      );
    }

    if (section === "all" || section === "general-ledger") {
      if (section === "general-ledger" && accountId) {
        const ledger = await AccountingService.getGeneralLedger(accountId, fiscalYearId);
        addWorksheetFromRows(
          workbook,
          "Grand Livre",
          ["Compte", "Nom Compte", "Date", "Description", "Debit", "Credit", "Solde"],
          ledger.entries.map((line) => [
            ledger.account.number,
            ledger.account.name,
            formatDate(line.date),
            line.description,
            line.debit,
            line.credit,
            line.balance,
          ]),
        );
      } else {
        const lines = await prisma.journalLine.findMany({
          where: {
            entry: {
              fiscalYearId: fiscalYearId as string,
              isValidated: true,
            },
          },
          include: {
            account: {
              select: {
                accountNumber: true,
                name: true,
              },
            },
            entry: {
              select: {
                date: true,
                description: true,
                entryNumber: true,
              },
            },
          },
          orderBy: [
            { account: { accountNumber: "asc" } },
            { entry: { date: "asc" } },
            { createdAt: "asc" },
          ],
        });

        addWorksheetFromRows(
          workbook,
          "Grand Livre",
          ["Compte", "Nom Compte", "Date", "Numero Ecriture", "Description", "Debit", "Credit"],
          lines.map((line) => [
            line.account.accountNumber,
            line.account.name,
            formatDate(line.entry.date),
            line.entry.entryNumber,
            line.entry.description,
            toNumeric(line.debit),
            toNumeric(line.credit),
          ]),
        );
      }
    }

    if (section === "all" || section === "balance-sheet") {
      const balanceSheet = await AccountingService.getBalanceSheet(fiscalYearId as string);

      addWorksheetFromRows(
        workbook,
        "Bilan",
        ["Section", "Compte", "Libelle", "Debit", "Credit", "Solde"],
        [
          ...balanceSheet.assets.map((line) => [
            "Actif",
            line.accountNumber,
            line.accountName,
            line.debit,
            line.credit,
            line.balance,
          ]),
          ...balanceSheet.liabilities.map((line) => [
            "Passif",
            line.accountNumber,
            line.accountName,
            line.debit,
            line.credit,
            line.balance,
          ]),
          ...balanceSheet.equity.map((line) => [
            "Capitaux",
            line.accountNumber,
            line.accountName,
            line.debit,
            line.credit,
            line.balance,
          ]),
          ["TOTAL", "", "Actif", "", "", balanceSheet.totals.assets],
          ["TOTAL", "", "Passif", "", "", balanceSheet.totals.liabilities],
          ["TOTAL", "", "Capitaux", "", "", balanceSheet.totals.equity],
        ],
      );
    }

    if (section === "all" || section === "trial-balance") {
      const trialBalance = await AccountingService.getTrialBalance(fiscalYearId as string);
      addWorksheetFromRows(
        workbook,
        "Balance",
        ["Compte", "Libelle", "Total Debit", "Total Credit"],
        trialBalance.map((line) => [
          line.accountNumber,
          line.accountName,
          line.totalDebit,
          line.totalCredit,
        ]),
      );
    }

    if (section === "all" || section === "income-statement") {
      const incomeStatement = await AccountingService.getIncomeStatement(fiscalYearId as string);
      addWorksheetFromRows(
        workbook,
        "Compte Resultat",
        ["Section", "Compte", "Libelle", "Debit", "Credit", "Solde"],
        [
          ...incomeStatement.revenues.map((line) => [
            "Produits",
            line.accountNumber,
            line.accountName,
            line.debit,
            line.credit,
            line.balance,
          ]),
          ...incomeStatement.expenses.map((line) => [
            "Charges",
            line.accountNumber,
            line.accountName,
            line.debit,
            line.credit,
            line.balance,
          ]),
          ["TOTAL", "", "Produits", "", "", incomeStatement.totals.revenues],
          ["TOTAL", "", "Charges", "", "", incomeStatement.totals.expenses],
          ["RESULTAT", "", "Net", "", "", incomeStatement.totals.netIncome],
        ],
      );
    }

    const fileLabel = section === "all" ? "comptable-complet" : section;
    const fileName = `export-${fileLabel}-${new Date().toISOString().slice(0, 10)}.xlsx`;
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", `attachment; filename=\"${fileName}\"`);
    res.status(200).send(Buffer.from(buffer));
  }),
);

accountingRoutes.get("/export/pdf", (req, res) => {
  res.status(501).json({
    message: "Export PDF non encore implémenté",
  });
});