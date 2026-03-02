"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialsRoutes = void 0;
const client_1 = require("../../generated/prisma/client");
const express_1 = require("express");
const http_1 = require("../../common/http");
const prisma_1 = require("../../config/prisma");
exports.materialsRoutes = (0, express_1.Router)();
const materialTypeValues = new Set(Object.values(client_1.MaterialType));
const IMPORT_BATCH_SIZE = 50;
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
function mapRawRowToMaterial(rawRow, rowNumber, defaultType) {
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
    const typeValue = pick("type", "materialtype", "typemateriel", "materieltype");
    const nameValue = pick("name", "nom", "designation", "libelle", "titre");
    const referenceValue = pick("reference", "ref");
    const serialNumberValue = pick("serialnumber", "numero serie", "numeroserie");
    const categoryValue = pick("category", "categorie");
    const languageValue = pick("language", "langue");
    const volumeValue = pick("volume", "tome");
    const minStockAlertValue = pick("minstockalert", "minstock", "stockminimum", "alertestock");
    const unitPriceValue = pick("unitprice", "prixachat", "prixunitaire");
    const sellingPriceValue = pick("sellingprice", "prixvente");
    const locationValue = pick("location", "emplacement", "localisation");
    const descriptionValue = pick("description", "details", "commentaire");
    let type = defaultType;
    if (typeValue !== undefined) {
        const normalizedType = String(typeValue).trim().toUpperCase();
        if (!materialTypeValues.has(normalizedType)) {
            throw new http_1.AppError(`Ligne ${rowNumber}: type de materiel invalide`, 400);
        }
        type = normalizedType;
    }
    if (!type) {
        throw new http_1.AppError(`Ligne ${rowNumber}: type de materiel obligatoire`, 400);
    }
    const name = String(nameValue ?? "").trim();
    if (!name) {
        throw new http_1.AppError(`Ligne ${rowNumber}: nom/designation obligatoire`, 400);
    }
    const minStockAlertRaw = minStockAlertValue !== undefined ? parseFlexibleAmount(minStockAlertValue) : undefined;
    if (minStockAlertRaw !== undefined && (!Number.isFinite(minStockAlertRaw) || !Number.isInteger(minStockAlertRaw) || minStockAlertRaw < 0)) {
        throw new http_1.AppError(`Ligne ${rowNumber}: minStockAlert invalide`, 400);
    }
    const unitPriceRaw = unitPriceValue !== undefined ? parseFlexibleAmount(unitPriceValue) : undefined;
    if (unitPriceRaw !== undefined && (!Number.isFinite(unitPriceRaw) || unitPriceRaw < 0)) {
        throw new http_1.AppError(`Ligne ${rowNumber}: unitPrice invalide`, 400);
    }
    const sellingPriceRaw = sellingPriceValue !== undefined ? parseFlexibleAmount(sellingPriceValue) : undefined;
    if (sellingPriceRaw !== undefined && (!Number.isFinite(sellingPriceRaw) || sellingPriceRaw < 0)) {
        throw new http_1.AppError(`Ligne ${rowNumber}: sellingPrice invalide`, 400);
    }
    const normalizeOptional = (value) => {
        if (value === undefined || value === null)
            return undefined;
        const parsed = String(value).trim();
        return parsed.length > 0 ? parsed : undefined;
    };
    return {
        type,
        name,
        reference: normalizeOptional(referenceValue),
        serialNumber: normalizeOptional(serialNumberValue),
        category: normalizeOptional(categoryValue),
        language: normalizeOptional(languageValue),
        volume: normalizeOptional(volumeValue),
        minStockAlert: minStockAlertRaw,
        unitPrice: unitPriceRaw,
        sellingPrice: sellingPriceRaw,
        location: normalizeOptional(locationValue),
        description: normalizeOptional(descriptionValue),
    };
}
exports.materialsRoutes.get("/", (0, http_1.asyncHandler)(async (_req, res) => {
    const materials = await prisma_1.prisma.material.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
    });
    res.status(200).json(materials);
}));
exports.materialsRoutes.get("/low-stock", (0, http_1.asyncHandler)(async (_req, res) => {
    const materials = await prisma_1.prisma.material.findMany({
        where: { deletedAt: null },
        orderBy: { currentStock: "asc" },
    });
    const lowStock = materials.filter((m) => m.currentStock <= m.minStockAlert);
    res.status(200).json(lowStock);
}));
exports.materialsRoutes.get("/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const material = await prisma_1.prisma.material.findFirst({
        where: { id, deletedAt: null },
    });
    if (!material)
        throw new http_1.AppError("Materiel introuvable", 404);
    res.status(200).json(material);
}));
exports.materialsRoutes.get("/:id/transactions", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const material = await prisma_1.prisma.material.findFirst({
        where: { id, deletedAt: null },
        select: { id: true },
    });
    if (!material)
        throw new http_1.AppError("Materiel introuvable", 404);
    const transactions = await prisma_1.prisma.stockMovement.findMany({
        where: { materialId: id },
        orderBy: { movementDate: "desc" },
    });
    res.status(200).json(transactions);
}));
exports.materialsRoutes.post("/", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.type || !Object.values(client_1.MaterialType).includes(body.type)) {
        throw new http_1.AppError("Type de materiel invalide", 400);
    }
    if (!body.name?.trim()) {
        throw new http_1.AppError("Le nom du materiel est obligatoire", 400);
    }
    const data = {
        type: body.type,
        name: body.name.trim(),
        reference: body.reference?.trim() || null,
        serialNumber: body.serialNumber?.trim() || null,
        category: body.category?.trim() || null,
        language: body.language?.trim() || null,
        volume: body.volume?.trim() || null,
        minStockAlert: Number.isInteger(body.minStockAlert) ? body.minStockAlert : 0,
        unitPrice: typeof body.unitPrice === "number" ? new client_1.Prisma.Decimal(body.unitPrice) : null,
        sellingPrice: typeof body.sellingPrice === "number" ? new client_1.Prisma.Decimal(body.sellingPrice) : null,
        location: body.location?.trim() || null,
        description: body.description?.trim() || null,
    };
    const material = await prisma_1.prisma.material.create({ data });
    res.status(201).json(material);
}));
exports.materialsRoutes.post("/import-paste", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    const hasRowsField = Object.prototype.hasOwnProperty.call(body, "rows");
    if (!hasRowsField && !body.pastedData) {
        throw new http_1.AppError("Vous devez fournir pastedData ou rows", 400);
    }
    if (hasRowsField && !Array.isArray(body.rows)) {
        throw new http_1.AppError("rows doit etre un tableau JSON", 400);
    }
    if (body.defaultType && !materialTypeValues.has(body.defaultType)) {
        throw new http_1.AppError("defaultType invalide", 400);
    }
    const rawRows = hasRowsField
        ? body.rows
        : parseExcelPasteToJson(String(body.pastedData ?? ""));
    if (rawRows.length === 0) {
        throw new http_1.AppError("Aucune ligne exploitable a importer", 400);
    }
    const startedAt = Date.now();
    const upsertedMaterials = [];
    const lineErrors = [];
    const errors = [];
    const upsertSingleMaterial = async (row, rowNumber) => {
        const reference = row.reference?.trim() || null;
        const serialNumber = row.serialNumber?.trim() || null;
        const matchCandidates = [];
        if (reference)
            matchCandidates.push({ reference });
        if (serialNumber)
            matchCandidates.push({ serialNumber });
        const matches = matchCandidates.length > 0
            ? await prisma_1.prisma.material.findMany({
                where: { OR: matchCandidates },
                select: { id: true, reference: true, serialNumber: true },
                take: 3,
            })
            : [];
        const uniqueMatchIds = Array.from(new Set(matches.map((material) => material.id)));
        if (uniqueMatchIds.length > 1) {
            throw new http_1.AppError(`Ligne ${rowNumber}: doublon ambigu reference/numero de serie detecte, ligne ignoree`, 400);
        }
        const baseData = {
            type: row.type,
            name: row.name,
            reference,
            serialNumber,
            category: row.category ?? null,
            language: row.language ?? null,
            volume: row.volume ?? null,
            minStockAlert: row.minStockAlert ?? 0,
            unitPrice: row.unitPrice !== undefined ? new client_1.Prisma.Decimal(row.unitPrice) : null,
            sellingPrice: row.sellingPrice !== undefined ? new client_1.Prisma.Decimal(row.sellingPrice) : null,
            location: row.location ?? null,
            description: row.description ?? null,
        };
        const resolvedMaterialId = uniqueMatchIds[0];
        if (resolvedMaterialId) {
            const updated = await prisma_1.prisma.material.update({
                where: { id: resolvedMaterialId },
                data: {
                    ...baseData,
                    deletedAt: null,
                },
                select: { id: true, name: true },
            });
            return {
                id: updated.id,
                name: updated.name,
                rowNumber,
                operation: "updated",
            };
        }
        try {
            const created = await prisma_1.prisma.material.create({
                data: baseData,
                select: { id: true, name: true },
            });
            return {
                id: created.id,
                name: created.name,
                rowNumber,
                operation: "created",
            };
        }
        catch (error) {
            if (!(error instanceof client_1.Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") {
                throw error;
            }
            const conflictCandidates = [];
            if (reference)
                conflictCandidates.push({ reference });
            if (serialNumber)
                conflictCandidates.push({ serialNumber });
            if (conflictCandidates.length === 0) {
                throw error;
            }
            const conflictedMaterial = await prisma_1.prisma.material.findFirst({
                where: { OR: conflictCandidates },
                select: { id: true },
            });
            if (!conflictedMaterial) {
                throw error;
            }
            const updated = await prisma_1.prisma.material.update({
                where: { id: conflictedMaterial.id },
                data: {
                    ...baseData,
                    deletedAt: null,
                },
                select: { id: true, name: true },
            });
            return {
                id: updated.id,
                name: updated.name,
                rowNumber,
                operation: "updated",
            };
        }
    };
    for (let start = 0; start < rawRows.length; start += IMPORT_BATCH_SIZE) {
        const batch = rawRows.slice(start, start + IMPORT_BATCH_SIZE);
        for (let offset = 0; offset < batch.length; offset += 1) {
            const rowNumber = start + offset + 1;
            const rawRow = batch[offset];
            try {
                const parsed = mapRawRowToMaterial(rawRow, rowNumber, body.defaultType);
                const result = await upsertSingleMaterial(parsed, rowNumber);
                upsertedMaterials.push(result);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "Erreur inconnue";
                lineErrors.push({
                    rowNumber,
                    message,
                    row: rawRow,
                });
            }
        }
    }
    if (upsertedMaterials.length === 0) {
        errors.push("Aucune ligne n'a pu etre importee");
    }
    upsertedMaterials.sort((a, b) => a.rowNumber - b.rowNumber);
    const createdCount = upsertedMaterials.filter((material) => material.operation === "created").length;
    const updatedCount = upsertedMaterials.filter((material) => material.operation === "updated").length;
    const failedCount = lineErrors.length;
    const durationMs = Date.now() - startedAt;
    console.info("[materials/import-paste] completed", {
        durationMs,
        receivedRows: rawRows.length,
        processedCount: upsertedMaterials.length,
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
        processedCount: upsertedMaterials.length,
        createdMaterials: upsertedMaterials,
    });
}));
exports.materialsRoutes.put("/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const exists = await prisma_1.prisma.material.findFirst({
        where: { id, deletedAt: null },
        select: { id: true },
    });
    if (!exists)
        throw new http_1.AppError("Materiel introuvable", 404);
    const body = req.body;
    const data = {};
    if (typeof body.name === "string")
        data.name = body.name.trim();
    if (typeof body.reference === "string" || body.reference === null)
        data.reference = body.reference?.trim() || null;
    if (typeof body.serialNumber === "string" || body.serialNumber === null)
        data.serialNumber = body.serialNumber?.trim() || null;
    if (typeof body.category === "string" || body.category === null)
        data.category = body.category?.trim() || null;
    if (typeof body.language === "string" || body.language === null)
        data.language = body.language?.trim() || null;
    if (typeof body.volume === "string" || body.volume === null)
        data.volume = body.volume?.trim() || null;
    if (typeof body.location === "string" || body.location === null)
        data.location = body.location?.trim() || null;
    if (typeof body.description === "string" || body.description === null)
        data.description = body.description?.trim() || null;
    if (typeof body.minStockAlert === "number" && Number.isInteger(body.minStockAlert))
        data.minStockAlert = body.minStockAlert;
    if (typeof body.unitPrice === "number")
        data.unitPrice = new client_1.Prisma.Decimal(body.unitPrice);
    if (typeof body.sellingPrice === "number")
        data.sellingPrice = new client_1.Prisma.Decimal(body.sellingPrice);
    const updated = await prisma_1.prisma.material.update({ where: { id }, data });
    res.status(200).json(updated);
}));
exports.materialsRoutes.delete("/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const material = await prisma_1.prisma.material.findFirst({ where: { id, deletedAt: null } });
    if (!material)
        throw new http_1.AppError("Materiel introuvable", 404);
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.material.update({ where: { id }, data: { deletedAt: new Date() } });
        await tx.deletedItem.create({
            data: {
                originalTable: "Material",
                originalId: material.id,
                data: JSON.parse(JSON.stringify(material)),
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
        });
    });
    res.status(204).send();
}));
//# sourceMappingURL=materials.routes.js.map