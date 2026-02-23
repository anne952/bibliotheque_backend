import { prisma } from "../../config/prisma";
import { AppError } from "../../common/http";

export class ReportsService {
  private static resolveDashboardRange(from?: string, to?: string) {
    const toDate = to ? new Date(to) : new Date();
    if (Number.isNaN(toDate.getTime())) {
      throw new AppError("Paramètre 'to' invalide", 400);
    }

    const fromDate = from ? new Date(from) : new Date(toDate);
    if (Number.isNaN(fromDate.getTime())) {
      throw new AppError("Paramètre 'from' invalide", 400);
    }

    if (!from) {
      fromDate.setDate(fromDate.getDate() - 29);
    }

    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);

    if (fromDate > toDate) {
      throw new AppError("La période est invalide: from doit être <= to", 400);
    }

    return { fromDate, toDate };
  }

  static async getDashboardOverview(options?: {
    from?: string;
    to?: string;
    fiscalYearId?: string;
  }) {
    const { fromDate, toDate } = this.resolveDashboardRange(
      options?.from,
      options?.to,
    );

    const [
      salesCount,
      purchasesCount,
      donationsCount,
      loansCount,
      returnsCount,
      salesSum,
      purchasesSum,
      donationFinancialInSum,
      materials,
      totalPersons,
      donorsCount,
      suppliersCount,
      buyersCount,
      borrowersCount,
      validatedEntriesCount,
      unvalidatedEntriesCount,
      mostBorrowedRaw,
      donorFinancialRaw,
    ] = await Promise.all([
      prisma.sale.count({
        where: {
          saleDate: { gte: fromDate, lte: toDate },
        },
      }),
      prisma.purchase.count({
        where: {
          purchaseDate: { gte: fromDate, lte: toDate },
        },
      }),
      prisma.donation.count({
        where: {
          donationDate: { gte: fromDate, lte: toDate },
        },
      }),
      prisma.loan.count({
        where: {
          borrowedAt: { gte: fromDate, lte: toDate },
        },
      }),
      prisma.loan.count({
        where: {
          returnedAt: { gte: fromDate, lte: toDate },
        },
      }),
      prisma.saleItem.aggregate({
        where: {
          sale: {
            saleDate: { gte: fromDate, lte: toDate },
          },
        },
        _sum: { totalAmount: true },
      }),
      prisma.purchaseItem.aggregate({
        where: {
          purchase: {
            purchaseDate: { gte: fromDate, lte: toDate },
          },
        },
        _sum: { totalAmount: true },
      }),
      prisma.donation.aggregate({
        where: {
          donationKind: "FINANCIAL",
          direction: "IN",
          donationDate: { gte: fromDate, lte: toDate },
        },
        _sum: { amount: true },
      }),
      prisma.material.findMany({
        where: { deletedAt: null },
        select: { id: true, currentStock: true, minStockAlert: true },
      }),
      prisma.person.count({ where: { deletedAt: null } }),
      prisma.person.count({ where: { deletedAt: null, isDonor: true } }),
      prisma.person.count({ where: { deletedAt: null, isSupplier: true } }),
      prisma.person.count({ where: { deletedAt: null, isBuyer: true } }),
      prisma.person.count({ where: { deletedAt: null, isBorrower: true } }),
      prisma.journalEntry.count({
        where: {
          ...(options?.fiscalYearId ? { fiscalYearId: options.fiscalYearId } : {}),
          isValidated: true,
          date: { gte: fromDate, lte: toDate },
        },
      }),
      prisma.journalEntry.count({
        where: {
          ...(options?.fiscalYearId ? { fiscalYearId: options.fiscalYearId } : {}),
          isValidated: false,
          date: { gte: fromDate, lte: toDate },
        },
      }),
      prisma.loanItem.groupBy({
        by: ["materialId"],
        _sum: { quantity: true },
        _count: { _all: true },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
      }),
      prisma.donation.groupBy({
        by: ["donorId"],
        where: {
          donorId: { not: null },
          donationKind: "FINANCIAL",
          direction: "IN",
          donationDate: { gte: fromDate, lte: toDate },
        },
        _sum: { amount: true },
        _count: { _all: true },
        orderBy: {
          _sum: {
            amount: "desc",
          },
        },
        take: 5,
      }),
    ]);

    const totalStock = materials.reduce((sum, material) => sum + material.currentStock, 0);
    const outOfStockCount = materials.filter((m) => m.currentStock === 0).length;
    const lowStockCount = materials.filter(
      (m) => m.currentStock > 0 && m.currentStock <= m.minStockAlert,
    ).length;

    const borrowedMaterialIds = mostBorrowedRaw.map((entry) => entry.materialId);
    const borrowedMaterials = borrowedMaterialIds.length
      ? await prisma.material.findMany({
          where: { id: { in: borrowedMaterialIds } },
          select: { id: true, name: true, type: true },
        })
      : [];
    const borrowedMaterialById = new Map(
      borrowedMaterials.map((material) => [material.id, material]),
    );

    const donorIds = donorFinancialRaw
      .map((entry) => entry.donorId)
      .filter((id): id is string => Boolean(id));
    const donors = donorIds.length
      ? await prisma.person.findMany({
          where: { id: { in: donorIds } },
          select: { id: true, firstName: true, lastName: true },
        })
      : [];
    const donorById = new Map(donors.map((donor) => [donor.id, donor]));

    return {
      range: {
        from: fromDate,
        to: toDate,
      },
      kpis: {
        transactions: {
          salesCount,
          purchasesCount,
          donationsCount,
          loansCount,
          returnsCount,
        },
        amounts: {
          salesRevenue: salesSum._sum.totalAmount?.toNumber() ?? 0,
          purchasesCost: purchasesSum._sum.totalAmount?.toNumber() ?? 0,
          financialDonationsIn: donationFinancialInSum._sum.amount?.toNumber() ?? 0,
        },
        inventory: {
          materialsTotal: materials.length,
          totalStock,
          lowStockCount,
          outOfStockCount,
        },
        persons: {
          total: totalPersons,
          donors: donorsCount,
          suppliers: suppliersCount,
          buyers: buyersCount,
          borrowers: borrowersCount,
        },
        accounting: {
          validatedEntries: validatedEntriesCount,
          unvalidatedEntries: unvalidatedEntriesCount,
        },
      },
      top: {
        mostBorrowed: mostBorrowedRaw.map((entry) => {
          const material = borrowedMaterialById.get(entry.materialId);
          return {
            materialId: entry.materialId,
            name: material?.name ?? "Inconnu",
            type: material?.type ?? null,
            borrowEvents: entry._count._all,
            quantityBorrowed: entry._sum.quantity ?? 0,
          };
        }),
        donorsFinancial: donorFinancialRaw.map((entry) => {
          const donor = donorById.get(entry.donorId ?? "");
          return {
            donorId: entry.donorId,
            fullName: donor
              ? `${donor.firstName} ${donor.lastName}`
              : "Donateur inconnu",
            donationCount: entry._count._all,
            totalAmount: entry._sum.amount?.toNumber() ?? 0,
          };
        }),
      },
    };
  }

  static async getDashboardActivity(limit: number = 20) {
    const safeLimit = Number.isInteger(limit) ? Math.min(Math.max(limit, 1), 100) : 20;

    const [sales, purchases, donations, loans] = await Promise.all([
      prisma.sale.findMany({
        take: safeLimit,
        orderBy: { saleDate: "desc" },
        select: {
          id: true,
          saleDate: true,
          paymentMethod: true,
          paymentStatus: true,
          person: { select: { firstName: true, lastName: true } },
          items: { select: { totalAmount: true } },
        },
      }),
      prisma.purchase.findMany({
        take: safeLimit,
        orderBy: { purchaseDate: "desc" },
        select: {
          id: true,
          purchaseDate: true,
          paymentMethod: true,
          paymentStatus: true,
          supplier: { select: { firstName: true, lastName: true } },
          items: { select: { totalAmount: true } },
        },
      }),
      prisma.donation.findMany({
        take: safeLimit,
        orderBy: { donationDate: "desc" },
        select: {
          id: true,
          donationDate: true,
          donationKind: true,
          direction: true,
          amount: true,
          donorName: true,
          donor: { select: { firstName: true, lastName: true } },
        },
      }),
      prisma.loan.findMany({
        take: safeLimit,
        orderBy: { borrowedAt: "desc" },
        select: {
          id: true,
          borrowedAt: true,
          expectedReturnAt: true,
          returnedAt: true,
          status: true,
          person: { select: { firstName: true, lastName: true } },
          items: { select: { quantity: true } },
        },
      }),
    ]);

    const events = [
      ...sales.map((sale) => ({
        id: sale.id,
        type: "SALE",
        date: sale.saleDate,
        amount: sale.items.reduce((sum, item) => sum + item.totalAmount.toNumber(), 0),
        paymentMethod: sale.paymentMethod,
        paymentStatus: sale.paymentStatus,
        actor: sale.person ? `${sale.person.firstName} ${sale.person.lastName}` : null,
      })),
      ...purchases.map((purchase) => ({
        id: purchase.id,
        type: "PURCHASE",
        date: purchase.purchaseDate,
        amount: purchase.items.reduce((sum, item) => sum + item.totalAmount.toNumber(), 0),
        paymentMethod: purchase.paymentMethod,
        paymentStatus: purchase.paymentStatus,
        actor: purchase.supplier
          ? `${purchase.supplier.firstName} ${purchase.supplier.lastName}`
          : null,
      })),
      ...donations.map((donation) => ({
        id: donation.id,
        type: "DONATION",
        date: donation.donationDate,
        amount: donation.amount?.toNumber() ?? null,
        donationKind: donation.donationKind,
        direction: donation.direction,
        actor:
          donation.donorName ??
          (donation.donor ? `${donation.donor.firstName} ${donation.donor.lastName}` : null),
      })),
      ...loans.map((loan) => ({
        id: loan.id,
        type: "LOAN",
        date: loan.borrowedAt,
        quantity: loan.items.reduce((sum, item) => sum + item.quantity, 0),
        status: loan.status,
        expectedReturnAt: loan.expectedReturnAt,
        returnedAt: loan.returnedAt,
        actor: `${loan.person.firstName} ${loan.person.lastName}`,
      })),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, safeLimit);

    return {
      limit: safeLimit,
      count: events.length,
      events,
    };
  }

  static async getDashboardStockAlerts(limit: number = 10) {
    const safeLimit = Number.isInteger(limit) ? Math.min(Math.max(limit, 1), 100) : 10;

    const materials = await prisma.material.findMany({
      where: { deletedAt: null },
      orderBy: { currentStock: "asc" },
      select: {
        id: true,
        name: true,
        type: true,
        currentStock: true,
        minStockAlert: true,
      },
    });

    const alerts = materials
      .filter((material) => material.currentStock <= material.minStockAlert)
      .slice(0, safeLimit)
      .map((material) => ({
        ...material,
        severity: material.currentStock === 0 ? "OUT" : "LOW",
      }));

    return {
      limit: safeLimit,
      count: alerts.length,
      alerts,
    };
  }

  /**
   * Get daily report (transactions for a specific date)
   */
  static async getDailyReport(date?: string) {
    const reportDate = date ? new Date(date) : new Date();
    
    // Reset time to 00:00:00
    reportDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(reportDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Get all transactions for the day
    const [sales, purchases, donations, loans, returns] = await Promise.all([
      prisma.sale.findMany({
        where: {
          saleDate: {
            gte: reportDate,
            lt: nextDay,
          },
        },
        include: {
          items: {
            include: { material: true },
          },
          person: true,
        },
      }),
      prisma.purchase.findMany({
        where: {
          purchaseDate: {
            gte: reportDate,
            lt: nextDay,
          },
        },
        include: {
          items: true,
          supplier: true,
        },
      }),
      prisma.donation.findMany({
        where: {
          donationDate: {
            gte: reportDate,
            lt: nextDay,
          },
        },
        include: {
          items: {
            include: { material: true },
          },
          donor: true,
        },
      }),
      prisma.loan.findMany({
        where: {
          borrowedAt: {
            gte: reportDate,
            lt: nextDay,
          },
        },
        include: {
          items: {
            include: { material: true },
          },
          person: true,
        },
      }),
      prisma.loan.findMany({
        where: {
          returnedAt: {
            gte: reportDate,
            lt: nextDay,
          },
        },
        include: {
          items: {
            include: { material: true },
          },
          person: true,
        },
      }),
    ]);

    return {
      date: reportDate,
      sales: sales.length,
      purchases: purchases.length,
      donations: donations.length,
      loans: loans.length,
      returns: returns.length,
      details: {
        sales,
        purchases,
        donations,
        loans,
        returns,
      },
    };
  }

  /**
   * Get donors report with total donations
   */
  static async getDonorsReport() {
    const donors = await prisma.person.findMany({
      where: {
        isDonor: true,
        deletedAt: null,
      },
    });

    const donorStats = await Promise.all(
      donors.map(async (donor) => {
        const donations = await prisma.donation.findMany({
          where: { donorId: donor.id },
          include: { items: true },
        });

        const totalFinancial = donations
          .filter((d) => d.donationKind === "FINANCIAL")
          .reduce((sum, d) => sum + (d.amount?.toNumber() ?? 0), 0);

        const totalMaterial = donations
          .filter((d) => d.donationKind === "MATERIAL")
          .reduce((sum, d) => sum + (d.items?.length ?? 0), 0);

        return {
          donor: {
            id: donor.id,
            firstName: donor.firstName,
            lastName: donor.lastName,
            email: donor.email,
            phone: donor.phone,
          },
          totalDonations: donations.length,
          totalFinancial,
          totalMaterial,
          lastDonation: donations.length > 0 ? donations[donations.length - 1].donationDate : null,
        };
      }),
    );

    return donorStats.sort((a, b) => b.totalDonations - a.totalDonations);
  }

  /**
   * Get most borrowed materials report
   */
  static async getMostBorrowedReport(limit: number = 10) {
    const materials = await prisma.material.findMany({
      where: { deletedAt: null },
      include: {
        loanItems: {
          include: {
            loan: true,
          },
        },
      },
    });

    const stats = materials
      .map((material) => ({
        material: {
          id: material.id,
          name: material.name,
          type: material.type,
          reference: material.reference,
          currentStock: material.currentStock,
        },
        totalBorrowed: material.loanItems.length,
        activeBorrows: material.loanItems.filter(
          (li) => li.loan.status === "ACTIVE" || li.loan.status === "OVERDUE",
        ).length,
        totalQuantityBorrowed: material.loanItems.reduce(
          (sum, li) => sum + li.quantity,
          0,
        ),
      }))
      .filter((s) => s.totalBorrowed > 0)
      .sort((a, b) => b.totalBorrowed - a.totalBorrowed)
      .slice(0, limit);

    return stats;
  }

  /**
   * Get inventory report
   */
  static async getInventoryReport() {
    const materials = await prisma.material.findMany({
      where: { deletedAt: null },
      include: {
        stockMovements: true,
      },
      orderBy: { currentStock: "asc" },
    });

    const summary = {
      totalItems: materials.length,
      totalStock: 0,
      lowStockCount: 0,
      outOfStock: 0,
      byType: {} as Record<string, { count: number; stock: number }>,
    };

    const items = materials.map((material) => {
      const isLowStock = material.currentStock <= material.minStockAlert;
      const isOutOfStock = material.currentStock === 0;

      summary.totalStock += material.currentStock;
      if (isLowStock && !isOutOfStock) summary.lowStockCount++;
      if (isOutOfStock) summary.outOfStock++;

      // Count by type
      if (!summary.byType[material.type]) {
        summary.byType[material.type] = { count: 0, stock: 0 };
      }
      summary.byType[material.type].count++;
      summary.byType[material.type].stock += material.currentStock;

      return {
        id: material.id,
        name: material.name,
        type: material.type,
        reference: material.reference,
        currentStock: material.currentStock,
        minStockAlert: material.minStockAlert,
        unitPrice: material.unitPrice?.toNumber(),
        valuation: material.unitPrice
          ? material.unitPrice.toNumber() * material.currentStock
          : null,
        isLowStock,
        isOutOfStock,
      };
    });

    return {
      summary,
      items,
    };
  }
}
