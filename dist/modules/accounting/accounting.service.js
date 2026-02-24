"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingService = void 0;
const client_1 = require("../../generated/prisma/client");
const prisma_1 = require("../../config/prisma");
const http_1 = require("../../common/http");
class AccountingService {
    /**
     * Get trial balance (balance de vérification)
     */
    static async getTrialBalance(fiscalYearId) {
        // Verify fiscal year exists
        const fy = await prisma_1.prisma.fiscalYear.findUnique({
            where: { id: fiscalYearId },
        });
        if (!fy) {
            throw new http_1.AppError("Exercice comptable non trouvé", 404);
        }
        const entries = await prisma_1.prisma.journalEntry.findMany({
            where: {
                fiscalYearId,
                isValidated: true,
            },
            include: {
                lines: {
                    include: {
                        account: true,
                    },
                },
            },
        });
        const balances = new Map();
        for (const entry of entries) {
            for (const line of entry.lines) {
                const key = line.account.accountNumber;
                const existing = balances.get(key) || {
                    accountNumber: line.account.accountNumber,
                    accountName: line.account.name,
                    totalDebit: 0,
                    totalCredit: 0,
                };
                existing.totalDebit += line.debit.toNumber();
                existing.totalCredit += line.credit.toNumber();
                balances.set(key, existing);
            }
        }
        return Array.from(balances.values()).sort((a, b) => parseInt(a.accountNumber) - parseInt(b.accountNumber));
    }
    /**
     * Get account balances
     */
    static async getAccountBalances(fiscalYearId) {
        const fy = await prisma_1.prisma.fiscalYear.findUnique({
            where: { id: fiscalYearId },
        });
        if (!fy) {
            throw new http_1.AppError("Exercice comptable non trouvé", 404);
        }
        const entries = await prisma_1.prisma.journalEntry.findMany({
            where: {
                fiscalYearId,
                isValidated: true,
            },
            include: {
                lines: {
                    include: {
                        account: true,
                    },
                },
            },
        });
        const balances = new Map();
        for (const entry of entries) {
            for (const line of entry.lines) {
                const key = line.accountId;
                const existing = balances.get(key) || {
                    accountId: line.accountId,
                    accountNumber: line.account.accountNumber,
                    accountName: line.account.name,
                    debit: 0,
                    credit: 0,
                    balance: 0,
                    isAnalytic: line.account.isAnalytic,
                };
                existing.debit += line.debit.toNumber();
                existing.credit += line.credit.toNumber();
                balances.set(key, existing);
            }
        }
        return Array.from(balances.values())
            .map((b) => ({
            ...b,
            balance: b.debit - b.credit,
        }))
            .sort((a, b) => parseInt(a.accountNumber) - parseInt(b.accountNumber));
    }
    /**
     * Get balance sheet (bilan)
     * Assets = Balance Sheet debit > 0
     * Liabilities = Balance Sheet credit > 0
     * Equity = Balance Sheet equity accounts
     */
    static async getBalanceSheet(fiscalYearId) {
        const balances = await this.getAccountBalances(fiscalYearId);
        const assets = balances.filter((b) => parseInt(b.accountNumber) < 200);
        const liabilities = balances.filter((b) => parseInt(b.accountNumber) >= 200 &&
            parseInt(b.accountNumber) < 300);
        const equity = balances.filter((b) => parseInt(b.accountNumber) >= 300 &&
            parseInt(b.accountNumber) < 400);
        const totalAssets = assets.reduce((sum, a) => sum + a.balance, 0);
        const totalLiabilities = liabilities.reduce((sum, l) => sum + l.balance, 0);
        const totalEquity = equity.reduce((sum, e) => sum + e.balance, 0);
        return {
            assets,
            liabilities,
            equity,
            totals: {
                assets: totalAssets,
                liabilities: totalLiabilities,
                equity: totalEquity,
            },
        };
    }
    /**
     * Get income statement (compte de résultat)
     * Revenues = Account class 7
     * Expenses = Account class 6
     */
    static async getIncomeStatement(fiscalYearId) {
        const balances = await this.getAccountBalances(fiscalYearId);
        const revenues = balances.filter((b) => parseInt(b.accountNumber) >= 700);
        const expenses = balances.filter((b) => parseInt(b.accountNumber) >= 600 &&
            parseInt(b.accountNumber) < 700);
        const totalRevenues = revenues.reduce((sum, r) => sum + Math.abs(r.balance), 0);
        const totalExpenses = expenses.reduce((sum, e) => sum + Math.abs(e.balance), 0);
        const netIncome = totalRevenues - totalExpenses;
        return {
            revenues,
            expenses,
            totals: {
                revenues: totalRevenues,
                expenses: totalExpenses,
                netIncome,
            },
        };
    }
    /**
     * Get general ledger for an account
     */
    static async getGeneralLedger(accountId, fiscalYearId) {
        const account = await prisma_1.prisma.account.findUnique({
            where: { id: accountId },
        });
        if (!account) {
            throw new http_1.AppError("Compte non trouvé", 404);
        }
        const lines = await prisma_1.prisma.journalLine.findMany({
            where: {
                accountId,
                entry: fiscalYearId
                    ? {
                        fiscalYearId,
                        isValidated: true,
                    }
                    : {
                        isValidated: true,
                    },
            },
            include: {
                entry: true,
            },
            orderBy: { entry: { date: "asc" } },
        });
        let runningBalance = new client_1.Prisma.Decimal(0);
        const ledgerLines = lines.map((line) => {
            runningBalance = runningBalance
                .add(line.debit)
                .minus(line.credit);
            return {
                date: line.entry.date,
                description: line.entry.description,
                debit: line.debit.toNumber(),
                credit: line.credit.toNumber(),
                balance: runningBalance.toNumber(),
            };
        });
        return {
            account: {
                id: account.id,
                number: account.accountNumber,
                name: account.name,
                type: account.type,
            },
            entries: ledgerLines,
        };
    }
    /**
     * Get cash journal entries
     */
    static async getCashJournal(fiscalYearId) {
        const entries = await prisma_1.prisma.journalEntry.findMany({
            where: {
                journalType: { in: ["CASH", "PURCHASE", "SALES"] },
                isValidated: true,
                ...(fiscalYearId && { fiscalYearId }),
            },
            include: {
                lines: {
                    include: {
                        account: true,
                    },
                },
            },
            orderBy: [{ date: "asc" }, { createdAt: "asc" }],
        });
        return entries;
    }
    /**
     * Calculate account from previous period (for N-1 comparison)
     */
    static async getPreviousPeriodBalance(accountId, beforeFiscalYearId) {
        const lines = await prisma_1.prisma.journalLine.findMany({
            where: {
                accountId,
                entry: {
                    fiscalYearId: beforeFiscalYearId,
                    isValidated: true,
                },
            },
        });
        let balance = 0;
        for (const line of lines) {
            balance += line.debit.toNumber() - line.credit.toNumber();
        }
        return balance;
    }
}
exports.AccountingService = AccountingService;
//# sourceMappingURL=accounting.service.js.map