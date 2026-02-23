import { JournalType, Prisma, SourceType } from "../../generated/prisma/client";
import { Router } from "express";
import { AppError, asyncHandler } from "../../common/http";
import { prisma } from "../../config/prisma";
import { AccountingService } from "./accounting.service";

export const accountingRoutes = Router();

function validateLines(lines: Array<{ accountId?: string; debit?: number; credit?: number }>): void {
  if (!Array.isArray(lines) || lines.length < 2) {
    throw new AppError("Une ecriture doit contenir au moins 2 lignes", 400);
  }

  let debitTotal = new Prisma.Decimal(0);
  let creditTotal = new Prisma.Decimal(0);

  for (const line of lines) {
    if (!line.accountId) throw new AppError("accountId obligatoire sur chaque ligne", 400);

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
      lines?: Array<{ accountId?: string; debit?: number; credit?: number; description?: string }>;
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
            create: lines.map((line) => ({
              accountId: line.accountId as string,
              debit: new Prisma.Decimal(typeof line.debit === "number" ? line.debit : 0),
              credit: new Prisma.Decimal(typeof line.credit === "number" ? line.credit : 0),
              description: line.description,
            })),
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

accountingRoutes.get("/export/excel", (req, res) => {
  res.status(501).json({
    message: "Export Excel non encore implémenté",
  });
});

accountingRoutes.get("/export/pdf", (req, res) => {
  res.status(501).json({
    message: "Export PDF non encore implémenté",
  });
});