import { DonationDirection, DonationKind, DonorType, LoanStatus, MaterialType, PaymentMethod, PaymentStatus, Prisma, SourceType, StockMovementType } from "../../generated/prisma/client";
import { Router } from "express";
import { AppError, asyncHandler } from "../../common/http";
import { prisma } from "../../config/prisma";

export const transactionsRoutes = Router();

function resolvePaymentMethodAccountNumber(paymentMethod: PaymentMethod): string {
  switch (paymentMethod) {
    case PaymentMethod.CASH:
      return "101";
    case PaymentMethod.CHECK:
    case PaymentMethod.BANK_TRANSFER:
    case PaymentMethod.CREDIT_CARD:
    case PaymentMethod.MOBILE_MONEY:
      return "102";
    case PaymentMethod.IN_KIND:
      return "101";
    default:
      return "101";
  }
}

async function getOpenFiscalYearForDate(tx: Prisma.TransactionClient, date: Date) {
  const fiscalYear = await tx.fiscalYear.findFirst({
    where: {
      isClosed: false,
      startDate: { lte: date },
      endDate: { gte: date },
    },
    orderBy: { startDate: "desc" },
  });

  if (!fiscalYear) {
    throw new AppError("Aucun exercice comptable ouvert pour cette date", 400);
  }

  return fiscalYear;
}

async function getAccountIdByNumber(tx: Prisma.TransactionClient, accountNumber: string): Promise<string> {
  const account = await tx.account.findFirst({
    where: { accountNumber, isActive: true },
    select: { id: true },
  });

  if (!account) {
    throw new AppError(`Compte comptable introuvable: ${accountNumber}`, 500);
  }

  return account.id;
}

async function createAutoJournalEntry(
  tx: Prisma.TransactionClient,
  params: {
    date: Date;
    journalType: "PURCHASE" | "SALES" | "CASH";
    description: string;
    sourceType: SourceType;
    sourceId: string;
    debitAccountNumber: string;
    creditAccountNumber: string;
    amount: Prisma.Decimal;
    pieceNumber?: string;
  },
): Promise<void> {
  if (params.amount.lte(0)) return;

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
            credit: new Prisma.Decimal(0),
            description: params.description,
          },
          {
            accountId: creditAccountId,
            debit: new Prisma.Decimal(0),
            credit: params.amount,
            description: params.description,
          },
        ],
      },
    },
  });
}

function assertPositiveInt(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new AppError(`${field} doit etre un entier positif`, 400);
  }

  return value;
}

function normalizeEnumToken(value: string): string {
  return value.trim().toUpperCase().replace(/[\s-]+/g, "_");
}

function parsePaymentMethod(value: unknown): PaymentMethod | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const token = normalizeEnumToken(String(value));
  const mapped: Record<string, PaymentMethod> = {
    CASH: PaymentMethod.CASH,
    ESPECE: PaymentMethod.CASH,
    CHECK: PaymentMethod.CHECK,
    CHEQUE: PaymentMethod.CHECK,
    BANK_TRANSFER: PaymentMethod.BANK_TRANSFER,
    VIREMENT: PaymentMethod.BANK_TRANSFER,
    CREDIT_CARD: PaymentMethod.CREDIT_CARD,
    CARTE: PaymentMethod.CREDIT_CARD,
    MOBILE_MONEY: PaymentMethod.MOBILE_MONEY,
    IN_KIND: PaymentMethod.IN_KIND,
    NATURE: PaymentMethod.IN_KIND,
  };

  const parsed = mapped[token];
  if (!parsed) throw new AppError("paymentMethod invalide", 400);
  return parsed;
}

function parsePaymentStatus(value: unknown): PaymentStatus | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const token = normalizeEnumToken(String(value));
  const mapped: Record<string, PaymentStatus> = {
    PENDING: PaymentStatus.PENDING,
    EN_ATTENTE: PaymentStatus.PENDING,
    PAID: PaymentStatus.PAID,
    PAYE: PaymentStatus.PAID,
    PARTIALLY_PAID: PaymentStatus.PARTIALLY_PAID,
    PARTIELLEMENT_PAYE: PaymentStatus.PARTIALLY_PAID,
    CANCELLED: PaymentStatus.CANCELLED,
    ANNULE: PaymentStatus.CANCELLED,
    REFUNDED: PaymentStatus.REFUNDED,
    REMBOURSE: PaymentStatus.REFUNDED,
  };

  const parsed = mapped[token];
  if (!parsed) throw new AppError("paymentStatus invalide", 400);
  return parsed;
}

function parseDonationKind(value: unknown): DonationKind | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const token = normalizeEnumToken(String(value));
  const mapped: Record<string, DonationKind> = {
    FINANCIAL: DonationKind.FINANCIAL,
    FINANCIER: DonationKind.FINANCIAL,
    MATERIAL: DonationKind.MATERIAL,
    MATERIEL: DonationKind.MATERIAL,
  };

  const parsed = mapped[token];
  if (!parsed) throw new AppError("donationKind invalide", 400);
  return parsed;
}

function parseDonationDirection(value: unknown): DonationDirection | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const token = normalizeEnumToken(String(value));
  const mapped: Record<string, DonationDirection> = {
    IN: DonationDirection.IN,
    ENTREE: DonationDirection.IN,
    ENTRANT: DonationDirection.IN,
    OUT: DonationDirection.OUT,
    SORTIE: DonationDirection.OUT,
    SORTANT: DonationDirection.OUT,
  };

  const parsed = mapped[token];
  if (!parsed) throw new AppError("direction invalide", 400);
  return parsed;
}

function parseDonorType(value: unknown): DonorType | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const token = normalizeEnumToken(String(value));
  const mapped: Record<string, DonorType> = {
    INDIVIDUAL: DonorType.INDIVIDUAL,
    PHYSIQUE: DonorType.INDIVIDUAL,
    CORPORATE: DonorType.CORPORATE,
    MORAL: DonorType.CORPORATE,
    ASSOCIATION: DonorType.ASSOCIATION,
    CHURCH: DonorType.CHURCH,
    EGLISE: DonorType.CHURCH,
  };

  const parsed = mapped[token];
  if (!parsed) throw new AppError("donorType invalide", 400);
  return parsed;
}

function parseDate(value: unknown, field: string): Date | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) throw new AppError(`${field} invalide`, 400);
  return date;
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
      quantity?: number;
      unitPrice?: number;
      paymentMethod?: PaymentMethod;
      paymentStatus?: PaymentStatus;
      supplierId?: string;
      invoiceNumber?: string;
      notes?: string;
      reference?: string;
    };

    const quantity = assertPositiveInt(body.quantity, "quantity");
    const unitPrice = body.unitPrice;
    if (typeof unitPrice !== "number" || unitPrice <= 0) throw new AppError("unitPrice doit etre positif", 400);
    const paymentMethod = parsePaymentMethod(body.paymentMethod) ?? PaymentMethod.CASH;
    const paymentStatus = parsePaymentStatus(body.paymentStatus) ?? PaymentStatus.PAID;

    const result = await prisma.$transaction(async (tx) => {
      const totalAmount = new Prisma.Decimal(unitPrice).mul(quantity);
      const unitPriceDecimal = new Prisma.Decimal(unitPrice);

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

      if (paymentStatus !== PaymentStatus.CANCELLED && paymentStatus !== PaymentStatus.REFUNDED) {
        await createAutoJournalEntry(tx, {
          date: purchase.purchaseDate,
          journalType: "PURCHASE",
          description: `Achat ${purchase.invoiceNumber ?? purchase.id}`,
          sourceType: SourceType.PURCHASE,
          sourceId: purchase.id,
          debitAccountNumber: "601",
          creditAccountNumber: paymentStatus === PaymentStatus.PENDING ? "201" : resolvePaymentMethodAccountNumber(paymentMethod),
          amount: totalAmount,
          pieceNumber: purchase.invoiceNumber ?? undefined,
        });
      }

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
    const paymentMethod = parsePaymentMethod(body.paymentMethod) ?? PaymentMethod.CASH;
    const paymentStatus = parsePaymentStatus(body.paymentStatus) ?? PaymentStatus.PAID;

    const result = await prisma.$transaction(async (tx) => {
      const material = await tx.material.findFirst({ where: { id: materialId, deletedAt: null } });
      if (!material) throw new AppError("Materiel introuvable", 404);
      if (material.currentStock < quantity) throw new AppError("Stock insuffisant pour la vente", 400);

      const totalAmount = new Prisma.Decimal(unitPrice).mul(quantity);
      const unitPriceDecimal = new Prisma.Decimal(unitPrice);

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

      if (paymentStatus !== PaymentStatus.CANCELLED && paymentStatus !== PaymentStatus.REFUNDED) {
        await createAutoJournalEntry(tx, {
          date: sale.saleDate,
          journalType: "SALES",
          description: `Vente ${sale.invoiceNumber ?? sale.id}`,
          sourceType: SourceType.SALE,
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

transactionsRoutes.put(
  "/loan/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body as {
      personId?: string;
      expectedReturnAt?: string;
      notes?: string;
    };

    const expectedReturnAt = parseDate(body.expectedReturnAt, "expectedReturnAt");

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.loan.findUnique({ where: { id } });
      if (!existing) throw new AppError("Emprunt introuvable", 404);

      if (body.personId) {
        const person = await tx.person.findFirst({ where: { id: body.personId, deletedAt: null } });
        if (!person) throw new AppError("Personne introuvable", 404);
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
  }),
);

transactionsRoutes.delete(
  "/loan/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);

    await prisma.$transaction(async (tx) => {
      const loan = await tx.loan.findUnique({ where: { id }, include: { items: true } });
      if (!loan) throw new AppError("Emprunt introuvable", 404);

      const shouldRestoreStock = loan.status === LoanStatus.ACTIVE || loan.status === LoanStatus.OVERDUE;
      if (shouldRestoreStock) {
        for (const item of loan.items) {
          await tx.material.update({ where: { id: item.materialId }, data: { currentStock: { increment: item.quantity } } });
        }
      }

      await tx.stockMovement.deleteMany({
        where: {
          sourceId: id,
          sourceType: { in: [SourceType.LOAN, SourceType.RETURN] },
        },
      });

      await tx.loan.delete({ where: { id } });
    });

    res.status(204).send();
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
      donorType?: string;
      donationKind?: DonationKind;
      direction?: DonationDirection;
      amount?: number;
      paymentMethod?: PaymentMethod;
      description?: string;
      institution?: string;
      items?: Array<{ materialId?: string; quantity?: number }>;
    };

    if (!body.donationKind) throw new AppError("donationKind obligatoire", 400);
    const donationKind = parseDonationKind(body.donationKind);
    if (!donationKind) throw new AppError("donationKind obligatoire", 400);
    const direction = parseDonationDirection(body.direction) ?? DonationDirection.IN;
    const paymentMethod = parsePaymentMethod(body.paymentMethod);

    const result = await prisma.$transaction(async (tx) => {
      if (body.donorId) {
        const donor = await tx.person.findFirst({ where: { id: body.donorId, deletedAt: null } });
        if (!donor) throw new AppError("Donateur introuvable", 404);
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
          amount: typeof body.amount === "number" ? new Prisma.Decimal(body.amount) : null,
          paymentMethod,
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

        if (direction === DonationDirection.IN) {
          const donationAmount = new Prisma.Decimal(body.amount);
          const methodForAccounting = paymentMethod ?? PaymentMethod.CASH;

          await createAutoJournalEntry(tx, {
            date: donation.donationDate,
            journalType: "CASH",
            description: `Don financier ${donation.id}`,
            sourceType: SourceType.DONATION_FINANCIAL,
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
  }),
);

transactionsRoutes.put(
  "/donation/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body as {
      donorId?: string;
      donorName?: string;
      donorType?: string;
      paymentMethod?: string;
      donationDate?: string;
      description?: string;
      institution?: string;
      amount?: number;
    };

    const donationDate = parseDate(body.donationDate, "donationDate");

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.donation.findUnique({ where: { id } });
      if (!existing) throw new AppError("Don introuvable", 404);

      if (body.donorId) {
        const donor = await tx.person.findFirst({ where: { id: body.donorId, deletedAt: null } });
        if (!donor) throw new AppError("Donateur introuvable", 404);
      }

      if (existing.donationKind === DonationKind.FINANCIAL && body.amount !== undefined) {
        if (typeof body.amount !== "number" || body.amount <= 0) {
          throw new AppError("amount doit etre positif pour un don financier", 400);
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
          amount:
            body.amount === undefined
              ? undefined
              : typeof body.amount === "number"
                ? new Prisma.Decimal(body.amount)
                : null,
        },
        include: { items: true },
      });
    });

    res.status(200).json(result);
  }),
);

transactionsRoutes.delete(
  "/donation/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);

    await prisma.$transaction(async (tx) => {
      const donation = await tx.donation.findUnique({ where: { id }, include: { items: true } });
      if (!donation) throw new AppError("Don introuvable", 404);

      if (donation.donationKind === DonationKind.MATERIAL) {
        for (const item of donation.items) {
          const material = await tx.material.findFirst({ where: { id: item.materialId, deletedAt: null } });
          if (!material) throw new AppError("Materiel introuvable", 404);

          if (donation.direction === DonationDirection.IN) {
            if (material.currentStock < item.quantity) {
              throw new AppError(`Suppression impossible: stock insuffisant pour ${material.name}`, 400);
            }
            await tx.material.update({ where: { id: item.materialId }, data: { currentStock: { decrement: item.quantity } } });
          } else {
            await tx.material.update({ where: { id: item.materialId }, data: { currentStock: { increment: item.quantity } } });
          }
        }
      }

      await tx.stockMovement.deleteMany({
        where: {
          sourceId: id,
          sourceType: { in: [SourceType.DONATION_FINANCIAL, SourceType.DONATION_MATERIAL] },
        },
      });

      await tx.donation.delete({ where: { id } });
    });

    res.status(204).send();
  }),
);

transactionsRoutes.put(
  "/purchase/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body as {
      supplierId?: string;
      paymentMethod?: string;
      paymentStatus?: string;
      invoiceNumber?: string;
      notes?: string;
      purchaseDate?: string;
      unitPrice?: number;
      montant?: number;
    };

    const purchaseDate = parseDate(body.purchaseDate, "purchaseDate");
    const unitPrice = typeof body.unitPrice === "number" ? body.unitPrice : typeof body.montant === "number" ? body.montant : undefined;
    if (unitPrice !== undefined && unitPrice <= 0) throw new AppError("unitPrice doit etre positif", 400);

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.purchase.findUnique({ where: { id }, include: { items: true } });
      if (!existing) throw new AppError("Achat introuvable", 404);

      if (body.supplierId) {
        const supplier = await tx.person.findFirst({ where: { id: body.supplierId, deletedAt: null } });
        if (!supplier) throw new AppError("Fournisseur introuvable", 404);
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
        const unitPriceDecimal = new Prisma.Decimal(unitPrice);
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
  }),
);

transactionsRoutes.delete(
  "/purchase/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);

    await prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.findUnique({ where: { id }, include: { items: true } });
      if (!purchase) throw new AppError("Achat introuvable", 404);

      await tx.stockMovement.deleteMany({ where: { sourceType: SourceType.PURCHASE, sourceId: id } });
      await tx.purchase.delete({ where: { id } });
    });

    res.status(204).send();
  }),
);

transactionsRoutes.put(
  "/sale/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body as {
      personId?: string;
      paymentMethod?: string;
      paymentStatus?: string;
      invoiceNumber?: string;
      notes?: string;
      saleDate?: string;
      unitPrice?: number;
      montant?: number;
    };

    const saleDate = parseDate(body.saleDate, "saleDate");
    const unitPrice = typeof body.unitPrice === "number" ? body.unitPrice : typeof body.montant === "number" ? body.montant : undefined;
    if (unitPrice !== undefined && unitPrice <= 0) throw new AppError("unitPrice doit etre positif", 400);

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.sale.findUnique({ where: { id }, include: { items: true } });
      if (!existing) throw new AppError("Vente introuvable", 404);

      if (body.personId) {
        const person = await tx.person.findFirst({ where: { id: body.personId, deletedAt: null } });
        if (!person) throw new AppError("Acheteur introuvable", 404);
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
        const unitPriceDecimal = new Prisma.Decimal(unitPrice);
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
  }),
);

transactionsRoutes.delete(
  "/sale/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);

    await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.findUnique({ where: { id }, include: { items: true } });
      if (!sale) throw new AppError("Vente introuvable", 404);

      for (const item of sale.items) {
        await tx.material.update({ where: { id: item.materialId }, data: { currentStock: { increment: item.quantity } } });
      }

      await tx.stockMovement.deleteMany({ where: { sourceType: SourceType.SALE, sourceId: id } });
      await tx.sale.delete({ where: { id } });
    });

    res.status(204).send();
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