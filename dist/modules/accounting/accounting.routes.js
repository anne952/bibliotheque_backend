"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountingRoutes = void 0;
const client_1 = require("../../generated/prisma/client");
const express_1 = require("express");
const http_1 = require("../../common/http");
const prisma_1 = require("../../config/prisma");
const accounting_service_1 = require("./accounting.service");
const reports_service_1 = require("../reports/reports.service");
const exceljs_1 = __importDefault(require("exceljs"));
exports.accountingRoutes = (0, express_1.Router)();
function toNumeric(value) {
    if (value === null || value === undefined)
        return 0;
    if (typeof value === "number")
        return value;
    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : 0;
    }
    if (typeof value === "object" && value !== null && "toNumber" in value && typeof value.toNumber === "function") {
        return value.toNumber();
    }
    return 0;
}
function formatDate(value) {
    if (!value)
        return "";
    const date = value instanceof Date ? value : new Date(String(value));
    if (Number.isNaN(date.getTime()))
        return "";
    return date.toISOString().slice(0, 10);
}
function autoFitColumns(ws) {
    ws.columns.forEach((column) => {
        let maxLength = 10;
        if (!column.eachCell)
            return;
        column.eachCell({ includeEmpty: true }, (cell) => {
            const raw = cell.value;
            const cellValue = raw === null || raw === undefined ? "" : String(raw);
            if (cellValue.length > maxLength)
                maxLength = cellValue.length;
        });
        column.width = Math.min(maxLength + 2, 40);
    });
}
function addWorksheetFromRows(workbook, sheetName, headers, rows) {
    const ws = workbook.addWorksheet(sheetName);
    ws.addRow(headers);
    ws.getRow(1).font = { bold: true };
    for (const row of rows) {
        ws.addRow(row.map((cell) => (cell === undefined ? "" : cell)));
    }
    autoFitColumns(ws);
}
function isUUID(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
// Resolve account ID from multiple possible input formats
async function resolveAccountId(tx, line) {
    // Priorité 1: champ 'account' (auto-detect UUID ou numéro)
    if (line.account) {
        const accountValue = line.account.trim();
        // Si c'est un UUID, le retourner directement
        if (isUUID(accountValue)) {
            const exists = await tx.account.findUnique({
                where: { id: accountValue },
                select: { id: true },
            });
            if (!exists) {
                throw new http_1.AppError(`Compte introuvable avec l'ID: ${accountValue}`, 400);
            }
            return accountValue;
        }
        // Sinon, c'est un numéro de compte
        const account = await tx.account.findFirst({
            where: { accountNumber: accountValue, isActive: true },
            select: { id: true },
        });
        if (!account) {
            throw new http_1.AppError(`Compte introuvable pour le numero: ${accountValue}`, 400);
        }
        return account.id;
    }
    // Priorité 2: accountId explicite
    if (line.accountId) {
        return line.accountId;
    }
    // Priorité 3: accountNumber explicite
    if (line.accountNumber) {
        const account = await tx.account.findFirst({
            where: { accountNumber: line.accountNumber, isActive: true },
            select: { id: true },
        });
        if (!account) {
            throw new http_1.AppError(`Compte introuvable pour le numero: ${line.accountNumber}`, 400);
        }
        return account.id;
    }
    throw new http_1.AppError("Vous devez fournir un compte (account, accountId ou accountNumber)", 400);
}
function validateLines(lines) {
    const received = Array.isArray(lines) ? lines.length : 0;
    if (received < 2) {
        throw new http_1.AppError(received === 0
            ? "Une ecriture doit contenir au moins 2 lignes (partie double). Aucune ligne recue."
            : "Une ecriture doit contenir au moins 2 lignes (partie double). Une seule ligne a ete envoyee.", 400);
    }
    let debitTotal = new client_1.Prisma.Decimal(0);
    let creditTotal = new client_1.Prisma.Decimal(0);
    for (const line of lines) {
        if (!line.account && !line.accountId && !line.accountNumber) {
            throw new http_1.AppError("Chaque ligne doit avoir un compte (account, accountId ou accountNumber)", 400);
        }
        if (typeof line.debit !== "number" || !Number.isFinite(line.debit)) {
            throw new http_1.AppError("Chaque ligne doit definir un montant debit numerique", 400);
        }
        if (typeof line.credit !== "number" || !Number.isFinite(line.credit)) {
            throw new http_1.AppError("Chaque ligne doit definir un montant credit numerique", 400);
        }
        const debit = line.debit;
        const credit = line.credit;
        if (debit < 0 || credit < 0)
            throw new http_1.AppError("debit/credit ne peuvent pas etre negatifs", 400);
        if ((debit === 0 && credit === 0) || (debit > 0 && credit > 0)) {
            throw new http_1.AppError("Chaque ligne doit etre soit au debit, soit au credit (l'autre doit etre 0)", 400);
        }
        debitTotal = debitTotal.add(debit);
        creditTotal = creditTotal.add(credit);
    }
    if (!debitTotal.equals(creditTotal)) {
        throw new http_1.AppError("Le total debit doit etre egal au total credit.", 400);
    }
}
// Get all fiscal years
exports.accountingRoutes.get("/fiscal-years", (0, http_1.asyncHandler)(async (_req, res) => {
    const fiscalYears = await prisma_1.prisma.fiscalYear.findMany({
        orderBy: { startDate: "desc" },
    });
    res.status(200).json(fiscalYears);
}));
// Get all accounts with UUID mapping
exports.accountingRoutes.get("/accounts", (0, http_1.asyncHandler)(async (_req, res) => {
    const accounts = await prisma_1.prisma.account.findMany({
        where: { isActive: true },
        select: { id: true, accountNumber: true, name: true, type: true },
        orderBy: { accountNumber: "asc" },
    });
    res.status(200).json(accounts);
}));
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
        // Résoudre chaque ligne (auto-detect UUID ou numéro de compte)
        const resolvedLines = await Promise.all(lines.map(async (line) => {
            const accountId = await resolveAccountId(tx, line);
            const debit = line.debit;
            const credit = line.credit;
            return {
                accountId,
                debit: new client_1.Prisma.Decimal(debit),
                credit: new client_1.Prisma.Decimal(credit),
                description: line.description,
            };
        }));
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
            // Résoudre chaque ligne (auto-detect UUID ou numéro de compte)
            const resolvedLines = await Promise.all(body.lines.map(async (line) => {
                const accountId = await resolveAccountId(tx, line);
                const debit = line.debit;
                const credit = line.credit;
                return {
                    accountId,
                    debit: new client_1.Prisma.Decimal(debit),
                    credit: new client_1.Prisma.Decimal(credit),
                    description: line.description,
                };
            }));
            data.lines = {
                deleteMany: {},
                create: resolvedLines,
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
exports.accountingRoutes.get("/accounts/resolve", (0, http_1.asyncHandler)(async (req, res) => {
    const accountNumber = String(req.query.accountNumber ?? "");
    if (!accountNumber)
        throw new http_1.AppError("accountNumber obligatoire", 400);
    const account = await prisma_1.prisma.account.findFirst({
        where: { accountNumber, isActive: true },
        select: { id: true, accountNumber: true, name: true, type: true },
    });
    if (!account) {
        throw new http_1.AppError(`Compte introuvable pour le numero ${accountNumber}`, 404);
    }
    res.status(200).json(account);
}));
exports.accountingRoutes.get("/export/excel", (0, http_1.asyncHandler)(async (req, res) => {
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
        throw new http_1.AppError("section invalide", 400);
    }
    const needsFiscalYear = section === "all" ||
        section === "general-ledger" ||
        section === "balance-sheet" ||
        section === "trial-balance" ||
        section === "income-statement";
    if (needsFiscalYear && !fiscalYearId) {
        throw new http_1.AppError("fiscalYearId obligatoire pour cette section", 400);
    }
    const workbook = new exceljs_1.default.Workbook();
    workbook.creator = "Backend Bibliotheque";
    workbook.created = new Date();
    if (section === "all" || section === "journal") {
        const entries = await prisma_1.prisma.journalEntry.findMany({
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
        addWorksheetFromRows(workbook, "Journal Comptable", [
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
        ], entries.flatMap((entry) => entry.lines.map((line) => [
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
        ])));
    }
    if (section === "all" || section === "cash-journal") {
        const cashEntries = await accounting_service_1.AccountingService.getCashJournal(fiscalYearId);
        addWorksheetFromRows(workbook, "Journal Caisse", [
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
        ], cashEntries.flatMap((entry) => entry.lines.map((line) => [
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
        ])));
    }
    if (section === "all" || section === "donors") {
        const donors = await reports_service_1.ReportsService.getDonorsReport();
        addWorksheetFromRows(workbook, "Donateurs", [
            "ID",
            "Nom",
            "Email",
            "Telephone",
            "Total Dons",
            "Total Financier",
            "Total Materiel",
            "Dernier Don",
        ], donors.map((donor) => [
            donor.donor.id,
            `${donor.donor.firstName} ${donor.donor.lastName}`,
            donor.donor.email,
            donor.donor.phone,
            donor.totalDonations,
            donor.totalFinancial,
            donor.totalMaterial,
            formatDate(donor.lastDonation),
        ]));
    }
    if (section === "all" || section === "general-ledger") {
        if (section === "general-ledger" && accountId) {
            const ledger = await accounting_service_1.AccountingService.getGeneralLedger(accountId, fiscalYearId);
            addWorksheetFromRows(workbook, "Grand Livre", ["Compte", "Nom Compte", "Date", "Description", "Debit", "Credit", "Solde"], ledger.entries.map((line) => [
                ledger.account.number,
                ledger.account.name,
                formatDate(line.date),
                line.description,
                line.debit,
                line.credit,
                line.balance,
            ]));
        }
        else {
            const lines = await prisma_1.prisma.journalLine.findMany({
                where: {
                    entry: {
                        fiscalYearId: fiscalYearId,
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
            addWorksheetFromRows(workbook, "Grand Livre", ["Compte", "Nom Compte", "Date", "Numero Ecriture", "Description", "Debit", "Credit"], lines.map((line) => [
                line.account.accountNumber,
                line.account.name,
                formatDate(line.entry.date),
                line.entry.entryNumber,
                line.entry.description,
                toNumeric(line.debit),
                toNumeric(line.credit),
            ]));
        }
    }
    if (section === "all" || section === "balance-sheet") {
        const balanceSheet = await accounting_service_1.AccountingService.getBalanceSheet(fiscalYearId);
        addWorksheetFromRows(workbook, "Bilan", ["Section", "Compte", "Libelle", "Debit", "Credit", "Solde"], [
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
        ]);
    }
    if (section === "all" || section === "trial-balance") {
        const trialBalance = await accounting_service_1.AccountingService.getTrialBalance(fiscalYearId);
        addWorksheetFromRows(workbook, "Balance", ["Compte", "Libelle", "Total Debit", "Total Credit"], trialBalance.map((line) => [
            line.accountNumber,
            line.accountName,
            line.totalDebit,
            line.totalCredit,
        ]));
    }
    if (section === "all" || section === "income-statement") {
        const incomeStatement = await accounting_service_1.AccountingService.getIncomeStatement(fiscalYearId);
        addWorksheetFromRows(workbook, "Compte Resultat", ["Section", "Compte", "Libelle", "Debit", "Credit", "Solde"], [
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
        ]);
    }
    const fileLabel = section === "all" ? "comptable-complet" : section;
    const fileName = `export-${fileLabel}-${new Date().toISOString().slice(0, 10)}.xlsx`;
    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=\"${fileName}\"`);
    res.status(200).send(Buffer.from(buffer));
}));
exports.accountingRoutes.get("/export/pdf", (req, res) => {
    res.status(501).json({
        message: "Export PDF non encore implémenté",
    });
});
//# sourceMappingURL=accounting.routes.js.map