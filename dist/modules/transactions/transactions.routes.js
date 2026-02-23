"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
const client_1 = require("../../generated/prisma/client");
const express_1 = require("express");
const http_1 = require("../../common/http");
const prisma_1 = require("../../config/prisma");
exports.transactionsRoutes = (0, express_1.Router)();
function resolvePaymentMethodAccountNumber(paymentMethod) {
    switch (paymentMethod) {
        case client_1.PaymentMethod.CASH:
            return "101";
        case client_1.PaymentMethod.CHECK:
        case client_1.PaymentMethod.BANK_TRANSFER:
        case client_1.PaymentMethod.CREDIT_CARD:
        case client_1.PaymentMethod.MOBILE_MONEY:
            return "102";
        case client_1.PaymentMethod.IN_KIND:
            return "101";
        default:
            return "101";
    }
}
async function getOpenFiscalYearForDate(tx, date) {
    const fiscalYear = await tx.fiscalYear.findFirst({
        where: {
            isClosed: false,
            startDate: { lte: date },
            endDate: { gte: date },
        },
        orderBy: { startDate: "desc" },
    });
    if (!fiscalYear) {
        throw new http_1.AppError("Aucun exercice comptable ouvert pour cette date", 400);
    }
    return fiscalYear;
}
async function getAccountIdByNumber(tx, accountNumber) {
    const account = await tx.account.findFirst({
        where: { accountNumber, isActive: true },
        select: { id: true },
    });
    if (!account) {
        throw new http_1.AppError(`Compte comptable introuvable: ${accountNumber}`, 500);
    }
    return account.id;
}
async function createAutoJournalEntry(tx, params) {
    if (params.amount.lte(0))
        return;
    const fiscalYear = await getOpenFiscalYearForDate(tx, params.date);
    const existingCount = await tx.journalEntry.count({ where: { fiscalYearId: fiscalYear.id } });
    const entryNumber = `${fiscalYear.name}-${String(existingCount + 1).padStart(5, "0")}`;
    const debitAccountId = await getAccountIdByNumber(tx, params.debitAccountNumber);
    const creditAccountId = await getAccountIdByNumber(tx, params.creditAccountNumber);
    await tx.journalEntry.create({
        data: {
            entryNumber,
            fiscalYearId: fiscalYear.id,
            date: params.date,
            journalType: params.journalType,
            pieceNumber: params.pieceNumber,
            description: params.description,
            sourceType: params.sourceType,
            sourceId: params.sourceId,
            isValidated: true,
            validatedAt: new Date(),
            lines: {
                create: [
                    {
                        accountId: debitAccountId,
                        debit: params.amount,
                        credit: new client_1.Prisma.Decimal(0),
                        description: params.description,
                    },
                    {
                        accountId: creditAccountId,
                        debit: new client_1.Prisma.Decimal(0),
                        credit: params.amount,
                        description: params.description,
                    },
                ],
            },
        },
    });
}
function assertPositiveInt(value, field) {
    if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
        throw new http_1.AppError(`${field} doit etre un entier positif`, 400);
    }
    return value;
}
function normalizeEnumToken(value) {
    return value.trim().toUpperCase().replace(/[\s-]+/g, "_");
}
function parsePaymentMethod(value) {
    if (value === undefined || value === null || value === "")
        return undefined;
    const token = normalizeEnumToken(String(value));
    const mapped = {
        CASH: client_1.PaymentMethod.CASH,
        ESPECE: client_1.PaymentMethod.CASH,
        CHECK: client_1.PaymentMethod.CHECK,
        CHEQUE: client_1.PaymentMethod.CHECK,
        BANK_TRANSFER: client_1.PaymentMethod.BANK_TRANSFER,
        VIREMENT: client_1.PaymentMethod.BANK_TRANSFER,
        CREDIT_CARD: client_1.PaymentMethod.CREDIT_CARD,
        CARTE: client_1.PaymentMethod.CREDIT_CARD,
        MOBILE_MONEY: client_1.PaymentMethod.MOBILE_MONEY,
        IN_KIND: client_1.PaymentMethod.IN_KIND,
        NATURE: client_1.PaymentMethod.IN_KIND,
    };
    const parsed = mapped[token];
    if (!parsed)
        throw new http_1.AppError("paymentMethod invalide", 400);
    return parsed;
}
function parsePaymentStatus(value) {
    if (value === undefined || value === null || value === "")
        return undefined;
    const token = normalizeEnumToken(String(value));
    const mapped = {
        PENDING: client_1.PaymentStatus.PENDING,
        EN_ATTENTE: client_1.PaymentStatus.PENDING,
        PAID: client_1.PaymentStatus.PAID,
        PAYE: client_1.PaymentStatus.PAID,
        PARTIALLY_PAID: client_1.PaymentStatus.PARTIALLY_PAID,
        PARTIELLEMENT_PAYE: client_1.PaymentStatus.PARTIALLY_PAID,
        CANCELLED: client_1.PaymentStatus.CANCELLED,
        ANNULE: client_1.PaymentStatus.CANCELLED,
        REFUNDED: client_1.PaymentStatus.REFUNDED,
        REMBOURSE: client_1.PaymentStatus.REFUNDED,
    };
    const parsed = mapped[token];
    if (!parsed)
        throw new http_1.AppError("paymentStatus invalide", 400);
    return parsed;
}
function parseDonationKind(value) {
    if (value === undefined || value === null || value === "")
        return undefined;
    const token = normalizeEnumToken(String(value));
    const mapped = {
        FINANCIAL: client_1.DonationKind.FINANCIAL,
        FINANCIER: client_1.DonationKind.FINANCIAL,
        MATERIAL: client_1.DonationKind.MATERIAL,
        MATERIEL: client_1.DonationKind.MATERIAL,
    };
    const parsed = mapped[token];
    if (!parsed)
        throw new http_1.AppError("donationKind invalide", 400);
    return parsed;
}
function parseDonationDirection(value) {
    if (value === undefined || value === null || value === "")
        return undefined;
    const token = normalizeEnumToken(String(value));
    const mapped = {
        IN: client_1.DonationDirection.IN,
        ENTREE: client_1.DonationDirection.IN,
        ENTRANT: client_1.DonationDirection.IN,
        OUT: client_1.DonationDirection.OUT,
        SORTIE: client_1.DonationDirection.OUT,
        SORTANT: client_1.DonationDirection.OUT,
    };
    const parsed = mapped[token];
    if (!parsed)
        throw new http_1.AppError("direction invalide", 400);
    return parsed;
}
function parseDonorType(value) {
    if (value === undefined || value === null || value === "")
        return undefined;
    const token = normalizeEnumToken(String(value));
    const mapped = {
        INDIVIDUAL: client_1.DonorType.INDIVIDUAL,
        PHYSIQUE: client_1.DonorType.INDIVIDUAL,
        CORPORATE: client_1.DonorType.CORPORATE,
        MORAL: client_1.DonorType.CORPORATE,
        ASSOCIATION: client_1.DonorType.ASSOCIATION,
        CHURCH: client_1.DonorType.CHURCH,
        EGLISE: client_1.DonorType.CHURCH,
    };
    const parsed = mapped[token];
    if (!parsed)
        throw new http_1.AppError("donorType invalide", 400);
    return parsed;
}
function parseDate(value, field) {
    if (value === undefined || value === null || value === "")
        return undefined;
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime()))
        throw new http_1.AppError(`${field} invalide`, 400);
    return date;
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
    const quantity = assertPositiveInt(body.quantity, "quantity");
    const unitPrice = body.unitPrice;
    if (typeof unitPrice !== "number" || unitPrice <= 0)
        throw new http_1.AppError("unitPrice doit etre positif", 400);
    const paymentMethod = parsePaymentMethod(body.paymentMethod) ?? client_1.PaymentMethod.CASH;
    const paymentStatus = parsePaymentStatus(body.paymentStatus) ?? client_1.PaymentStatus.PAID;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const totalAmount = new client_1.Prisma.Decimal(unitPrice).mul(quantity);
        const unitPriceDecimal = new client_1.Prisma.Decimal(unitPrice);
        const purchase = await tx.purchase.create({
            data: {
                supplierId: body.supplierId,
                paymentMethod,
                paymentStatus,
                invoiceNumber: body.invoiceNumber,
                notes: body.notes,
                items: { create: { quantity, unitPrice: unitPriceDecimal, totalAmount } },
            },
            include: { items: true },
        });
        if (paymentStatus !== client_1.PaymentStatus.CANCELLED && paymentStatus !== client_1.PaymentStatus.REFUNDED) {
            await createAutoJournalEntry(tx, {
                date: purchase.purchaseDate,
                journalType: "PURCHASE",
                description: `Achat ${purchase.invoiceNumber ?? purchase.id}`,
                sourceType: client_1.SourceType.PURCHASE,
                sourceId: purchase.id,
                debitAccountNumber: "601",
                creditAccountNumber: paymentStatus === client_1.PaymentStatus.PENDING ? "201" : resolvePaymentMethodAccountNumber(paymentMethod),
                amount: totalAmount,
                pieceNumber: purchase.invoiceNumber ?? undefined,
            });
        }
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
    const paymentMethod = parsePaymentMethod(body.paymentMethod) ?? client_1.PaymentMethod.CASH;
    const paymentStatus = parsePaymentStatus(body.paymentStatus) ?? client_1.PaymentStatus.PAID;
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
                paymentMethod,
                paymentStatus,
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
        if (paymentStatus !== client_1.PaymentStatus.CANCELLED && paymentStatus !== client_1.PaymentStatus.REFUNDED) {
            await createAutoJournalEntry(tx, {
                date: sale.saleDate,
                journalType: "SALES",
                description: `Vente ${sale.invoiceNumber ?? sale.id}`,
                sourceType: client_1.SourceType.SALE,
                sourceId: sale.id,
                debitAccountNumber: resolvePaymentMethodAccountNumber(paymentMethod),
                creditAccountNumber: "701",
                amount: totalAmount,
                pieceNumber: sale.invoiceNumber ?? undefined,
            });
        }
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
exports.transactionsRoutes.put("/loan/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body;
    const expectedReturnAt = parseDate(body.expectedReturnAt, "expectedReturnAt");
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const existing = await tx.loan.findUnique({ where: { id } });
        if (!existing)
            throw new http_1.AppError("Emprunt introuvable", 404);
        if (body.personId) {
            const person = await tx.person.findFirst({ where: { id: body.personId, deletedAt: null } });
            if (!person)
                throw new http_1.AppError("Personne introuvable", 404);
        }
        return tx.loan.update({
            where: { id },
            data: {
                personId: body.personId,
                expectedReturnAt,
                notes: body.notes,
            },
            include: { items: true },
        });
    });
    res.status(200).json(result);
}));
exports.transactionsRoutes.delete("/loan/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    await prisma_1.prisma.$transaction(async (tx) => {
        const loan = await tx.loan.findUnique({ where: { id }, include: { items: true } });
        if (!loan)
            throw new http_1.AppError("Emprunt introuvable", 404);
        const shouldRestoreStock = loan.status === client_1.LoanStatus.ACTIVE || loan.status === client_1.LoanStatus.OVERDUE;
        if (shouldRestoreStock) {
            for (const item of loan.items) {
                await tx.material.update({ where: { id: item.materialId }, data: { currentStock: { increment: item.quantity } } });
            }
        }
        await tx.stockMovement.deleteMany({
            where: {
                sourceId: id,
                sourceType: { in: [client_1.SourceType.LOAN, client_1.SourceType.RETURN] },
            },
        });
        await tx.loan.delete({ where: { id } });
    });
    res.status(204).send();
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
// GET all donations with optional filters
exports.transactionsRoutes.get("/donations", (0, http_1.asyncHandler)(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit) || 50, 500);
    const offset = parseInt(req.query.offset) || 0;
    const donorId = req.query.donorId;
    const kind = req.query.kind;
    const from = req.query.from;
    const to = req.query.to;
    const where = {};
    if (donorId)
        where.donorId = donorId;
    if (kind) {
        const parsedKind = kind.toUpperCase() === "FINANCIAL" ? client_1.DonationKind.FINANCIAL :
            kind.toUpperCase() === "MATERIAL" ? client_1.DonationKind.MATERIAL : undefined;
        if (parsedKind)
            where.donationKind = parsedKind;
    }
    if (from || to) {
        where.donationDate = {};
        if (from)
            where.donationDate.gte = new Date(from);
        if (to)
            where.donationDate.lte = new Date(to);
    }
    const [donations, total] = await Promise.all([
        prisma_1.prisma.donation.findMany({
            where,
            include: {
                donor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        isDonor: true,
                    },
                },
                items: true,
            },
            orderBy: { donationDate: "desc" },
            take: limit,
            skip: offset,
        }),
        prisma_1.prisma.donation.count({ where }),
    ]);
    res.status(200).json({
        donations,
        pagination: {
            total,
            limit,
            offset,
            hasMore: offset + limit < total,
        },
    });
}));
// GET single donation by ID
exports.transactionsRoutes.get("/donation/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const donation = await prisma_1.prisma.donation.findUnique({
        where: { id },
        include: {
            donor: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    isDonor: true,
                },
            },
            items: {
                include: {
                    material: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
                            currentStock: true,
                        },
                    },
                },
            },
        },
    });
    if (!donation)
        throw new http_1.AppError("Don introuvable", 404);
    res.status(200).json(donation);
}));
exports.transactionsRoutes.post("/donation", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.donationKind)
        throw new http_1.AppError("donationKind obligatoire", 400);
    const donationKind = parseDonationKind(body.donationKind);
    if (!donationKind)
        throw new http_1.AppError("donationKind obligatoire", 400);
    const direction = parseDonationDirection(body.direction) ?? client_1.DonationDirection.IN;
    const paymentMethod = parsePaymentMethod(body.paymentMethod);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        if (body.donorId) {
            const donor = await tx.person.findFirst({ where: { id: body.donorId, deletedAt: null } });
            if (!donor)
                throw new http_1.AppError("Donateur introuvable", 404);
            if (!donor.isDonor) {
                await tx.person.update({ where: { id: donor.id }, data: { isDonor: true } });
            }
        }
        const donation = await tx.donation.create({
            data: {
                donorId: body.donorId,
                donorName: body.donorName,
                donorType: parseDonorType(body.donorType),
                donationKind,
                direction,
                amount: typeof body.amount === "number" ? new client_1.Prisma.Decimal(body.amount) : null,
                paymentMethod,
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
            if (direction === client_1.DonationDirection.IN) {
                const donationAmount = new client_1.Prisma.Decimal(body.amount);
                const methodForAccounting = paymentMethod ?? client_1.PaymentMethod.CASH;
                await createAutoJournalEntry(tx, {
                    date: donation.donationDate,
                    journalType: "CASH",
                    description: `Don financier ${donation.id}`,
                    sourceType: client_1.SourceType.DONATION_FINANCIAL,
                    sourceId: donation.id,
                    debitAccountNumber: resolvePaymentMethodAccountNumber(methodForAccounting),
                    creditAccountNumber: "702",
                    amount: donationAmount,
                });
            }
        }
        return tx.donation.findUnique({ where: { id: donation.id }, include: { items: true } });
    });
    res.status(201).json(result);
}));
exports.transactionsRoutes.get("/donation/:id/audit", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const donation = await prisma_1.prisma.donation.findUnique({
        where: { id },
        include: {
            donor: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    isDonor: true,
                },
            },
            items: {
                select: {
                    id: true,
                    materialId: true,
                    quantity: true,
                },
            },
        },
    });
    if (!donation)
        throw new http_1.AppError("Don introuvable", 404);
    const accountingEntry = donation.donationKind === client_1.DonationKind.FINANCIAL
        ? await prisma_1.prisma.journalEntry.findFirst({
            where: {
                sourceType: client_1.SourceType.DONATION_FINANCIAL,
                sourceId: donation.id,
            },
            include: {
                lines: {
                    include: {
                        account: {
                            select: {
                                id: true,
                                accountNumber: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        })
        : null;
    res.status(200).json({
        donation,
        sync: {
            donor: {
                donorId: donation.donorId,
                isDonor: donation.donor?.isDonor ?? null,
                synced: donation.donorId ? Boolean(donation.donor?.isDonor) : null,
            },
            accounting: {
                expected: donation.donationKind === client_1.DonationKind.FINANCIAL &&
                    donation.direction === client_1.DonationDirection.IN,
                found: Boolean(accountingEntry),
                entry: accountingEntry,
            },
        },
    });
}));
exports.transactionsRoutes.put("/donation/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body;
    const donationDate = parseDate(body.donationDate, "donationDate");
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const existing = await tx.donation.findUnique({ where: { id } });
        if (!existing)
            throw new http_1.AppError("Don introuvable", 404);
        if (body.donorId) {
            const donor = await tx.person.findFirst({ where: { id: body.donorId, deletedAt: null } });
            if (!donor)
                throw new http_1.AppError("Donateur introuvable", 404);
        }
        if (existing.donationKind === client_1.DonationKind.FINANCIAL && body.amount !== undefined) {
            if (typeof body.amount !== "number" || body.amount <= 0) {
                throw new http_1.AppError("amount doit etre positif pour un don financier", 400);
            }
        }
        return tx.donation.update({
            where: { id },
            data: {
                donorId: body.donorId,
                donorName: body.donorName,
                donorType: parseDonorType(body.donorType),
                paymentMethod: parsePaymentMethod(body.paymentMethod),
                donationDate,
                description: body.description,
                institution: body.institution,
                amount: body.amount === undefined
                    ? undefined
                    : typeof body.amount === "number"
                        ? new client_1.Prisma.Decimal(body.amount)
                        : null,
            },
            include: { items: true },
        });
    });
    res.status(200).json(result);
}));
exports.transactionsRoutes.delete("/donation/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    await prisma_1.prisma.$transaction(async (tx) => {
        const donation = await tx.donation.findUnique({ where: { id }, include: { items: true } });
        if (!donation)
            throw new http_1.AppError("Don introuvable", 404);
        if (donation.donationKind === client_1.DonationKind.MATERIAL) {
            for (const item of donation.items) {
                const material = await tx.material.findFirst({ where: { id: item.materialId, deletedAt: null } });
                if (!material)
                    throw new http_1.AppError("Materiel introuvable", 404);
                if (donation.direction === client_1.DonationDirection.IN) {
                    if (material.currentStock < item.quantity) {
                        throw new http_1.AppError(`Suppression impossible: stock insuffisant pour ${material.name}`, 400);
                    }
                    await tx.material.update({ where: { id: item.materialId }, data: { currentStock: { decrement: item.quantity } } });
                }
                else {
                    await tx.material.update({ where: { id: item.materialId }, data: { currentStock: { increment: item.quantity } } });
                }
            }
        }
        await tx.stockMovement.deleteMany({
            where: {
                sourceId: id,
                sourceType: { in: [client_1.SourceType.DONATION_FINANCIAL, client_1.SourceType.DONATION_MATERIAL] },
            },
        });
        await tx.donation.delete({ where: { id } });
    });
    res.status(204).send();
}));
exports.transactionsRoutes.put("/purchase/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body;
    const purchaseDate = parseDate(body.purchaseDate, "purchaseDate");
    const unitPrice = typeof body.unitPrice === "number" ? body.unitPrice : typeof body.montant === "number" ? body.montant : undefined;
    if (unitPrice !== undefined && unitPrice <= 0)
        throw new http_1.AppError("unitPrice doit etre positif", 400);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const existing = await tx.purchase.findUnique({ where: { id }, include: { items: true } });
        if (!existing)
            throw new http_1.AppError("Achat introuvable", 404);
        if (body.supplierId) {
            const supplier = await tx.person.findFirst({ where: { id: body.supplierId, deletedAt: null } });
            if (!supplier)
                throw new http_1.AppError("Fournisseur introuvable", 404);
        }
        const updated = await tx.purchase.update({
            where: { id },
            data: {
                supplierId: body.supplierId,
                paymentMethod: parsePaymentMethod(body.paymentMethod),
                paymentStatus: parsePaymentStatus(body.paymentStatus),
                invoiceNumber: body.invoiceNumber,
                notes: body.notes,
                purchaseDate,
            },
            include: { items: true },
        });
        if (unitPrice !== undefined) {
            const unitPriceDecimal = new client_1.Prisma.Decimal(unitPrice);
            for (const item of updated.items) {
                await tx.purchaseItem.update({
                    where: { id: item.id },
                    data: {
                        unitPrice: unitPriceDecimal,
                        totalAmount: unitPriceDecimal.mul(item.quantity),
                    },
                });
            }
        }
        return tx.purchase.findUnique({ where: { id }, include: { items: true } });
    });
    res.status(200).json(result);
}));
exports.transactionsRoutes.delete("/purchase/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    await prisma_1.prisma.$transaction(async (tx) => {
        const purchase = await tx.purchase.findUnique({ where: { id }, include: { items: true } });
        if (!purchase)
            throw new http_1.AppError("Achat introuvable", 404);
        await tx.stockMovement.deleteMany({ where: { sourceType: client_1.SourceType.PURCHASE, sourceId: id } });
        await tx.purchase.delete({ where: { id } });
    });
    res.status(204).send();
}));
exports.transactionsRoutes.put("/sale/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body;
    const saleDate = parseDate(body.saleDate, "saleDate");
    const unitPrice = typeof body.unitPrice === "number" ? body.unitPrice : typeof body.montant === "number" ? body.montant : undefined;
    if (unitPrice !== undefined && unitPrice <= 0)
        throw new http_1.AppError("unitPrice doit etre positif", 400);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const existing = await tx.sale.findUnique({ where: { id }, include: { items: true } });
        if (!existing)
            throw new http_1.AppError("Vente introuvable", 404);
        if (body.personId) {
            const person = await tx.person.findFirst({ where: { id: body.personId, deletedAt: null } });
            if (!person)
                throw new http_1.AppError("Acheteur introuvable", 404);
        }
        const updated = await tx.sale.update({
            where: { id },
            data: {
                personId: body.personId,
                paymentMethod: parsePaymentMethod(body.paymentMethod),
                paymentStatus: parsePaymentStatus(body.paymentStatus),
                invoiceNumber: body.invoiceNumber,
                notes: body.notes,
                saleDate,
            },
            include: { items: true },
        });
        if (unitPrice !== undefined) {
            const unitPriceDecimal = new client_1.Prisma.Decimal(unitPrice);
            for (const item of updated.items) {
                await tx.saleItem.update({
                    where: { id: item.id },
                    data: {
                        unitPrice: unitPriceDecimal,
                        totalAmount: unitPriceDecimal.mul(item.quantity),
                    },
                });
            }
        }
        return tx.sale.findUnique({ where: { id }, include: { items: true } });
    });
    res.status(200).json(result);
}));
exports.transactionsRoutes.delete("/sale/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    await prisma_1.prisma.$transaction(async (tx) => {
        const sale = await tx.sale.findUnique({ where: { id }, include: { items: true } });
        if (!sale)
            throw new http_1.AppError("Vente introuvable", 404);
        for (const item of sale.items) {
            await tx.material.update({ where: { id: item.materialId }, data: { currentStock: { increment: item.quantity } } });
        }
        await tx.stockMovement.deleteMany({ where: { sourceType: client_1.SourceType.SALE, sourceId: id } });
        await tx.sale.delete({ where: { id } });
    });
    res.status(204).send();
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