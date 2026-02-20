import { MaterialType, Prisma } from "../../generated/prisma/client";
import { Router } from "express";
import { AppError, asyncHandler } from "../../common/http";
import { prisma } from "../../config/prisma";

export const materialsRoutes = Router();

materialsRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    const materials = await prisma.material.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(materials);
  }),
);

materialsRoutes.get(
  "/low-stock",
  asyncHandler(async (_req, res) => {
    const materials = await prisma.material.findMany({
      where: { deletedAt: null },
      orderBy: { currentStock: "asc" },
    });

    const lowStock = materials.filter((m) => m.currentStock <= m.minStockAlert);
    res.status(200).json(lowStock);
  }),
);

materialsRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const material = await prisma.material.findFirst({
      where: { id, deletedAt: null },
    });

    if (!material) throw new AppError("Materiel introuvable", 404);
    res.status(200).json(material);
  }),
);

materialsRoutes.get(
  "/:id/transactions",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const material = await prisma.material.findFirst({
      where: { id, deletedAt: null },
      select: { id: true },
    });

    if (!material) throw new AppError("Materiel introuvable", 404);

    const transactions = await prisma.stockMovement.findMany({
      where: { materialId: id },
      orderBy: { movementDate: "desc" },
    });

    res.status(200).json(transactions);
  }),
);

materialsRoutes.post(
  "/",
  asyncHandler(async (req, res) => {
    const body = req.body as {
      type?: MaterialType;
      name?: string;
      reference?: string;
      serialNumber?: string;
      category?: string;
      language?: string;
      volume?: string;
      minStockAlert?: number;
      unitPrice?: number;
      sellingPrice?: number;
      location?: string;
      description?: string;
    };

    if (!body.type || !Object.values(MaterialType).includes(body.type)) {
      throw new AppError("Type de materiel invalide", 400);
    }

    if (!body.name?.trim()) {
      throw new AppError("Le nom du materiel est obligatoire", 400);
    }

    const data: Prisma.MaterialCreateInput = {
      type: body.type,
      name: body.name.trim(),
      reference: body.reference?.trim() || null,
      serialNumber: body.serialNumber?.trim() || null,
      category: body.category?.trim() || null,
      language: body.language?.trim() || null,
      volume: body.volume?.trim() || null,
      minStockAlert: Number.isInteger(body.minStockAlert) ? body.minStockAlert : 0,
      unitPrice: typeof body.unitPrice === "number" ? new Prisma.Decimal(body.unitPrice) : null,
      sellingPrice: typeof body.sellingPrice === "number" ? new Prisma.Decimal(body.sellingPrice) : null,
      location: body.location?.trim() || null,
      description: body.description?.trim() || null,
    };

    const material = await prisma.material.create({ data });
    res.status(201).json(material);
  }),
);

materialsRoutes.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const exists = await prisma.material.findFirst({
      where: { id, deletedAt: null },
      select: { id: true },
    });

    if (!exists) throw new AppError("Materiel introuvable", 404);

    const body = req.body as Record<string, unknown>;
    const data: Prisma.MaterialUpdateInput = {};

    if (typeof body.name === "string") data.name = body.name.trim();
    if (typeof body.reference === "string" || body.reference === null) data.reference = (body.reference as string | null)?.trim() || null;
    if (typeof body.serialNumber === "string" || body.serialNumber === null) data.serialNumber = (body.serialNumber as string | null)?.trim() || null;
    if (typeof body.category === "string" || body.category === null) data.category = (body.category as string | null)?.trim() || null;
    if (typeof body.language === "string" || body.language === null) data.language = (body.language as string | null)?.trim() || null;
    if (typeof body.volume === "string" || body.volume === null) data.volume = (body.volume as string | null)?.trim() || null;
    if (typeof body.location === "string" || body.location === null) data.location = (body.location as string | null)?.trim() || null;
    if (typeof body.description === "string" || body.description === null) data.description = (body.description as string | null)?.trim() || null;
    if (typeof body.minStockAlert === "number" && Number.isInteger(body.minStockAlert)) data.minStockAlert = body.minStockAlert;
    if (typeof body.unitPrice === "number") data.unitPrice = new Prisma.Decimal(body.unitPrice);
    if (typeof body.sellingPrice === "number") data.sellingPrice = new Prisma.Decimal(body.sellingPrice);

    const updated = await prisma.material.update({ where: { id }, data });
    res.status(200).json(updated);
  }),
);

materialsRoutes.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const material = await prisma.material.findFirst({ where: { id, deletedAt: null } });
    if (!material) throw new AppError("Materiel introuvable", 404);

    await prisma.$transaction(async (tx) => {
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
  }),
);