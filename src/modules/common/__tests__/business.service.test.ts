import { AppError } from "../../../common/http";

jest.mock("../../../config/prisma", () => ({
  prisma: {
    fiscalYear: {
      findFirst: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
    },
    account: {
      create: jest.fn(),
    },
  },
}));

import { ValidationService, CalculationService } from "../business.service";

describe("ValidationService", () => {
  describe("validateLoanItemCount", () => {
    it("should pass for valid item count", () => {
      expect(() => ValidationService.validateLoanItemCount(1)).not.toThrow();
      expect(() => ValidationService.validateLoanItemCount(3)).not.toThrow();
    });

    it("should throw error for more than 3 items", () => {
      expect(() => ValidationService.validateLoanItemCount(4)).toThrow(AppError);
      expect(() => ValidationService.validateLoanItemCount(5)).toThrow(AppError);
    });
  });

  describe("validateSufficientStock", () => {
    it("should pass when stock is sufficient", () => {
      expect(() => ValidationService.validateSufficientStock(10, 5)).not.toThrow();
      expect(() => ValidationService.validateSufficientStock(10, 10)).not.toThrow();
    });

    it("should throw error when stock is insufficient", () => {
      expect(() => ValidationService.validateSufficientStock(5, 10)).toThrow(AppError);
      expect(() => ValidationService.validateSufficientStock(0, 1)).toThrow(AppError);
    });
  });

  describe("validateUserRole", () => {
    it("should pass for allowed roles", () => {
      expect(() => ValidationService.validateUserRole("ADMIN", ["ADMIN", "MANAGER"])).not.toThrow();
      expect(() => ValidationService.validateUserRole("MANAGER", ["MANAGER", "USER"])).not.toThrow();
    });

    it("should throw error for disallowed roles", () => {
      expect(() => ValidationService.validateUserRole("USER", ["ADMIN", "MANAGER"])).toThrow(AppError);
      expect(() => ValidationService.validateUserRole("VIEWER", ["ADMIN"])).toThrow(AppError);
    });
  });
});

describe("CalculationService", () => {
  describe("calculateInventoryValuation", () => {
    it("should calculate valuation correctly", () => {
      expect(CalculationService.calculateInventoryValuation(10, 5)).toBe(50);
      expect(CalculationService.calculateInventoryValuation(100, 2.5)).toBe(250);
      expect(CalculationService.calculateInventoryValuation(0, 10)).toBe(0);
    });

    it("should return null when unitPrice is null", () => {
      expect(CalculationService.calculateInventoryValuation(10, null)).toBeNull();
      expect(CalculationService.calculateInventoryValuation(0, null)).toBeNull();
    });
  });

  describe("calculateLinesTotals", () => {
    it("should calculate totals correctly", () => {
      const result = CalculationService.calculateLinesTotals([
        { debit: 100, credit: 0 },
        { debit: 0, credit: 50 },
        { debit: 50, credit: 0 },
      ]);

      expect(result.totalDebit).toBe(150);
      expect(result.totalCredit).toBe(50);
    });

    it("should handle missing fields", () => {
      const result = CalculationService.calculateLinesTotals([
        { debit: 100 },
        { credit: 50 },
      ]);

      expect(result.totalDebit).toBe(100);
      expect(result.totalCredit).toBe(50);
    });

    it("should return zero totals for empty array", () => {
      const result = CalculationService.calculateLinesTotals([]);
      expect(result.totalDebit).toBe(0);
      expect(result.totalCredit).toBe(0);
    });
  });

  describe("calculateLateFeesForLoan", () => {
    it("should return 0 for any days overdue", () => {
      expect(CalculationService.calculateLateFeesForLoan(0)).toBe(0);
      expect(CalculationService.calculateLateFeesForLoan(10)).toBe(0);
      expect(CalculationService.calculateLateFeesForLoan(100)).toBe(0);
    });
  });
});
