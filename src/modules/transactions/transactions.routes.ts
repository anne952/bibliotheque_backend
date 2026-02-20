import { DonationDirection, DonationKind, MaterialType, PaymentMethod, PaymentStatus, Prisma, StockMovementType } from "../../generated/prisma/client";
import { Router } from "express";
import { AppError, asyncHandler } from "../../common/http";
import { prisma } from "../../config/prisma";

export const transactionsRoutes = Router();

function assertPositiveInt(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new AppError(`${field} doit etre un entier positif`, 400);
  }

  return value;
}

transactionsRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    const rows = await prisma.stockMovement.findMany({ orderBy: { movementDate: "desc" } });
    res.status(200).json(rows);
  }),
);

transactionsRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const row = await prisma.stockMovement.findUnique({ where: { id } });
    if (!row) throw new AppError("Transaction introuvable", 404);
    res.status(200).json(row);
  }),
);

transactionsRoutes.post(
  "/purchase",
  asyncHandler(async (req, res) => {
    const body = req.body as {
      materialId?: string;
      quantity?: number;
      unitPrice?: number;
      paymentMethod?: PaymentMethod;
      paymentStatus?: PaymentStatus;
      supplierId?: string;
      invoiceNumber?: string;
      notes?: string;
      reference?: string;
    };

    if (!body.materialId) throw new AppError("materialId obligatoire", 400);
    const materialId = body.materialId;
    const quantity = assertPositiveInt(body.quantity, "quantity");
    const unitPrice = body.unitPrice;
    if (typeof unitPrice !== "number" || unitPrice <= 0) throw new AppError("unitPrice doit etre positif", 400);

    const result = await prisma.$transaction(async (tx) => {
      const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
      if (!material) throw new AppError("Materiel introuvable", 404);

      const totalAmount = new Prisma.Decimal(unitPrice).mul(quantity);
      const unitPriceDecimal = new Prisma.Decimal(unitPrice);

      const purchase = await tx.purchase.create({
        data: {
          supplierId: body.supplierId,
          paymentMethod: body.paymentMethod ?? PaymentMethod.CASH,
          paymentStatus: body.paymentStatus ?? PaymentStatus.PAID,
          invoiceNumber: body.invoiceNumber,
          notes: body.notes,
          items: { create: { materialId, quantity, unitPrice: unitPriceDecimal, totalAmount } },
        },
        include: { items: true },
      });

      await tx.stockMovement.create({
        data: {
          materialId,
          movementType: StockMovementType.PURCHASE_IN,
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
  }),
);

transactionsRoutes.post(
  "/sale",
  asyncHandler(async (req, res) => {
    const body = req.body as {
      materialId?: string;
      quantity?: number;
      unitPrice?: number;
      personId?: string;
      paymentMethod?: PaymentMethod;
      paymentStatus?: PaymentStatus;
      invoiceNumber?: string;
      notes?: string;
      reference?: string;
    };

    if (!body.materialId) throw new AppError("materialId obligatoire", 400);
    const materialId = body.materialId;
    const quantity = assertPositiveInt(body.quantity, "quantity");
    const unitPrice = body.unitPrice;
    if (typeof unitPrice !== "number" || unitPrice <= 0) throw new AppError("unitPrice doit etre positif", 400);

    const result = await prisma.$transaction(async (tx) => {
      const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
      if (!material) throw new AppError("Materiel introuvable", 404);
      if (material.currentStock < quantity) throw new AppError("Stock insuffisant pour la vente", 400);

      const totalAmount = new Prisma.Decimal(unitPrice).mul(quantity);
      const unitPriceDecimal = new Prisma.Decimal(unitPrice);

      const sale = await tx.sale.create({
        data: {
          personId: body.personId,
          paymentMethod: body.paymentMethod ?? PaymentMethod.CASH,
          paymentStatus: body.paymentStatus ?? PaymentStatus.PAID,
          invoiceNumber: body.invoiceNumber,
          notes: body.notes,
          items: { create: { materialId, quantity, unitPrice: unitPriceDecimal, totalAmount } },
        },
        include: { items: true },
      });

      await tx.stockMovement.create({
        data: {
          materialId,
          movementType: StockMovementType.SALE_OUT,
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
  }),
);

transactionsRoutes.post(
  "/loan",
  asyncHandler(async (req, res) => {
    const body = req.body as {
      personId?: string;
      expectedReturnAt?: string;
      notes?: string;
      items?: Array<{ materialId?: string; quantity?: number }>;
    };

    if (!body.personId) throw new AppError("personId obligatoire", 400);
    if (!body.expectedReturnAt) throw new AppError("expectedReturnAt obligatoire", 400);
    if (!Array.isArray(body.items) || body.items.length === 0) throw new AppError("items obligatoire", 400);
    if (body.items.length > 3) throw new AppError("Un emprunt ne peut pas contenir plus de 3 titres", 400);

    const personId = body.personId;
    const expectedReturnAt = new Date(body.expectedReturnAt);

    const result = await prisma.$transaction(async (tx) => {
      const person = await tx.person.findFirst({ where: { id: personId, deletedAt: null } });
      if (!person) throw new AppError("Personne introuvable", 404);

      const loan = await tx.loan.create({
        data: {
          personId,
          expectedReturnAt,
          notes: body.notes,
        },
      });

      for (const item of body.items ?? []) {
        if (!item.materialId) throw new AppError("materialId obligatoire dans items", 400);
        const materialId = item.materialId;
        const qty = assertPositiveInt(item.quantity, "quantity");

        const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
        if (!material) throw new AppError("Materiel introuvable", 404);
        if (material.type !== MaterialType.BOOK) throw new AppError("Seuls les livres peuvent etre empruntes", 400);
        if (material.currentStock < qty) throw new AppError(`Stock insuffisant pour ${material.name}`, 400);

        await tx.loanItem.create({ data: { loanId: loan.id, materialId, quantity: qty } });
        await tx.stockMovement.create({
          data: {
            materialId,
            movementType: StockMovementType.LOAN_OUT,
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
  }),
);

transactionsRoutes.post(
  "/return",
  asyncHandler(async (req, res) => {
    const body = req.body as { loanId?: string; notes?: string };
    if (!body.loanId) throw new AppError("loanId obligatoire", 400);
    const loanId = body.loanId;

    const result = await prisma.$transaction(async (tx) => {
      const loan = await tx.loan.findUnique({ where: { id: loanId }, include: { items: true } });
      if (!loan) throw new AppError("Emprunt introuvable", 404);
      if (loan.status !== "ACTIVE") throw new AppError("Cet emprunt n'est pas actif", 400);

      for (const item of loan.items) {
        await tx.stockMovement.create({
          data: {
            materialId: item.materialId,
            movementType: StockMovementType.RETURN_IN,
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
  }),
);

transactionsRoutes.post(
  "/donation",
  asyncHandler(async (req, res) => {
    const body = req.body as {
      donorId?: string;
      donorName?: string;
      donorType?: "INDIVIDUAL" | "CORPORATE" | "ASSOCIATION" | "CHURCH" | "OTHER";
      donationKind?: DonationKind;
      direction?: DonationDirection;
      amount?: number;
      paymentMethod?: PaymentMethod;
      description?: string;
      institution?: string;
      items?: Array<{ materialId?: string; quantity?: number }>;
    };

    if (!body.donationKind) throw new AppError("donationKind obligatoire", 400);
    const donationKind = body.donationKind;
    const direction = body.direction ?? DonationDirection.IN;

    const result = await prisma.$transaction(async (tx) => {
      const donation = await tx.donation.create({
        data: {
          donorId: body.donorId,
          donorName: body.donorName,
          donorType: body.donorType,
          donationKind,
          direction,
          amount: typeof body.amount === "number" ? new Prisma.Decimal(body.amount) : null,
          paymentMethod: body.paymentMethod,
          description: body.description,
          institution: body.institution,
        },
      });

      if (donationKind === DonationKind.MATERIAL) {
        if (!Array.isArray(body.items) || body.items.length === 0) {
          throw new AppError("items obligatoires pour un don materiel", 400);
        }

        for (const item of body.items) {
          if (!item.materialId) throw new AppError("materialId obligatoire dans items", 400);
          const materialId = item.materialId;
          const quantity = assertPositiveInt(item.quantity, "quantity");

          const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
          if (!material) throw new AppError("Materiel introuvable", 404);
          if (direction === DonationDirection.OUT && material.currentStock < quantity) {
            throw new AppError(`Stock insuffisant pour ${material.name}`, 400);
          }

          await tx.donationItem.create({ data: { donationId: donation.id, materialId, quantity } });
          await tx.stockMovement.create({
            data: {
              materialId,
              movementType: direction === DonationDirection.IN ? StockMovementType.DONATION_IN : StockMovementType.DONATION_OUT,
              quantity,
              sourceType: "DONATION_MATERIAL",
              sourceId: donation.id,
              description: body.description,
            },
          });
          await tx.material.update({
            where: { id: materialId },
            data: direction === DonationDirection.IN ? { currentStock: { increment: quantity } } : { currentStock: { decrement: quantity } },
          });
        }
      } else {
        if (typeof body.amount !== "number" || body.amount <= 0) {
          throw new AppError("amount doit etre positif pour un don financier", 400);
        }
      }

      return tx.donation.findUnique({ where: { id: donation.id }, include: { items: true } });
    });

    res.status(201).json(result);
  }),
);

transactionsRoutes.post(
  "/adjustment",
  asyncHandler(async (req, res) => {
    const body = req.body as { materialId?: string; quantityDelta?: number; description?: string; reference?: string };

    if (!body.materialId) throw new AppError("materialId obligatoire", 400);
    const materialId = body.materialId;
    const quantityDelta = body.quantityDelta;
    if (typeof quantityDelta !== "number" || !Number.isInteger(quantityDelta) || quantityDelta === 0) {
      throw new AppError("quantityDelta doit etre un entier non nul", 400);
    }

    const result = await prisma.$transaction(async (tx) => {
      const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
      if (!material) throw new AppError("Materiel introuvable", 404);

      const nextStock = material.currentStock + quantityDelta;
      if (nextStock < 0) throw new AppError("Ajustement impossible: stock negatif", 400);

      const movement = await tx.stockMovement.create({
        data: {
          materialId,
          movementType: StockMovementType.ADJUSTMENT,
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
  }),
);