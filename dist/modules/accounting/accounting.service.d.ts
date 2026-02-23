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
            type: import("../../generated/prisma/enums").AccountType;
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
                id: string;
                createdAt: Date;
                name: string;
                isActive: boolean;
                updatedAt: Date;
                type: import("../../generated/prisma/enums").AccountType;
                accountNumber: string;
                accountClass: number;
                isAnalytic: boolean;
                parentId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            description: string | null;
            debit: import("@prisma/client-runtime-utils").Decimal;
            credit: import("@prisma/client-runtime-utils").Decimal;
            accountId: string;
            entryId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        sourceType: import("../../generated/prisma/enums").SourceType | null;
        sourceId: string | null;
        fiscalYearId: string;
        entryNumber: string;
        date: Date;
        journalType: import("../../generated/prisma/enums").JournalType;
        pieceNumber: string | null;
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