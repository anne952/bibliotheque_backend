"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const prisma_1 = require("../../config/prisma");
class ReportsService {
    /**
     * Get daily report (transactions for a specific date)
     */
    static async getDailyReport(date) {
        const reportDate = date ? new Date(date) : new Date();
        // Reset time to 00:00:00
        reportDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(reportDate);
        nextDay.setDate(nextDay.getDate() + 1);
        // Get all transactions for the day
        const [sales, purchases, donations, loans, returns] = await Promise.all([
            prisma_1.prisma.sale.findMany({
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
            prisma_1.prisma.purchase.findMany({
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
            prisma_1.prisma.donation.findMany({
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
            prisma_1.prisma.loan.findMany({
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
            prisma_1.prisma.loan.findMany({
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
        const donors = await prisma_1.prisma.person.findMany({
            where: {
                isDonor: true,
                deletedAt: null,
            },
        });
        const donorStats = await Promise.all(donors.map(async (donor) => {
            const donations = await prisma_1.prisma.donation.findMany({
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
        }));
        return donorStats.sort((a, b) => b.totalDonations - a.totalDonations);
    }
    /**
     * Get most borrowed materials report
     */
    static async getMostBorrowedReport(limit = 10) {
        const materials = await prisma_1.prisma.material.findMany({
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
            activeBorrows: material.loanItems.filter((li) => li.loan.status === "ACTIVE" || li.loan.status === "OVERDUE").length,
            totalQuantityBorrowed: material.loanItems.reduce((sum, li) => sum + li.quantity, 0),
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
        const materials = await prisma_1.prisma.material.findMany({
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
            byType: {},
        };
        const items = materials.map((material) => {
            const isLowStock = material.currentStock <= material.minStockAlert;
            const isOutOfStock = material.currentStock === 0;
            summary.totalStock += material.currentStock;
            if (isLowStock && !isOutOfStock)
                summary.lowStockCount++;
            if (isOutOfStock)
                summary.outOfStock++;
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
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map