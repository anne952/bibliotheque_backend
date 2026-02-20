"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
const client_1 = require("../../generated/prisma/client");
const express_1 = require("express");
const http_1 = require("../../common/http");
const prisma_1 = require("../../config/prisma");
exports.transactionsRoutes = (0, express_1.Router)();
function assertPositiveInt(value, field) {
    if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
        throw new http_1.AppError(`${field} doit etre un entier positif`, 400);
    }
    return value;
}
exports.transactionsRoutes.get("/", (0, http_1.asyncHandler)(async (_req, res) => {
    const rows = await prisma_1.prisma.stockMovement.findMany({ orderBy: { movementDate: "desc" } });
    res.status(200).json(rows);
}));
exports.transactionsRoutes.get("/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const row = await prisma_1.prisma.stockMovement.findUnique({ where: { id } });
    if (!row)
        throw new http_1.AppError("Transaction introuvable", 404);
    res.status(200).json(row);
}));
exports.transactionsRoutes.post("/purchase", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.materialId)
        throw new http_1.AppError("materialId obligatoire", 400);
    const materialId = body.materialId;
    const quantity = assertPositiveInt(body.quantity, "quantity");
    const unitPrice = body.unitPrice;
    if (typeof unitPrice !== "number" || unitPrice <= 0)
        throw new http_1.AppError("unitPrice doit etre positif", 400);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
        if (!material)
            throw new http_1.AppError("Materiel introuvable", 404);
        const totalAmount = new client_1.Prisma.Decimal(unitPrice).mul(quantity);
        const unitPriceDecimal = new client_1.Prisma.Decimal(unitPrice);
        const purchase = await tx.purchase.create({
            data: {
                supplierId: body.supplierId,
                paymentMethod: body.paymentMethod ?? client_1.PaymentMethod.CASH,
                paymentStatus: body.paymentStatus ?? client_1.PaymentStatus.PAID,
                invoiceNumber: body.invoiceNumber,
                notes: body.notes,
                items: { create: { materialId, quantity, unitPrice: unitPriceDecimal, totalAmount } },
            },
            include: { items: true },
        });
        await tx.stockMovement.create({
            data: {
                materialId,
                movementType: client_1.StockMovementType.PURCHASE_IN,
                quantity,
                unitPrice: unitPriceDecimal,
                totalAmount,
                reference: body.reference,
                sourceType: "PURCHASE",
                sourceId: purchase.id,
                description: body.notes,
            },
        });
        await tx.material.update({ where: { id: materialId }, data: { currentStock: { increment: quantity } } });
        return purchase;
    });
    res.status(201).json(result);
}));
exports.transactionsRoutes.post("/sale", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.materialId)
        throw new http_1.AppError("materialId obligatoire", 400);
    const materialId = body.materialId;
    const quantity = assertPositiveInt(body.quantity, "quantity");
    const unitPrice = body.unitPrice;
    if (typeof unitPrice !== "number" || unitPrice <= 0)
        throw new http_1.AppError("unitPrice doit etre positif", 400);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
        if (!material)
            throw new http_1.AppError("Materiel introuvable", 404);
        if (material.currentStock < quantity)
            throw new http_1.AppError("Stock insuffisant pour la vente", 400);
        const totalAmount = new client_1.Prisma.Decimal(unitPrice).mul(quantity);
        const unitPriceDecimal = new client_1.Prisma.Decimal(unitPrice);
        const sale = await tx.sale.create({
            data: {
                personId: body.personId,
                paymentMethod: body.paymentMethod ?? client_1.PaymentMethod.CASH,
                paymentStatus: body.paymentStatus ?? client_1.PaymentStatus.PAID,
                invoiceNumber: body.invoiceNumber,
                notes: body.notes,
                items: { create: { materialId, quantity, unitPrice: unitPriceDecimal, totalAmount } },
            },
            include: { items: true },
        });
        await tx.stockMovement.create({
            data: {
                materialId,
                movementType: client_1.StockMovementType.SALE_OUT,
                quantity,
                unitPrice: unitPriceDecimal,
                totalAmount,
                reference: body.reference,
                sourceType: "SALE",
                sourceId: sale.id,
                description: body.notes,
            },
        });
        await tx.material.update({ where: { id: materialId }, data: { currentStock: { decrement: quantity } } });
        return sale;
    });
    res.status(201).json(result);
}));
exports.transactionsRoutes.post("/loan", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.personId)
        throw new http_1.AppError("personId obligatoire", 400);
    if (!body.expectedReturnAt)
        throw new http_1.AppError("expectedReturnAt obligatoire", 400);
    if (!Array.isArray(body.items) || body.items.length === 0)
        throw new http_1.AppError("items obligatoire", 400);
    if (body.items.length > 3)
        throw new http_1.AppError("Un emprunt ne peut pas contenir plus de 3 titres", 400);
    const personId = body.personId;
    const expectedReturnAt = new Date(body.expectedReturnAt);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const person = await tx.person.findFirst({ where: { id: personId, deletedAt: null } });
        if (!person)
            throw new http_1.AppError("Personne introuvable", 404);
        const loan = await tx.loan.create({
            data: {
                personId,
                expectedReturnAt,
                notes: body.notes,
            },
        });
        for (const item of body.items ?? []) {
            if (!item.materialId)
                throw new http_1.AppError("materialId obligatoire dans items", 400);
            const materialId = item.materialId;
            const qty = assertPositiveInt(item.quantity, "quantity");
            const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
            if (!material)
                throw new http_1.AppError("Materiel introuvable", 404);
            if (material.type !== client_1.MaterialType.BOOK)
                throw new http_1.AppError("Seuls les livres peuvent etre empruntes", 400);
            if (material.currentStock < qty)
                throw new http_1.AppError(`Stock insuffisant pour ${material.name}`, 400);
            await tx.loanItem.create({ data: { loanId: loan.id, materialId, quantity: qty } });
            await tx.stockMovement.create({
                data: {
                    materialId,
                    movementType: client_1.StockMovementType.LOAN_OUT,
                    quantity: qty,
                    sourceType: "LOAN",
                    sourceId: loan.id,
                    description: body.notes,
                },
            });
            await tx.material.update({ where: { id: materialId }, data: { currentStock: { decrement: qty } } });
        }
        return tx.loan.findUnique({ where: { id: loan.id }, include: { items: true } });
    });
    res.status(201).json(result);
}));
exports.transactionsRoutes.post("/return", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.loanId)
        throw new http_1.AppError("loanId obligatoire", 400);
    const loanId = body.loanId;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const loan = await tx.loan.findUnique({ where: { id: loanId }, include: { items: true } });
        if (!loan)
            throw new http_1.AppError("Emprunt introuvable", 404);
        if (loan.status !== "ACTIVE")
            throw new http_1.AppError("Cet emprunt n'est pas actif", 400);
        for (const item of loan.items) {
            await tx.stockMovement.create({
                data: {
                    materialId: item.materialId,
                    movementType: client_1.StockMovementType.RETURN_IN,
                    quantity: item.quantity,
                    sourceType: "RETURN",
                    sourceId: loan.id,
                    description: body.notes,
                },
            });
            await tx.material.update({ where: { id: item.materialId }, data: { currentStock: { increment: item.quantity } } });
        }
        return tx.loan.update({
            where: { id: loan.id },
            data: { status: "RETURNED", returnedAt: new Date(), notes: body.notes ?? loan.notes },
            include: { items: true },
        });
    });
    res.status(200).json(result);
}));
exports.transactionsRoutes.post("/donation", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.donationKind)
        throw new http_1.AppError("donationKind obligatoire", 400);
    const donationKind = body.donationKind;
    const direction = body.direction ?? client_1.DonationDirection.IN;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const donation = await tx.donation.create({
            data: {
                donorId: body.donorId,
                donorName: body.donorName,
                donorType: body.donorType,
                donationKind,
                direction,
                amount: typeof body.amount === "number" ? new client_1.Prisma.Decimal(body.amount) : null,
                paymentMethod: body.paymentMethod,
                description: body.description,
                institution: body.institution,
            },
        });
        if (donationKind === client_1.DonationKind.MATERIAL) {
            if (!Array.isArray(body.items) || body.items.length === 0) {
                throw new http_1.AppError("items obligatoires pour un don materiel", 400);
            }
            for (const item of body.items) {
                if (!item.materialId)
                    throw new http_1.AppError("materialId obligatoire dans items", 400);
                const materialId = item.materialId;
                const quantity = assertPositiveInt(item.quantity, "quantity");
                const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
                if (!material)
                    throw new http_1.AppError("Materiel introuvable", 404);
                if (direction === client_1.DonationDirection.OUT && material.currentStock < quantity) {
                    throw new http_1.AppError(`Stock insuffisant pour ${material.name}`, 400);
                }
                await tx.donationItem.create({ data: { donationId: donation.id, materialId, quantity } });
                await tx.stockMovement.create({
                    data: {
                        materialId,
                        movementType: direction === client_1.DonationDirection.IN ? client_1.StockMovementType.DONATION_IN : client_1.StockMovementType.DONATION_OUT,
                        quantity,
                        sourceType: "DONATION_MATERIAL",
                        sourceId: donation.id,
                        description: body.description,
                    },
                });
                await tx.material.update({
                    where: { id: materialId },
                    data: direction === client_1.DonationDirection.IN ? { currentStock: { increment: quantity } } : { currentStock: { decrement: quantity } },
                });
            }
        }
        else {
            if (typeof body.amount !== "number" || body.amount <= 0) {
                throw new http_1.AppError("amount doit etre positif pour un don financier", 400);
            }
        }
        return tx.donation.findUnique({ where: { id: donation.id }, include: { items: true } });
    });
    res.status(201).json(result);
}));
exports.transactionsRoutes.post("/adjustment", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.materialId)
        throw new http_1.AppError("materialId obligatoire", 400);
    const materialId = body.materialId;
    const quantityDelta = body.quantityDelta;
    if (typeof quantityDelta !== "number" || !Number.isInteger(quantityDelta) || quantityDelta === 0) {
        throw new http_1.AppError("quantityDelta doit etre un entier non nul", 400);
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
        if (!material)
            throw new http_1.AppError("Materiel introuvable", 404);
        const nextStock = material.currentStock + quantityDelta;
        if (nextStock < 0)
            throw new http_1.AppError("Ajustement impossible: stock negatif", 400);
        const movement = await tx.stockMovement.create({
            data: {
                materialId,
                movementType: client_1.StockMovementType.ADJUSTMENT,
                quantity: Math.abs(quantityDelta),
                sourceType: "STOCK_ADJUSTMENT",
                description: body.description,
                reference: body.reference,
            },
        });
        await tx.material.update({
            where: { id: materialId },
            data: quantityDelta > 0 ? { currentStock: { increment: quantityDelta } } : { currentStock: { decrement: Math.abs(quantityDelta) } },
        });
        return movement;
    });
    res.status(201).json(result);
}));
//# sourceMappingURL=transactions.routes.js.map