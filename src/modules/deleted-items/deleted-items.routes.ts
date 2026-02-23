import { Router } from "express";
import { JournalType, Prisma, SourceType } from "../../generated/prisma/client";
import { asyncHandler, AppError } from "../../common/http";
import { authMiddleware } from "../../common/auth.middleware";
import { prisma } from "../../config/prisma";

export const deletedItemsRoutes = Router();

deletedItemsRoutes.use(authMiddleware);

deletedItemsRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const includeRestored = String(req.query.includeRestored ?? "false") === "true";
    const includeExpired = String(req.query.includeExpired ?? "false") === "true";
    const table = req.query.table ? String(req.query.table) : undefined;
    const limitRaw = req.query.limit ? Number(req.query.limit) : 100;
    const limit = Number.isFinite(limitRaw) ? Math.max(1, Math.min(500, Math.trunc(limitRaw))) : 100;

    const where: Prisma.DeletedItemWhereInput = {};
    if (!includeRestored) where.restoredAt = null;
    if (!includeExpired) where.expiresAt = { gt: new Date() };
    if (table) where.originalTable = table;

    const items = await prisma.deletedItem.findMany({
      where,
      orderBy: { deletedAt: "desc" },
      take: limit,
    });

    res.status(200).json(items);
  }),
);

deletedItemsRoutes.post(
  "/:id/restore",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);

    const restored = await prisma.$transaction(async (tx) => {
      const item = await tx.deletedItem.findUnique({ where: { id } });
      if (!item) throw new AppError("DeletedItem introuvable", 404);
      if (item.restoredAt) throw new AppError("Cet element est deja restaure", 409);
      if (item.expiresAt < new Date()) throw new AppError("Delai de restauration depasse", 410);

      switch (item.originalTable) {
        case "Person": {
          const person = await tx.person.findUnique({ where: { id: item.originalId } });
          if (!person) {
            throw new AppError("Personne introuvable pour restauration", 409);
          }
          await tx.person.update({ where: { id: item.originalId }, data: { deletedAt: null } });
          break;
        }

        case "Material": {
          const material = await tx.material.findUnique({ where: { id: item.originalId } });
          if (!material) {
            throw new AppError("Materiel introuvable pour restauration", 409);
          }
          await tx.material.update({ where: { id: item.originalId }, data: { deletedAt: null } });
          break;
        }

        case "JournalEntry": {
          const data = item.data as Prisma.JsonValue;
          if (typeof data !== "object" || data === null || Array.isArray(data)) {
            throw new AppError("Donnees de restauration invalides", 400);
          }

          const payload = data as Record<string, unknown>;
          const linesRaw = Array.isArray(payload.lines) ? payload.lines : [];
          const fiscalYearId = typeof payload.fiscalYearId === "string" ? payload.fiscalYearId : "";
          const entryNumber = typeof payload.entryNumber === "string" ? payload.entryNumber : "";
          const description = typeof payload.description === "string" ? payload.description : "";

          if (!fiscalYearId || !entryNumber || !description || linesRaw.length === 0) {
            throw new AppError("Donnees de restauration JournalEntry incompletes", 400);
          }

          const existingEntry = await tx.journalEntry.findUnique({ where: { id: item.originalId } });
          if (existingEntry) {
            throw new AppError("Ecriture deja presente, restauration impossible", 409);
          }

          const journalType = typeof payload.journalType === "string" ? payload.journalType : "";
          if (!Object.values(JournalType).includes(journalType as JournalType)) {
            throw new AppError("journalType invalide dans les donnees restaurees", 400);
          }

          const parsedDate = payload.date ? new Date(String(payload.date)) : null;
          if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
            throw new AppError("Date invalide dans les donnees restaurees", 400);
          }

          await tx.journalEntry.create({
            data: {
              id: item.originalId,
              entryNumber,
              fiscalYearId,
              date: parsedDate,
              journalType: journalType as JournalType,
              pieceNumber: typeof payload.pieceNumber === "string" ? payload.pieceNumber : null,
              description,
              sourceType:
                typeof payload.sourceType === "string" &&
                Object.values(SourceType).includes(payload.sourceType as SourceType)
                  ? (payload.sourceType as SourceType)
                  : null,
              sourceId: typeof payload.sourceId === "string" ? payload.sourceId : null,
              isValidated: typeof payload.isValidated === "boolean" ? payload.isValidated : false,
              validatedAt: payload.validatedAt ? new Date(String(payload.validatedAt)) : null,
              validatedById: typeof payload.validatedById === "string" ? payload.validatedById : null,
              lines: {
                create: linesRaw.map((lineValue) => {
                  if (typeof lineValue !== "object" || lineValue === null || Array.isArray(lineValue)) {
                    throw new AppError("Ligne comptable invalide dans les donnees restaurees", 400);
                  }

                  const line = lineValue as Record<string, unknown>;
                  const accountId = typeof line.accountId === "string" ? line.accountId : "";
                  if (!accountId) throw new AppError("accountId manquant dans une ligne restauree", 400);

                  const debitSource = line.debit;
                  const creditSource = line.credit;

                  return {
                    id: typeof line.id === "string" ? line.id : undefined,
                    accountId,
                    debit: new Prisma.Decimal(debitSource === undefined || debitSource === null ? 0 : String(debitSource)),
                    credit: new Prisma.Decimal(creditSource === undefined || creditSource === null ? 0 : String(creditSource)),
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
          throw new AppError(`Restauration non supportee pour ${item.originalTable}`, 400);
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
  }),
);

deletedItemsRoutes.delete(
  "/purge-expired",
  asyncHandler(async (_req, res) => {
    const now = new Date();
    const result = await prisma.deletedItem.deleteMany({
      where: {
        expiresAt: { lte: now },
      },
    });

    res.status(200).json({ deletedCount: result.count });
  }),
);

deletedItemsRoutes.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const existing = await prisma.deletedItem.findUnique({ where: { id } });
    if (!existing) throw new AppError("DeletedItem introuvable", 404);

    await prisma.deletedItem.delete({ where: { id } });
    res.status(204).send();
  }),
);
