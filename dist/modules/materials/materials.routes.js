"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialsRoutes = void 0;
const client_1 = require("../../generated/prisma/client");
const express_1 = require("express");
const http_1 = require("../../common/http");
const prisma_1 = require("../../config/prisma");
exports.materialsRoutes = (0, express_1.Router)();
const materialTypeValues = new Set(Object.values(client_1.MaterialType));
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
    const lines = pastedData
        .split(/\r?\n/)
        .map((line) => line.trimEnd())
        .filter((line) => line.trim().length > 0);
    if (lines.length < 2) {
        throw new http_1.AppError("Le tableau colle doit contenir un en-tete et au moins une ligne", 400);
    }
    const delimiter = lines[0].includes("\t") ? "\t" : ";";
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
    const nameValue = pick("name", "nom", "designation", "libelle");
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
    if (!body.pastedData && !Array.isArray(body.rows)) {
        throw new http_1.AppError("Vous devez fournir pastedData ou rows", 400);
    }
    if (body.defaultType && !materialTypeValues.has(body.defaultType)) {
        throw new http_1.AppError("defaultType invalide", 400);
    }
    const rawRows = Array.isArray(body.rows)
        ? body.rows
        : parseExcelPasteToJson(String(body.pastedData ?? ""));
    if (rawRows.length === 0) {
        throw new http_1.AppError("Aucune ligne exploitable a importer", 400);
    }
    const parsedRows = rawRows.map((row, index) => mapRawRowToMaterial(row, index + 1, body.defaultType));
    const createdMaterials = await prisma_1.prisma.$transaction(async (tx) => {
        const created = [];
        for (let index = 0; index < parsedRows.length; index += 1) {
            const row = parsedRows[index];
            const material = await tx.material.create({
                data: {
                    type: row.type,
                    name: row.name,
                    reference: row.reference ?? null,
                    serialNumber: row.serialNumber ?? null,
                    category: row.category ?? null,
                    language: row.language ?? null,
                    volume: row.volume ?? null,
                    minStockAlert: row.minStockAlert ?? 0,
                    unitPrice: row.unitPrice !== undefined ? new client_1.Prisma.Decimal(row.unitPrice) : null,
                    sellingPrice: row.sellingPrice !== undefined ? new client_1.Prisma.Decimal(row.sellingPrice) : null,
                    location: row.location ?? null,
                    description: row.description ?? null,
                },
                select: { id: true, name: true },
            });
            created.push({ id: material.id, name: material.name, rowNumber: index + 1 });
        }
        return created;
    });
    res.status(201).json({
        receivedRows: rawRows.length,
        jsonRows: rawRows,
        createdCount: createdMaterials.length,
        createdMaterials,
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