/**
 * Business validation service
 */
export declare class ValidationService {
    /**
     * Validate that a loan respects the business rule: max 3 books
     */
    static validateLoanItemCount(itemCount: number): void;
    /**
     * Validate that an account has sufficient stock
     */
    static validateSufficientStock(currentStock: number, quantityNeeded: number): void;
    /**
     * Validate that a fiscal year is not closed
     */
    static validateFiscalYearNotClosed(fiscalYearId: string): Promise<void>;
    /**
     * Validate user role
     */
    static validateUserRole(userRole: string, requiredRoles: string[]): void;
}
/**
 * Business calculation service
 */
export declare class CalculationService {
    /**
     * Calculate inventory valuation (stock * unit price)
     */
    static calculateInventoryValuation(quantity: number, unitPrice: number | null): number | null;
    /**
     * Calculate interest on overdue loans (if applicable)
     * For now, returns 0 (can be extended with business logic)
     */
    static calculateLateFeesForLoan(daysOverdue: number): number;
    /**
     * Calculate total debit/credit for a set of lines
     */
    static calculateLinesTotals(lines: Array<{
        debit?: number;
        credit?: number;
    }>): {
        totalDebit: number;
        totalCredit: number;
    };
}
/**
 * Account initialization service
 * Use this to set up default chart of accounts
 */
export declare class AccountInitService {
    private static resolveAccountClass;
    private static resolveAccountType;
    private static parseAccountsFromFile;
    /**
     * Create default chart of accounts
     */
    static createDefaultAccounts(): Promise<void>;
    /**
     * Create initial fiscal year
     */
    static createInitialFiscalYear(): Promise<void>;
}
//# sourceMappingURL=business.service.d.ts.map