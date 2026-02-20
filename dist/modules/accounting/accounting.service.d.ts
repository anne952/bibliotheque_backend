import { Prisma } from "@prisma/client";
export interface AccountBalance {
    accountId: string;
    accountNumber: string;
    accountName: string;
    debit: number;
    credit: number;
    balance: number;
    isAnalytic: boolean;
}
export interface TrialBalance {
    accountNumber: string;
    accountName: string;
    totalDebit: number;
    totalCredit: number;
}
export declare class AccountingService {
    /**
     * Get trial balance (balance de vérification)
     */
    static getTrialBalance(fiscalYearId: string): Promise<TrialBalance[]>;
    /**
     * Get account balances
     */
    static getAccountBalances(fiscalYearId: string): Promise<AccountBalance[]>;
    /**
     * Get balance sheet (bilan)
     * Assets = Balance Sheet debit > 0
     * Liabilities = Balance Sheet credit > 0
     * Equity = Balance Sheet equity accounts
     */
    static getBalanceSheet(fiscalYearId: string): Promise<{
        assets: AccountBalance[];
        liabilities: AccountBalance[];
        equity: AccountBalance[];
        totals: {
            assets: number;
            liabilities: number;
            equity: number;
        };
    }>;
    /**
     * Get income statement (compte de résultat)
     * Revenues = Account class 7
     * Expenses = Account class 6
     */
    static getIncomeStatement(fiscalYearId: string): Promise<{
        revenues: AccountBalance[];
        expenses: AccountBalance[];
        totals: {
            revenues: number;
            expenses: number;
            netIncome: number;
        };
    }>;
    /**
     * Get general ledger for an account
     */
    static getGeneralLedger(accountId: string, fiscalYearId?: string): Promise<{
        account: {
            id: string;
            number: string;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
        };
        entries: {
            date: Date;
            description: string;
            debit: number;
            credit: number;
            balance: number;
        }[];
    }>;
    /**
     * Get cash journal entries
     */
    static getCashJournal(fiscalYearId?: string): Promise<({
        lines: ({
            account: {
                name: string;
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                type: import(".prisma/client").$Enums.AccountType;
                accountNumber: string;
                accountClass: number;
                isAnalytic: boolean;
                parentId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            description: string | null;
            entryId: string;
            accountId: string;
            debit: Prisma.Decimal;
            credit: Prisma.Decimal;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        entryNumber: string;
        fiscalYearId: string;
        date: Date;
        journalType: import(".prisma/client").$Enums.JournalType;
        pieceNumber: string | null;
        description: string;
        sourceType: import(".prisma/client").$Enums.SourceType | null;
        sourceId: string | null;
        isValidated: boolean;
        validatedAt: Date | null;
        validatedById: string | null;
    })[]>;
    /**
     * Calculate account from previous period (for N-1 comparison)
     */
    static getPreviousPeriodBalance(accountId: string, beforeFiscalYearId: string): Promise<number>;
}
//# sourceMappingURL=accounting.service.d.ts.map