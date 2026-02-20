"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountInitService = exports.CalculationService = exports.ValidationService = void 0;
const prisma_1 = require("../../config/prisma");
const http_1 = require("../../common/http");
/**
 * Business validation service
 */
class ValidationService {
    /**
     * Validate that a loan respects the business rule: max 3 books
     */
    static validateLoanItemCount(itemCount) {
        if (itemCount > 3) {
            throw new http_1.AppError("Un emprunt ne peut pas contenir plus de 3 livres", 400);
        }
    }
    /**
     * Validate that an account has sufficient stock
     */
    static validateSufficientStock(currentStock, quantityNeeded) {
        if (currentStock < quantityNeeded) {
            throw new http_1.AppError("Stock insuffisant pour cette opération", 400);
        }
    }
    /**
     * Validate that a fiscal year is not closed
     */
    static async validateFiscalYearNotClosed(fiscalYearId) {
        const fy = await prisma_1.prisma.fiscalYear.findUnique({
            where: { id: fiscalYearId },
        });
        if (!fy) {
            throw new http_1.AppError("Exercice comptable non trouvé", 404);
        }
        if (fy.isClosed) {
            throw new http_1.AppError("Impossible: exercice comptable fermé", 400);
        }
    }
    /**
     * Validate user role
     */
    static validateUserRole(userRole, requiredRoles) {
        if (!requiredRoles.includes(userRole)) {
            throw new http_1.AppError("Permission insuffisante", 403);
        }
    }
}
exports.ValidationService = ValidationService;
/**
 * Business calculation service
 */
class CalculationService {
    /**
     * Calculate inventory valuation (stock * unit price)
     */
    static calculateInventoryValuation(quantity, unitPrice) {
        if (unitPrice === null)
            return null;
        return quantity * unitPrice;
    }
    /**
     * Calculate interest on overdue loans (if applicable)
     * For now, returns 0 (can be extended with business logic)
     */
    static calculateLateFeesForLoan(daysOverdue) {
        // Placeholder: no fees for now
        // Can be extended with business rule like: 0.5% per day
        return 0;
    }
    /**
     * Calculate total debit/credit for a set of lines
     */
    static calculateLinesTotals(lines) {
        let totalDebit = 0;
        let totalCredit = 0;
        for (const line of lines) {
            if (line.debit)
                totalDebit += line.debit;
            if (line.credit)
                totalCredit += line.credit;
        }
        return { totalDebit, totalCredit };
    }
}
exports.CalculationService = CalculationService;
/**
 * Account initialization service
 * Use this to set up default chart of accounts
 */
class AccountInitService {
    /**
     * Create default chart of accounts
     */
    static async createDefaultAccounts() {
        // Check if accounts already exist
        const existingCount = await prisma_1.prisma.account.count();
        if (existingCount > 0) {
            console.log("Chart of accounts already exists");
            return;
        }
        // Define chart of accounts structure
        const accounts = [
            // Assets (1xx)
            { number: "101", name: "Caisse", type: "ASSET", class: 1 },
            { number: "102", name: "Banque", type: "ASSET", class: 1 },
            { number: "103", name: "Stock de livres", type: "ASSET", class: 1 },
            { number: "104", name: "Mobilier", type: "ASSET", class: 1 },
            // Liabilities (2xx)
            { number: "201", name: "Fournisseurs", type: "LIABILITY", class: 2 },
            { number: "202", name: "Dettes fiscales", type: "LIABILITY", class: 2 },
            // Equity (3xx)
            { number: "301", name: "Capital", type: "EQUITY", class: 3 },
            { number: "302", name: "Résultats", type: "EQUITY", class: 3 },
            // Expenses (6xx)
            { number: "601", name: "Achats de livres", type: "EXPENSE", class: 6 },
            { number: "602", name: "Personnel", type: "EXPENSE", class: 6 },
            { number: "603", name: "Loyer", type: "EXPENSE", class: 6 },
            { number: "604", name: "Utilities", type: "EXPENSE", class: 6 },
            // Revenues (7xx)
            { number: "701", name: "Ventes de livres", type: "REVENUE", class: 7 },
            { number: "702", name: "Dons financiers", type: "REVENUE", class: 7 },
            { number: "703", name: "Services", type: "REVENUE", class: 7 },
        ];
        for (const acc of accounts) {
            await prisma_1.prisma.account.create({
                data: {
                    accountNumber: acc.number,
                    name: acc.name,
                    type: acc.type,
                    accountClass: acc.class,
                },
            });
        }
        console.log("Default chart of accounts created");
    }
    /**
     * Create initial fiscal year
     */
    static async createInitialFiscalYear() {
        const existing = await prisma_1.prisma.fiscalYear.findFirst();
        if (existing) {
            console.log("Fiscal year already exists");
            return;
        }
        const now = new Date();
        const startDate = new Date(now.getFullYear(), 0, 1); // Jan 1
        const endDate = new Date(now.getFullYear(), 11, 31); // Dec 31
        await prisma_1.prisma.fiscalYear.create({
            data: {
                name: `FY ${now.getFullYear()}`,
                startDate,
                endDate,
            },
        });
        console.log("Initial fiscal year created");
    }
}
exports.AccountInitService = AccountInitService;
//# sourceMappingURL=business.service.js.map