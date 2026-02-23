"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedItemsRoutes = void 0;
const express_1 = require("express");
const client_1 = require("../../generated/prisma/client");
const http_1 = require("../../common/http");
const auth_middleware_1 = require("../../common/auth.middleware");
const prisma_1 = require("../../config/prisma");
exports.deletedItemsRoutes = (0, express_1.Router)();
exports.deletedItemsRoutes.use(auth_middleware_1.authMiddleware);
exports.deletedItemsRoutes.get("/", (0, http_1.asyncHandler)(async (req, res) => {
    const includeRestored = String(req.query.includeRestored ?? "false") === "true";
    const includeExpired = String(req.query.includeExpired ?? "false") === "true";
    const table = req.query.table ? String(req.query.table) : undefined;
    const limitRaw = req.query.limit ? Number(req.query.limit) : 100;
    const limit = Number.isFinite(limitRaw) ? Math.max(1, Math.min(500, Math.trunc(limitRaw))) : 100;
    const where = {};
    if (!includeRestored)
        where.restoredAt = null;
    if (!includeExpired)
        where.expiresAt = { gt: new Date() };
    if (table)
        where.originalTable = table;
    const items = await prisma_1.prisma.deletedItem.findMany({
        where,
        orderBy: { deletedAt: "desc" },
        take: limit,
    });
    res.status(200).json(items);
}));
exports.deletedItemsRoutes.post("/:id/restore", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const restored = await prisma_1.prisma.$transaction(async (tx) => {
        const item = await tx.deletedItem.findUnique({ where: { id } });
        if (!item)
            throw new http_1.AppError("DeletedItem introuvable", 404);
        if (item.restoredAt)
            throw new http_1.AppError("Cet element est deja restaure", 409);
        if (item.expiresAt < new Date())
            throw new http_1.AppError("Delai de restauration depasse", 410);
        switch (item.originalTable) {
            case "Person": {
                const person = await tx.person.findUnique({ where: { id: item.originalId } });
                if (!person) {
                    throw new http_1.AppError("Personne introuvable pour restauration", 409);
                }
                await tx.person.update({ where: { id: item.originalId }, data: { deletedAt: null } });
                break;
            }
            case "Material": {
                const material = await tx.material.findUnique({ where: { id: item.originalId } });
                if (!material) {
                    throw new http_1.AppError("Materiel introuvable pour restauration", 409);
                }
                await tx.material.update({ where: { id: item.originalId }, data: { deletedAt: null } });
                break;
            }
            case "JournalEntry": {
                const data = item.data;
                if (typeof data !== "object" || data === null || Array.isArray(data)) {
                    throw new http_1.AppError("Donnees de restauration invalides", 400);
                }
                const payload = data;
                const linesRaw = Array.isArray(payload.lines) ? payload.lines : [];
                const fiscalYearId = typeof payload.fiscalYearId === "string" ? payload.fiscalYearId : "";
                const entryNumber = typeof payload.entryNumber === "string" ? payload.entryNumber : "";
                const description = typeof payload.description === "string" ? payload.description : "";
                if (!fiscalYearId || !entryNumber || !description || linesRaw.length === 0) {
                    throw new http_1.AppError("Donnees de restauration JournalEntry incompletes", 400);
                }
                const existingEntry = await tx.journalEntry.findUnique({ where: { id: item.originalId } });
                if (existingEntry) {
                    throw new http_1.AppError("Ecriture deja presente, restauration impossible", 409);
                }
                const journalType = typeof payload.journalType === "string" ? payload.journalType : "";
                if (!Object.values(client_1.JournalType).includes(journalType)) {
                    throw new http_1.AppError("journalType invalide dans les donnees restaurees", 400);
                }
                const parsedDate = payload.date ? new Date(String(payload.date)) : null;
                if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
                    throw new http_1.AppError("Date invalide dans les donnees restaurees", 400);
                }
                await tx.journalEntry.create({
                    data: {
                        id: item.originalId,
                        entryNumber,
                        fiscalYearId,
                        date: parsedDate,
                        journalType: journalType,
                        pieceNumber: typeof payload.pieceNumber === "string" ? payload.pieceNumber : null,
                        description,
                        sourceType: typeof payload.sourceType === "string" &&
                            Object.values(client_1.SourceType).includes(payload.sourceType)
                            ? payload.sourceType
                            : null,
                        sourceId: typeof payload.sourceId === "string" ? payload.sourceId : null,
                        isValidated: typeof payload.isValidated === "boolean" ? payload.isValidated : false,
                        validatedAt: payload.validatedAt ? new Date(String(payload.validatedAt)) : null,
                        validatedById: typeof payload.validatedById === "string" ? payload.validatedById : null,
                        lines: {
                            create: linesRaw.map((lineValue) => {
                                if (typeof lineValue !== "object" || lineValue === null || Array.isArray(lineValue)) {
                                    throw new http_1.AppError("Ligne comptable invalide dans les donnees restaurees", 400);
                                }
                                const line = lineValue;
                                const accountId = typeof line.accountId === "string" ? line.accountId : "";
                                if (!accountId)
                                    throw new http_1.AppError("accountId manquant dans une ligne restauree", 400);
                                const debitSource = line.debit;
                                const creditSource = line.credit;
                                return {
                                    id: typeof line.id === "string" ? line.id : undefined,
                                    accountId,
                                    debit: new client_1.Prisma.Decimal(debitSource === undefined || debitSource === null ? 0 : String(debitSource)),
                                    credit: new client_1.Prisma.Decimal(creditSource === undefined || creditSource === null ? 0 : String(creditSource)),
                                    description: typeof line.description === "string" ? line.description : null,
                                };
                            }),
                        },
                    },
                    include: { lines: true },
                });
                break;
            }
            default:
                throw new http_1.AppError(`Restauration non supportee pour ${item.originalTable}`, 400);
        }
        return tx.deletedItem.update({
            where: { id: item.id },
            data: {
                restoredAt: new Date(),
                restoredById: req.userId ?? null,
            },
        });
    });
    res.status(200).json(restored);
}));
exports.deletedItemsRoutes.delete("/purge-expired", (0, http_1.asyncHandler)(async (_req, res) => {
    const now = new Date();
    const result = await prisma_1.prisma.deletedItem.deleteMany({
        where: {
            expiresAt: { lte: now },
        },
    });
    res.status(200).json({ deletedCount: result.count });
}));
exports.deletedItemsRoutes.delete("/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const existing = await prisma_1.prisma.deletedItem.findUnique({ where: { id } });
    if (!existing)
        throw new http_1.AppError("DeletedItem introuvable", 404);
    await prisma_1.prisma.deletedItem.delete({ where: { id } });
    res.status(204).send();
}));
//# sourceMappingURL=deleted-items.routes.js.map