import { AccountingService } from "../accounting.service";
import { prisma } from "../../../config/prisma";
import { AppError } from "../../../common/http";
import { Prisma } from "../../../generated/prisma/client";

jest.mock("../../../config/prisma", () => ({
  prisma: {
    fiscalYear: {
      findUnique: jest.fn(),
    },
    journalEntry: {
      findMany: jest.fn(),
    },
    journalLine: {
      findMany: jest.fn(),
    },
    account: {
      findUnique: jest.fn(),
    },
  },
}));

describe("AccountingService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFiscalYear = {
    id: "fy-123",
    name: "FY 2026",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-12-31"),
    isClosed: false,
  };

  const mockAccount = {
    id: "acc-123",
    accountNumber: "101",
    name: "Caisse",
    type: "ASSET",
    accountClass: 1,
    isActive: true,
    isAnalytic: false,
    parentId: null,
  };

  describe("getTrialBalance", () => {
    it("should throw error if fiscal year not found", async () => {
      (prisma.fiscalYear.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(AccountingService.getTrialBalance("nonexistent")).rejects.toThrow(
        AppError,
      );
    });

    it("should get trial balance successfully", async () => {
      const mockEntry = {
        id: "entry-123",
        date: new Date(),
        lines: [
          {
            account: { accountNumber: "101", name: "Caisse" },
            debit: new Prisma.Decimal(100),
            credit: new Prisma.Decimal(0),
          },
          {
            account: { accountNumber: "301", name: "Capital" },
            debit: new Prisma.Decimal(0),
            credit: new Prisma.Decimal(100),
          },
        ],
      };

      (prisma.fiscalYear.findUnique as jest.Mock).mockResolvedValue(
        mockFiscalYear,
      );
      (prisma.journalEntry.findMany as jest.Mock).mockResolvedValue([
        mockEntry,
      ]);

      const result = await AccountingService.getTrialBalance("fy-123");

      expect(result).toHaveLength(2);
      expect(result[0].accountNumber).toBe("101");
      expect(result[0].totalDebit).toBe(100);
    });
  });

  describe("getAccountBalances", () => {
    it("should get account balances", async () => {
      const mockEntry = {
        id: "entry-123",
        date: new Date(),
        lines: [
          {
            accountId: "acc-123",
            account: mockAccount,
            debit: new Prisma.Decimal(100),
            credit: new Prisma.Decimal(0),
          },
          {
            accountId: "acc-124",
            account: { ...mockAccount, id: "acc-124", accountNumber: "301" },
            debit: new Prisma.Decimal(0),
            credit: new Prisma.Decimal(100),
          },
        ],
      };

      (prisma.fiscalYear.findUnique as jest.Mock).mockResolvedValue(
        mockFiscalYear,
      );
      (prisma.journalEntry.findMany as jest.Mock).mockResolvedValue([
        mockEntry,
      ]);

      const result = await AccountingService.getAccountBalances("fy-123");

      expect(result).toHaveLength(2);
      expect(result[0].balance).toBe(100);
      expect(result[1].balance).toBe(-100);
    });
  });

  describe("getBalanceSheet", () => {
    it("should get balance sheet", async () => {
      const mockEntry = {
        id: "entry-123",
        date: new Date(),
        lines: [
          {
            accountId: "acc-123",
            account: { ...mockAccount, accountNumber: "101" },
            debit: new Prisma.Decimal(100),
            credit: new Prisma.Decimal(0),
          },
          {
            accountId: "acc-124",
            account: { ...mockAccount, id: "acc-124", accountNumber: "301" },
            debit: new Prisma.Decimal(100),
            credit: new Prisma.Decimal(0),
          },
        ],
      };

      (prisma.fiscalYear.findUnique as jest.Mock).mockResolvedValue(
        mockFiscalYear,
      );
      (prisma.journalEntry.findMany as jest.Mock).mockResolvedValue([
        mockEntry,
      ]);

      const result = await AccountingService.getBalanceSheet("fy-123");

      expect(result.assets).toBeDefined();
      expect(result.liabilities).toBeDefined();
      expect(result.equity).toBeDefined();
      expect(result.totals.assets).toBe(100);
      expect(result.totals.equity).toBe(100);
    });
  });

  describe("getIncomeStatement", () => {
    it("should get income statement", async () => {
      const mockEntry = {
        id: "entry-123",
        date: new Date(),
        lines: [
          {
            accountId: "acc-123",
            account: { ...mockAccount, accountNumber: "701", type: "REVENUE" },
            debit: new Prisma.Decimal(0),
            credit: new Prisma.Decimal(1000),
          },
          {
            accountId: "acc-124",
            account: { ...mockAccount, id: "acc-124", accountNumber: "601", type: "EXPENSE" },
            debit: new Prisma.Decimal(400),
            credit: new Prisma.Decimal(0),
          },
        ],
      };

      (prisma.fiscalYear.findUnique as jest.Mock).mockResolvedValue(
        mockFiscalYear,
      );
      (prisma.journalEntry.findMany as jest.Mock).mockResolvedValue([
        mockEntry,
      ]);

      const result = await AccountingService.getIncomeStatement("fy-123");

      expect(result.revenues).toBeDefined();
      expect(result.expenses).toBeDefined();
      expect(result.totals.revenues).toBe(1000);
      expect(result.totals.expenses).toBe(400);
      expect(result.totals.netIncome).toBe(600);
    });
  });

  describe("getGeneralLedger", () => {
    it("should throw error if account not found", async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        AccountingService.getGeneralLedger("nonexistent"),
      ).rejects.toThrow(AppError);
    });

    it("should get general ledger for account", async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue(mockAccount);
      (prisma.journalLine.findMany as jest.Mock).mockResolvedValue([
        {
          entry: {
            date: new Date(),
            description: "Initial debit",
          },
          debit: new Prisma.Decimal(100),
          credit: new Prisma.Decimal(0),
        },
        {
          entry: {
            date: new Date(),
            description: "Credit transaction",
          },
          debit: new Prisma.Decimal(0),
          credit: new Prisma.Decimal(50),
        },
      ]);

      const result = await AccountingService.getGeneralLedger("acc-123");

      expect(result.account.number).toBe("101");
      expect(result.entries).toHaveLength(2);
      expect(result.entries[1].balance).toBe(50);
    });
  });

  describe("getCashJournal", () => {
    it("should get cash journal entries", async () => {
      const mockCashEntry = {
        id: "entry-123",
        journalType: "CASH",
        date: new Date(),
        lines: [],
      };

      (prisma.journalEntry.findMany as jest.Mock).mockResolvedValue([
        mockCashEntry,
      ]);

      const result = await AccountingService.getCashJournal();

      expect(result).toHaveLength(1);
      expect(result[0].journalType).toBe("CASH");
    });
  });
});
