import { prisma } from "../../config/prisma";
import { AppError } from "../../common/http";
import { AccountType } from "../../generated/prisma/client";

/**
 * Business validation service
 */
export class ValidationService {
  /**
   * Validate that a loan respects the business rule: max 3 books
   */
  static validateLoanItemCount(itemCount: number): void {
    if (itemCount > 3) {
      throw new AppError("Un emprunt ne peut pas contenir plus de 3 livres", 400);
    }
  }

  /**
   * Validate that an account has sufficient stock
   */
  static validateSufficientStock(
    currentStock: number,
    quantityNeeded: number,
  ): void {
    if (currentStock < quantityNeeded) {
      throw new AppError("Stock insuffisant pour cette opération", 400);
    }
  }

  /**
   * Validate that a fiscal year is not closed
   */
  static async validateFiscalYearNotClosed(fiscalYearId: string): Promise<void> {
    const fy = await prisma.fiscalYear.findUnique({
      where: { id: fiscalYearId },
    });

    if (!fy) {
      throw new AppError("Exercice comptable non trouvé", 404);
    }

    if (fy.isClosed) {
      throw new AppError(
        "Impossible: exercice comptable fermé",
        400,
      );
    }
  }

  /**
   * Validate user role
   */
  static validateUserRole(
    userRole: string,
    requiredRoles: string[],
  ): void {
    if (!requiredRoles.includes(userRole)) {
      throw new AppError("Permission insuffisante", 403);
    }
  }
}

/**
 * Business calculation service
 */
export class CalculationService {
  /**
   * Calculate inventory valuation (stock * unit price)
   */
  static calculateInventoryValuation(
    quantity: number,
    unitPrice: number | null,
  ): number | null {
    if (unitPrice === null) return null;
    return quantity * unitPrice;
  }

  /**
   * Calculate interest on overdue loans (if applicable)
   * For now, returns 0 (can be extended with business logic)
   */
  static calculateLateFeesForLoan(daysOverdue: number): number {
    // Placeholder: no fees for now
    // Can be extended with business rule like: 0.5% per day
    return 0;
  }

  /**
   * Calculate total debit/credit for a set of lines
   */
  static calculateLinesTotals(
    lines: Array<{ debit?: number; credit?: number }>,
  ): { totalDebit: number; totalCredit: number } {
    let totalDebit = 0;
    let totalCredit = 0;

    for (const line of lines) {
      if (line.debit) totalDebit += line.debit;
      if (line.credit) totalCredit += line.credit;
    }

    return { totalDebit, totalCredit };
  }
}

/**
 * Account initialization service
 * Use this to set up default chart of accounts
 */
export class AccountInitService {
  /**
   * Create default chart of accounts
   */
  static async createDefaultAccounts(): Promise<void> {
    // Check if accounts already exist
    const existingCount = await prisma.account.count();
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
      await prisma.account.create({
        data: {
          accountNumber: acc.number,
          name: acc.name,
          type: acc.type as AccountType,
          accountClass: acc.class,
        },
      });
    }

    console.log("Default chart of accounts created");
  }

  /**
   * Create initial fiscal year
   */
  static async createInitialFiscalYear(): Promise<void> {
    const existing = await prisma.fiscalYear.findFirst();
    if (existing) {
      console.log("Fiscal year already exists");
      return;
    }

    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1); // Jan 1
    const endDate = new Date(now.getFullYear(), 11, 31); // Dec 31

    await prisma.fiscalYear.create({
      data: {
        name: `FY ${now.getFullYear()}`,
        startDate,
        endDate,
      },
    });

    console.log("Initial fiscal year created");
  }
}
