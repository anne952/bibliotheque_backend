"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountInitService = exports.CalculationService = exports.ValidationService = void 0;
const prisma_1 = require("../../config/prisma");
const http_1 = require("../../common/http");
const client_1 = require("../../generated/prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
    static resolveAccountClass(accountNumber) {
        const firstDigit = accountNumber.trim()[0];
        const parsed = Number(firstDigit);
        return Number.isFinite(parsed) ? parsed : 0;
    }
    static resolveAccountType(accountNumber) {
        // Best-effort mapping from SYSCOHADA class numbers.
        switch (accountNumber.trim()[0]) {
            case "1":
                return client_1.AccountType.EQUITY;
            case "2":
            case "3":
            case "4":
            case "5":
                return client_1.AccountType.ASSET;
            case "6":
                return client_1.AccountType.EXPENSE;
            case "7":
                return client_1.AccountType.REVENUE;
            case "8":
                return client_1.AccountType.CONTINGENT;
            default:
                return client_1.AccountType.ASSET;
        }
    }
    static parseAccountsFromFile() {
        const candidates = [
            path_1.default.resolve(process.cwd(), "prisma/data/nCompte.txt"),
            path_1.default.resolve(process.cwd(), "prisma/data/nCompte"),
            path_1.default.resolve(process.cwd(), "src/generated/prisma/models/nCompte"),
            path_1.default.resolve(__dirname, "../../../prisma/data/nCompte.txt"),
            path_1.default.resolve(__dirname, "../../generated/prisma/models/nCompte"),
        ];
        const accountsFilePath = candidates.find((candidate) => fs_1.default.existsSync(candidate));
        if (!accountsFilePath) {
            console.warn("⚠️  Accounts file not found. Checked:", candidates);
            return [];
        }
        console.log("✅ Loading accounts from:", accountsFilePath);
        const raw = fs_1.default.readFileSync(accountsFilePath, "utf8");
        const lines = raw.split(/\r?\n/);
        const startIndex = lines.findIndex((line) => line.toLowerCase().includes("liste des numero de compte comptable"));
        const accounts = [];
        if (startIndex === -1)
            return accounts;
        for (let i = startIndex + 1; i < lines.length; i += 1) {
            const line = lines[i].trim();
            if (!line)
                continue;
            const cleaned = line.replace(/\*\*/g, "").replace(/\s{2,}/g, " ").trim();
            const candidate = cleaned.replace(/^[-•]\s*/, "");
            let match = candidate.match(/^(\d{2,6})\s*[-–]\s*(.+)$/);
            if (!match) {
                match = candidate.match(/^(\d{2,6})\s+(.+)$/);
            }
            if (!match)
                continue;
            const number = match[1];
            const name = match[2].trim();
            if (!number || !name)
                continue;
            if (name.startsWith("|"))
                continue;
            if (name.includes("FCFA"))
                continue;
            accounts.push({ number, name });
        }
        return accounts;
    }
    /**
     * Create default chart of accounts
     */
    static async createDefaultAccounts() {
        const existingAccounts = await prisma_1.prisma.account.findMany({
            select: { accountNumber: true },
        });
        const existingNumbers = new Set(existingAccounts.map((acc) => acc.accountNumber));
        const baseAccounts = [
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
        const parsedAccounts = this.parseAccountsFromFile();
        console.log(`📋 Parsed ${parsedAccounts.length} accounts from nCompte file`);
        const combined = new Map();
        for (const acc of baseAccounts) {
            combined.set(acc.number, {
                number: acc.number,
                name: acc.name,
                type: acc.type,
                class: acc.class,
            });
        }
        for (const acc of parsedAccounts) {
            if (combined.has(acc.number))
                continue;
            combined.set(acc.number, {
                number: acc.number,
                name: acc.name,
                type: this.resolveAccountType(acc.number),
                class: this.resolveAccountClass(acc.number),
            });
        }
        const toCreate = Array.from(combined.values())
            .filter((acc) => !existingNumbers.has(acc.number))
            .map((acc) => ({
            accountNumber: acc.number,
            name: acc.name,
            type: acc.type,
            accountClass: acc.class,
            isActive: true,
        }));
        if (toCreate.length === 0) {
            console.log("✅ No new accounts to create (all exist)");
            return;
        }
        await prisma_1.prisma.account.createMany({ data: toCreate, skipDuplicates: true });
        console.log(`✅ Added ${toCreate.length} account(s) to database`);
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