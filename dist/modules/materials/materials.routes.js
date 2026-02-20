"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialsRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const http_1 = require("../../common/http");
const prisma_1 = require("../../config/prisma");
exports.materialsRoutes = (0, express_1.Router)();
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