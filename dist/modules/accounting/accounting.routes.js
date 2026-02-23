"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountingRoutes = void 0;
const client_1 = require("../../generated/prisma/client");
const express_1 = require("express");
const http_1 = require("../../common/http");
const prisma_1 = require("../../config/prisma");
const accounting_service_1 = require("./accounting.service");
exports.accountingRoutes = (0, express_1.Router)();
function validateLines(lines) {
    if (!Array.isArray(lines) || lines.length < 2) {
        throw new http_1.AppError("Une ecriture doit contenir au moins 2 lignes", 400);
    }
    let debitTotal = new client_1.Prisma.Decimal(0);
    let creditTotal = new client_1.Prisma.Decimal(0);
    for (const line of lines) {
        if (!line.accountId)
            throw new http_1.AppError("accountId obligatoire sur chaque ligne", 400);
        const debit = typeof line.debit === "number" ? line.debit : 0;
        const credit = typeof line.credit === "number" ? line.credit : 0;
        if (debit < 0 || credit < 0)
            throw new http_1.AppError("debit/credit ne peuvent pas etre negatifs", 400);
        if ((debit === 0 && credit === 0) || (debit > 0 && credit > 0)) {
            throw new http_1.AppError("Chaque ligne doit etre soit au debit, soit au credit", 400);
        }
        debitTotal = debitTotal.add(debit);
        creditTotal = creditTotal.add(credit);
    }
    if (!debitTotal.equals(creditTotal)) {
        throw new http_1.AppError("Ecriture non equilibree: total debit different du total credit", 400);
    }
}
exports.accountingRoutes.get("/entries", (0, http_1.asyncHandler)(async (_req, res) => {
    const entries = await prisma_1.prisma.journalEntry.findMany({
        include: { lines: true },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
    res.status(200).json(entries);
}));
exports.accountingRoutes.get("/entries/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const entry = await prisma_1.prisma.journalEntry.findUnique({ where: { id }, include: { lines: true } });
    if (!entry)
        throw new http_1.AppError("Ecriture introuvable", 404);
    res.status(200).json(entry);
}));
exports.accountingRoutes.post("/entries", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.fiscalYearId)
        throw new http_1.AppError("fiscalYearId obligatoire", 400);
    if (!body.date)
        throw new http_1.AppError("date obligatoire", 400);
    if (!body.journalType)
        throw new http_1.AppError("journalType obligatoire", 400);
    if (!body.description?.trim())
        throw new http_1.AppError("description obligatoire", 400);
    const fiscalYearId = body.fiscalYearId;
    const entryDate = new Date(body.date);
    const journalType = body.journalType;
    const description = body.description.trim();
    const lines = body.lines ?? [];
    validateLines(lines);
    const entry = await prisma_1.prisma.$transaction(async (tx) => {
        const fy = await tx.fiscalYear.findUnique({ where: { id: fiscalYearId } });
        if (!fy)
            throw new http_1.AppError("Exercice comptable introuvable", 404);
        if (fy.isClosed)
            throw new http_1.AppError("Exercice comptable ferme", 400);
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
                        accountId: line.accountId,
                        debit: new client_1.Prisma.Decimal(typeof line.debit === "number" ? line.debit : 0),
                        credit: new client_1.Prisma.Decimal(typeof line.credit === "number" ? line.credit : 0),
                        description: line.description,
                    })),
                },
            },
            include: { lines: true },
        });
    });
    res.status(201).json(entry);
}));
exports.accountingRoutes.put("/entries/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body;
    const updated = await prisma_1.prisma.$transaction(async (tx) => {
        const entry = await tx.journalEntry.findUnique({ where: { id } });
        if (!entry)
            throw new http_1.AppError("Ecriture introuvable", 404);
        if (entry.isValidated) {
            throw new http_1.AppError("Modification interdite: ecriture deja validee", 400);
        }
        const data = {};
        if (body.fiscalYearId) {
            const fy = await tx.fiscalYear.findUnique({ where: { id: body.fiscalYearId } });
            if (!fy)
                throw new http_1.AppError("Exercice comptable introuvable", 404);
            if (fy.isClosed)
                throw new http_1.AppError("Exercice comptable ferme", 400);
            data.fiscalYear = { connect: { id: fy.id } };
        }
        if (body.date) {
            const date = new Date(body.date);
            if (Number.isNaN(date.getTime())) {
                throw new http_1.AppError("date invalide", 400);
            }
            data.date = date;
        }
        if (body.journalType)
            data.journalType = body.journalType;
        if (body.pieceNumber !== undefined)
            data.pieceNumber = body.pieceNumber;
        if (body.description !== undefined) {
            const description = body.description.trim();
            if (!description)
                throw new http_1.AppError("description obligatoire", 400);
            data.description = description;
        }
        if (body.sourceType !== undefined)
            data.sourceType = body.sourceType;
        if (body.sourceId !== undefined)
            data.sourceId = body.sourceId;
        if (body.lines) {
            validateLines(body.lines);
            data.lines = {
                deleteMany: {},
                create: body.lines.map((line) => ({
                    accountId: line.accountId,
                    debit: new client_1.Prisma.Decimal(typeof line.debit === "number" ? line.debit : 0),
                    credit: new client_1.Prisma.Decimal(typeof line.credit === "number" ? line.credit : 0),
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
}));
exports.accountingRoutes.put("/entries/:id/validate", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const updated = await prisma_1.prisma.journalEntry.update({
        where: { id },
        data: { isValidated: true, validatedAt: new Date() },
        include: { lines: true },
    });
    res.status(200).json(updated);
}));
exports.accountingRoutes.delete("/entries/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const entry = await prisma_1.prisma.journalEntry.findUnique({ where: { id }, include: { lines: true } });
    if (!entry)
        throw new http_1.AppError("Ecriture introuvable", 404);
    if (entry.isValidated)
        throw new http_1.AppError("Suppression interdite: ecriture deja validee", 400);
    await prisma_1.prisma.$transaction(async (tx) => {
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
}));
exports.accountingRoutes.get("/balance-sheet", (0, http_1.asyncHandler)(async (req, res) => {
    const fiscalYearId = String(req.query.fiscalYearId ?? "");
    if (!fiscalYearId)
        throw new http_1.AppError("fiscalYearId obligatoire", 400);
    const balanceSheet = await accounting_service_1.AccountingService.getBalanceSheet(fiscalYearId);
    res.status(200).json(balanceSheet);
}));
exports.accountingRoutes.get("/income-statement", (0, http_1.asyncHandler)(async (req, res) => {
    const fiscalYearId = String(req.query.fiscalYearId ?? "");
    if (!fiscalYearId)
        throw new http_1.AppError("fiscalYearId obligatoire", 400);
    const incomeStatement = await accounting_service_1.AccountingService.getIncomeStatement(fiscalYearId);
    res.status(200).json(incomeStatement);
}));
exports.accountingRoutes.get("/trial-balance", (0, http_1.asyncHandler)(async (req, res) => {
    const fiscalYearId = String(req.query.fiscalYearId ?? "");
    if (!fiscalYearId)
        throw new http_1.AppError("fiscalYearId obligatoire", 400);
    const trialBalance = await accounting_service_1.AccountingService.getTrialBalance(fiscalYearId);
    res.status(200).json(trialBalance);
}));
exports.accountingRoutes.get("/account-balances", (0, http_1.asyncHandler)(async (req, res) => {
    const fiscalYearId = String(req.query.fiscalYearId ?? "");
    if (!fiscalYearId)
        throw new http_1.AppError("fiscalYearId obligatoire", 400);
    const accountBalances = await accounting_service_1.AccountingService.getAccountBalances(fiscalYearId);
    res.status(200).json(accountBalances);
}));
exports.accountingRoutes.get("/general-ledger", (0, http_1.asyncHandler)(async (req, res) => {
    const accountId = String(req.query.accountId ?? "");
    if (!accountId)
        throw new http_1.AppError("accountId obligatoire", 400);
    const fiscalYearId = req.query.fiscalYearId
        ? String(req.query.fiscalYearId)
        : undefined;
    const ledger = await accounting_service_1.AccountingService.getGeneralLedger(accountId, fiscalYearId);
    res.status(200).json(ledger);
}));
exports.accountingRoutes.get("/cash-journal", (0, http_1.asyncHandler)(async (req, res) => {
    const fiscalYearId = req.query.fiscalYearId
        ? String(req.query.fiscalYearId)
        : undefined;
    const journal = await accounting_service_1.AccountingService.getCashJournal(fiscalYearId);
    res.status(200).json(journal);
}));
exports.accountingRoutes.get("/export/excel", (req, res) => {
    res.status(501).json({
        message: "Export Excel non encore implémenté",
    });
});
exports.accountingRoutes.get("/export/pdf", (req, res) => {
    res.status(501).json({
        message: "Export PDF non encore implémenté",
    });
});
//# sourceMappingURL=accounting.routes.js.map