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
const journalTypeValues = new Set(Object.values(client_1.JournalType));
const sourceTypeValues = new Set(Object.values(client_1.SourceType));
const IMPORT_BATCH_SIZE = 50;
function normalizeEntryMetadata(payload) {
    const businessLabelRaw = payload.businessLabel ?? payload.description;
    const syncBlock = payload.sync;
    const sourceType = syncBlock?.sourceType ?? payload.sourceType;
    const syncIdentifierRaw = syncBlock?.identifier ??
        syncBlock?.syncIdentifier ??
        syncBlock?.sourceId ??
        payload.sourceId;
    const businessLabel = businessLabelRaw !== undefined ? String(businessLabelRaw).trim() || undefined : undefined;
    const syncIdentifier = syncIdentifierRaw !== undefined ? String(syncIdentifierRaw).trim() || undefined : undefined;
    return {
        businessLabel,
        sourceType,
        syncIdentifier,
    };
}
function toEntryResponse(entry) {
    return {
        ...entry,
        businessLabel: entry.description,
        sync: {
            sourceType: entry.sourceType,
            identifier: entry.sourceId,
        },
    };
}
function toEntriesResponse(entries) {
    return entries.map((entry) => toEntryResponse(entry));
}
function normalizeHeader(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "");
}
function parseFlexibleAmount(value) {
    if (typeof value === "number")
        return value;
    if (typeof value !== "string")
        return NaN;
    const trimmed = value.trim();
    if (!trimmed)
        return NaN;
    const noSpaces = trimmed.replace(/\s+/g, "");
    const hasComma = noSpaces.includes(",");
    const hasDot = noSpaces.includes(".");
    let normalized = noSpaces;
    if (hasComma && hasDot) {
        normalized = noSpaces.replace(/\./g, "").replace(/,/g, ".");
    }
    else if (hasComma) {
        normalized = noSpaces.replace(/,/g, ".");
    }
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : NaN;
}
function parseFlexibleDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value;
    }
    if (typeof value !== "string") {
        return null;
    }
    const raw = value.trim();
    if (!raw)
        return null;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
        const [day, month, year] = raw.split("/");
        const iso = `${year}-${month}-${day}T00:00:00.000Z`;
        const date = new Date(iso);
        return Number.isNaN(date.getTime()) ? null : date;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        const date = new Date(`${raw}T00:00:00.000Z`);
        return Number.isNaN(date.getTime()) ? null : date;
    }
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
}
function parseExcelPasteToJson(pastedData) {
    const detectDelimiter = (headerLine) => {
        const candidates = ["\t", ";", ","];
        const best = candidates
            .map((delimiter) => ({ delimiter, columns: headerLine.split(delimiter).length }))
            .sort((a, b) => b.columns - a.columns)[0];
        return best && best.columns > 1 ? best.delimiter : ";";
    };
    const lines = pastedData
        .split(/\r?\n/)
        .map((line) => line.trimEnd())
        .filter((line) => line.trim().length > 0);
    if (lines.length < 2) {
        throw new http_1.AppError("Le tableau colle doit contenir un en-tete et au moins une ligne", 400);
    }
    const delimiter = detectDelimiter(lines[0]);
    const headers = lines[0].split(delimiter).map((header) => header.trim());
    if (headers.length < 2) {
        throw new http_1.AppError("Format de tableau invalide: colonnes insuffisantes", 400);
    }
    const rows = [];
    for (let index = 1; index < lines.length; index += 1) {
        const cells = lines[index].split(delimiter);
        const row = {};
        headers.forEach((header, cellIndex) => {
            row[header] = (cells[cellIndex] ?? "").trim();
        });
        const hasValue = Object.values(row).some((value) => value.length > 0);
        if (hasValue)
            rows.push(row);
    }
    return rows;
}
function mapRawRowToImportedRow(rawRow, rowNumber, defaultJournalType, defaultSourceType) {
    const normalized = new Map();
    for (const [key, value] of Object.entries(rawRow)) {
        normalized.set(normalizeHeader(key), value);
    }
    const pick = (...aliases) => {
        for (const alias of aliases) {
            const value = normalized.get(normalizeHeader(alias));
            if (value !== undefined && value !== null && String(value).trim() !== "") {
                return value;
            }
        }
        return undefined;
    };
    const dateValue = pick("date", "jour", "dateoperation", "dateecriture");
    const descriptionValue = pick("description", "businesslabel", "libellemetier", "libelle", "motif", "designation");
    const pieceValue = pick("piecenumber", "piece", "numeropiece", "reference", "ref");
    const journalValue = pick("journaltype", "journal", "typejournal");
    const debitAccountValue = pick("debitaccount", "comptedebit", "compte_debit", "debitcompte");
    const creditAccountValue = pick("creditaccount", "comptecredit", "compte_credit", "creditcompte");
    const amountValue = pick("amount", "montant", "valeur", "somme");
    const sourceTypeValue = pick("sourcetype", "source_type", "source");
    const sourceIdValue = pick("sourceid", "source_id", "syncidentifier", "syncid", "identifiantsync");
    const date = parseFlexibleDate(dateValue);
    if (!date) {
        throw new http_1.AppError(`Ligne ${rowNumber}: date invalide ou absente`, 400);
    }
    const description = String(descriptionValue ?? "").trim();
    if (!description) {
        throw new http_1.AppError(`Ligne ${rowNumber}: description/libelle obligatoire`, 400);
    }
    const debitAccount = String(debitAccountValue ?? "").trim();
    if (!debitAccount) {
        throw new http_1.AppError(`Ligne ${rowNumber}: compte debit obligatoire`, 400);
    }
    const creditAccount = String(creditAccountValue ?? "").trim();
    if (!creditAccount) {
        throw new http_1.AppError(`Ligne ${rowNumber}: compte credit obligatoire`, 400);
    }
    const amount = parseFlexibleAmount(amountValue);
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new http_1.AppError(`Ligne ${rowNumber}: montant invalide`, 400);
    }
    let journalType = defaultJournalType ?? client_1.JournalType.GENERAL;
    if (journalValue !== undefined) {
        const normalizedJournal = String(journalValue).trim().toUpperCase();
        if (!journalTypeValues.has(normalizedJournal)) {
            throw new http_1.AppError(`Ligne ${rowNumber}: journalType invalide`, 400);
        }
        journalType = normalizedJournal;
    }
    let sourceType = defaultSourceType;
    if (sourceTypeValue !== undefined) {
        const normalizedSource = String(sourceTypeValue).trim().toUpperCase();
        if (!sourceTypeValues.has(normalizedSource)) {
            throw new http_1.AppError(`Ligne ${rowNumber}: sourceType invalide`, 400);
        }
        sourceType = normalizedSource;
    }
    const pieceNumber = pieceValue !== undefined ? String(pieceValue).trim() || undefined : undefined;
    const sourceId = sourceIdValue !== undefined ? String(sourceIdValue).trim() || undefined : undefined;
    return {
        date,
        description,
        pieceNumber,
        journalType,
        debitAccount,
        creditAccount,
        amount,
        sourceType,
        sourceId,
    };
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
// Create fiscal year
exports.accountingRoutes.post("/fiscal-years", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name)
        throw new http_1.AppError("name obligatoire", 400);
    if (!body.startDate)
        throw new http_1.AppError("startDate obligatoire", 400);
    if (!body.endDate)
        throw new http_1.AppError("endDate obligatoire", 400);
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    if (Number.isNaN(startDate.getTime()))
        throw new http_1.AppError("startDate invalide", 400);
    if (Number.isNaN(endDate.getTime()))
        throw new http_1.AppError("endDate invalide", 400);
    if (startDate > endDate) {
        throw new http_1.AppError("startDate doit etre inferieure ou egale a endDate", 400);
    }
    const overlap = await prisma_1.prisma.fiscalYear.findFirst({
        where: {
            startDate: { lte: endDate },
            endDate: { gte: startDate },
        },
        select: { id: true, name: true, startDate: true, endDate: true },
    });
    if (overlap) {
        throw new http_1.AppError(`Periode en conflit avec l'exercice ${overlap.name} (${formatDate(overlap.startDate)} au ${formatDate(overlap.endDate)})`, 409);
    }
    try {
        const created = await prisma_1.prisma.fiscalYear.create({
            data: {
                name,
                startDate,
                endDate,
                isClosed: false,
            },
        });
        res.status(201).json(created);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            throw new http_1.AppError("Un exercice avec ce nom existe deja", 409);
        }
        throw error;
    }
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
    res.status(200).json(toEntriesResponse(entries));
}));
exports.accountingRoutes.get("/entries/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const entry = await prisma_1.prisma.journalEntry.findUnique({ where: { id }, include: { lines: true } });
    if (!entry)
        throw new http_1.AppError("Ecriture introuvable", 404);
    res.status(200).json(toEntryResponse(entry));
}));
exports.accountingRoutes.post("/entries", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.fiscalYearId)
        throw new http_1.AppError("fiscalYearId obligatoire", 400);
    if (!body.date)
        throw new http_1.AppError("date obligatoire", 400);
    if (!body.journalType)
        throw new http_1.AppError("journalType obligatoire", 400);
    const metadata = normalizeEntryMetadata(body);
    if (!metadata.businessLabel)
        throw new http_1.AppError("businessLabel (ou description) obligatoire", 400);
    if (metadata.sourceType && !sourceTypeValues.has(metadata.sourceType)) {
        throw new http_1.AppError("sourceType invalide", 400);
    }
    const fiscalYearId = body.fiscalYearId;
    const entryDate = new Date(body.date);
    const journalType = body.journalType;
    const description = metadata.businessLabel;
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
                sourceType: metadata.sourceType,
                sourceId: metadata.syncIdentifier,
                lines: {
                    create: resolvedLines,
                },
            },
            include: { lines: true },
        });
    });
    res.status(201).json(toEntryResponse(entry));
}));
exports.accountingRoutes.post("/entries/import-paste", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.fiscalYearId) {
        throw new http_1.AppError("fiscalYearId obligatoire", 400);
    }
    const hasRowsField = Object.prototype.hasOwnProperty.call(body, "rows");
    if (!hasRowsField && !body.pastedData) {
        throw new http_1.AppError("Vous devez fournir pastedData ou rows", 400);
    }
    if (hasRowsField && !Array.isArray(body.rows)) {
        throw new http_1.AppError("rows doit etre un tableau JSON", 400);
    }
    if (body.defaultJournalType && !journalTypeValues.has(body.defaultJournalType)) {
        throw new http_1.AppError("defaultJournalType invalide", 400);
    }
    if (body.defaultSourceType && !sourceTypeValues.has(body.defaultSourceType)) {
        throw new http_1.AppError("defaultSourceType invalide", 400);
    }
    const rawRows = hasRowsField
        ? body.rows
        : parseExcelPasteToJson(String(body.pastedData ?? ""));
    if (rawRows.length === 0) {
        throw new http_1.AppError("Aucune ligne exploitable a importer", 400);
    }
    const startedAt = Date.now();
    const lineErrors = [];
    const errors = [];
    const parsedRows = [];
    for (let index = 0; index < rawRows.length; index += 1) {
        const rowNumber = index + 1;
        const rawRow = rawRows[index];
        try {
            parsedRows.push({
                rowNumber,
                row: mapRawRowToImportedRow(rawRow, rowNumber, body.defaultJournalType, body.defaultSourceType),
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erreur inconnue";
            lineErrors.push({ rowNumber, message, row: rawRow });
        }
    }
    const fiscalYear = await prisma_1.prisma.fiscalYear.findUnique({ where: { id: body.fiscalYearId } });
    if (!fiscalYear) {
        throw new http_1.AppError("Exercice comptable introuvable", 404);
    }
    if (fiscalYear.isClosed) {
        throw new http_1.AppError("Exercice comptable ferme", 400);
    }
    const distinctAccountValues = Array.from(new Set(parsedRows.flatMap((item) => [item.row.debitAccount.trim(), item.row.creditAccount.trim()])));
    const accountIds = distinctAccountValues.filter((value) => isUUID(value));
    const accountNumbers = distinctAccountValues.filter((value) => !isUUID(value));
    const [accountsById, accountsByNumber] = await Promise.all([
        accountIds.length > 0
            ? prisma_1.prisma.account.findMany({
                where: { id: { in: accountIds } },
                select: { id: true },
            })
            : Promise.resolve([]),
        accountNumbers.length > 0
            ? prisma_1.prisma.account.findMany({
                where: {
                    accountNumber: { in: accountNumbers },
                    isActive: true,
                },
                select: { id: true, accountNumber: true },
            })
            : Promise.resolve([]),
    ]);
    const validAccountIdSet = new Set(accountsById.map((account) => account.id));
    const accountNumberToId = new Map(accountsByNumber.map((account) => [account.accountNumber, account.id]));
    const resolveImportedAccountId = (accountValue, rowNumber, side) => {
        if (isUUID(accountValue)) {
            if (!validAccountIdSet.has(accountValue)) {
                throw new http_1.AppError(`Ligne ${rowNumber}: compte ${side} introuvable (ID: ${accountValue})`, 400);
            }
            return accountValue;
        }
        const resolvedId = accountNumberToId.get(accountValue);
        if (!resolvedId) {
            throw new http_1.AppError(`Ligne ${rowNumber}: compte ${side} introuvable (numero: ${accountValue})`, 400);
        }
        return resolvedId;
    };
    const buildPreparedKey = (entry) => {
        return [
            entry.fiscalYearId,
            entry.date.toISOString(),
            entry.journalType,
            entry.pieceNumber ?? "",
            entry.description,
            entry.sourceType ?? "",
            entry.sourceId ?? "",
            entry.debitAccountId,
            entry.creditAccountId,
            entry.amount.toString(),
        ].join("|");
    };
    const buildCandidateKey = (entry) => {
        if (entry.lines.length !== 2) {
            return null;
        }
        const debitLine = entry.lines.find((line) => line.debit.greaterThan(0) && line.credit.equals(0));
        const creditLine = entry.lines.find((line) => line.credit.greaterThan(0) && line.debit.equals(0));
        if (!debitLine || !creditLine) {
            return null;
        }
        if (!debitLine.debit.equals(creditLine.credit)) {
            return null;
        }
        return [
            entry.fiscalYearId,
            entry.date.toISOString(),
            entry.journalType,
            entry.pieceNumber ?? "",
            entry.description,
            entry.sourceType ?? "",
            entry.sourceId ?? "",
            debitLine.accountId,
            creditLine.accountId,
            debitLine.debit.toString(),
        ].join("|");
    };
    let currentCount = await prisma_1.prisma.journalEntry.count({ where: { fiscalYearId: fiscalYear.id } });
    const upsertedEntries = [];
    for (let start = 0; start < parsedRows.length; start += IMPORT_BATCH_SIZE) {
        const batch = parsedRows.slice(start, start + IMPORT_BATCH_SIZE);
        for (const item of batch) {
            const rowNumber = item.rowNumber;
            const row = item.row;
            try {
                const debitAccountId = resolveImportedAccountId(row.debitAccount.trim(), rowNumber, "debit");
                const creditAccountId = resolveImportedAccountId(row.creditAccount.trim(), rowNumber, "credit");
                const amount = new client_1.Prisma.Decimal(row.amount);
                const desiredKey = buildPreparedKey({
                    fiscalYearId: fiscalYear.id,
                    date: row.date,
                    journalType: row.journalType,
                    pieceNumber: row.pieceNumber,
                    description: row.description,
                    sourceType: row.sourceType,
                    sourceId: row.sourceId,
                    debitAccountId,
                    creditAccountId,
                    amount,
                });
                const candidates = await prisma_1.prisma.journalEntry.findMany({
                    where: {
                        fiscalYearId: fiscalYear.id,
                        date: row.date,
                        journalType: row.journalType,
                        pieceNumber: row.pieceNumber ?? null,
                        description: row.description,
                        sourceType: row.sourceType ?? null,
                        sourceId: row.sourceId ?? null,
                    },
                    select: {
                        id: true,
                        entryNumber: true,
                        isValidated: true,
                        fiscalYearId: true,
                        date: true,
                        journalType: true,
                        pieceNumber: true,
                        description: true,
                        sourceType: true,
                        sourceId: true,
                        lines: {
                            select: {
                                accountId: true,
                                debit: true,
                                credit: true,
                            },
                        },
                    },
                });
                const existing = candidates.find((candidate) => buildCandidateKey(candidate) === desiredKey);
                if (existing && existing.isValidated) {
                    throw new http_1.AppError(`Ligne ${rowNumber}: doublon detecte sur une ecriture validee (${existing.entryNumber}), ligne ignoree`, 400);
                }
                if (existing) {
                    const updated = await prisma_1.prisma.journalEntry.update({
                        where: { id: existing.id },
                        data: {
                            date: row.date,
                            journalType: row.journalType,
                            pieceNumber: row.pieceNumber,
                            description: row.description,
                            sourceType: row.sourceType,
                            sourceId: row.sourceId,
                            lines: {
                                deleteMany: {},
                                create: [
                                    {
                                        accountId: debitAccountId,
                                        debit: amount,
                                        credit: new client_1.Prisma.Decimal(0),
                                    },
                                    {
                                        accountId: creditAccountId,
                                        debit: new client_1.Prisma.Decimal(0),
                                        credit: amount,
                                    },
                                ],
                            },
                        },
                        select: { id: true, entryNumber: true },
                    });
                    upsertedEntries.push({
                        id: updated.id,
                        entryNumber: updated.entryNumber,
                        rowNumber,
                        operation: "updated",
                    });
                    continue;
                }
                currentCount += 1;
                const entryNumber = `${fiscalYear.name}-${String(currentCount).padStart(5, "0")}`;
                const created = await prisma_1.prisma.journalEntry.create({
                    data: {
                        entryNumber,
                        fiscalYearId: fiscalYear.id,
                        date: row.date,
                        journalType: row.journalType,
                        pieceNumber: row.pieceNumber,
                        description: row.description,
                        sourceType: row.sourceType,
                        sourceId: row.sourceId,
                        lines: {
                            create: [
                                {
                                    accountId: debitAccountId,
                                    debit: amount,
                                    credit: new client_1.Prisma.Decimal(0),
                                },
                                {
                                    accountId: creditAccountId,
                                    debit: new client_1.Prisma.Decimal(0),
                                    credit: amount,
                                },
                            ],
                        },
                    },
                    select: { id: true, entryNumber: true },
                });
                upsertedEntries.push({
                    id: created.id,
                    entryNumber: created.entryNumber,
                    rowNumber,
                    operation: "created",
                });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "Erreur inconnue";
                lineErrors.push({
                    rowNumber,
                    message,
                    row: rawRows[rowNumber - 1],
                });
            }
        }
    }
    upsertedEntries.sort((a, b) => a.rowNumber - b.rowNumber);
    const createdCount = upsertedEntries.filter((entry) => entry.operation === "created").length;
    const updatedCount = upsertedEntries.filter((entry) => entry.operation === "updated").length;
    const failedCount = lineErrors.length;
    if (upsertedEntries.length === 0) {
        errors.push("Aucune ligne n'a pu etre importee");
    }
    const durationMs = Date.now() - startedAt;
    console.info("[accounting/entries/import-paste] completed", {
        durationMs,
        fiscalYearId: fiscalYear.id,
        receivedRows: rawRows.length,
        processedCount: upsertedEntries.length,
        createdCount,
        updatedCount,
        failedCount,
        usedRowsPayload: hasRowsField,
        batchSize: IMPORT_BATCH_SIZE,
    });
    res.status(201).json({
        receivedRows: rawRows.length,
        jsonRows: rawRows,
        createdCount,
        updatedCount,
        failedCount,
        errors,
        lineErrors,
        processedCount: upsertedEntries.length,
        createdEntries: upsertedEntries,
    });
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
        const metadata = normalizeEntryMetadata(body);
        if (metadata.sourceType && !sourceTypeValues.has(metadata.sourceType)) {
            throw new http_1.AppError("sourceType invalide", 400);
        }
        if (body.journalType)
            data.journalType = body.journalType;
        if (body.pieceNumber !== undefined)
            data.pieceNumber = body.pieceNumber;
        if (body.description !== undefined || body.businessLabel !== undefined) {
            if (!metadata.businessLabel)
                throw new http_1.AppError("businessLabel (ou description) obligatoire", 400);
            data.description = metadata.businessLabel;
        }
        if (body.sourceType !== undefined || body.sync?.sourceType !== undefined) {
            data.sourceType = metadata.sourceType;
        }
        if (body.sourceId !== undefined || body.sync !== undefined) {
            data.sourceId = metadata.syncIdentifier;
        }
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
    res.status(200).json(toEntryResponse(updated));
}));
exports.accountingRoutes.put("/entries/:id/validate", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const updated = await prisma_1.prisma.journalEntry.update({
        where: { id },
        data: { isValidated: true, validatedAt: new Date() },
        include: { lines: true },
    });
    res.status(200).json(toEntryResponse(updated));
}));
exports.accountingRoutes.delete("/entries/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const entry = await prisma_1.prisma.journalEntry.findUnique({ where: { id }, include: { lines: true } });
    if (!entry)
        throw new http_1.AppError("Ecriture introuvable", 404);
    const autoSyncedSourceTypes = [
        client_1.SourceType.PURCHASE,
        client_1.SourceType.SALE,
        client_1.SourceType.DONATION_FINANCIAL,
        client_1.SourceType.DONATION_MATERIAL,
    ];
    const isAutoSyncedEntry = entry.sourceType ? autoSyncedSourceTypes.includes(entry.sourceType) : false;
    if (entry.isValidated && !isAutoSyncedEntry) {
        throw new http_1.AppError("Suppression interdite: ecriture deja validee", 400);
    }
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