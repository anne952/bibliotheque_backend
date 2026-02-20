import { PersonService } from "../persons.service";
import { prisma } from "../../../config/prisma";
import { AppError } from "../../../common/http";

jest.mock("../../../config/prisma", () => ({
  prisma: {
    person: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    loan: {
      findMany: jest.fn(),
    },
    purchase: {
      findMany: jest.fn(),
    },
    sale: {
      findMany: jest.fn(),
    },
    deletedItem: {
      create: jest.fn(),
    },
  },
}));

describe("PersonService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPerson = {
    id: "person-123",
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
    email: "john@example.com",
    address: "123 Main St",
    church: "Church A",
    isVisitor: false,
    isBorrower: true,
    isBuyer: false,
    isDonor: false,
    isSupplier: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  describe("getAll", () => {
    it("should get all persons", async () => {
      (prisma.person.findMany as jest.Mock).mockResolvedValue([mockPerson]);

      const result = await PersonService.getAll();

      expect(result).toHaveLength(1);
      expect(result[0].firstName).toBe("John");
      expect(prisma.person.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
      });
    });

    it("should filter by isBorrower", async () => {
      (prisma.person.findMany as jest.Mock).mockResolvedValue([mockPerson]);

      await PersonService.getAll({ isBorrower: true });

      expect(prisma.person.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null, isBorrower: true },
        orderBy: { createdAt: "desc" },
      });
    });
  });

  describe("getById", () => {
    it("should get person by id", async () => {
      (prisma.person.findFirst as jest.Mock).mockResolvedValue(mockPerson);

      const result = await PersonService.getById("person-123");

      expect(result.id).toBe("person-123");
      expect(result.firstName).toBe("John");
    });

    it("should throw error if person not found", async () => {
      (prisma.person.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(PersonService.getById("nonexistent")).rejects.toThrow(
        AppError,
      );
    });
  });

  describe("create", () => {
    it("should create person successfully", async () => {
      (prisma.person.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.person.create as jest.Mock).mockResolvedValue(mockPerson);

      const result = await PersonService.create({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      });

      expect(result.firstName).toBe("John");
      expect(prisma.person.create).toHaveBeenCalled();
    });

    it("should throw error if email already exists", async () => {
      (prisma.person.findFirst as jest.Mock).mockResolvedValue(mockPerson);

      await expect(
        PersonService.create({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        }),
      ).rejects.toThrow(AppError);
    });
  });

  describe("update", () => {
    it("should update person successfully", async () => {
      const updated = { ...mockPerson, firstName: "Jane" };

      (prisma.person.findFirst as jest.Mock).mockResolvedValue(mockPerson);
      (prisma.person.findFirst as jest.Mock).mockResolvedValueOnce(mockPerson);
      (prisma.person.update as jest.Mock).mockResolvedValue(updated);

      const result = await PersonService.update("person-123", {
        firstName: "Jane",
      });

      expect(result.firstName).toBe("Jane");
      expect(prisma.person.update).toHaveBeenCalled();
    });

    it("should throw error if person not found", async () => {
      (prisma.person.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        PersonService.update("nonexistent", { firstName: "Jane" }),
      ).rejects.toThrow(AppError);
    });
  });

  describe("getLoans", () => {
    it("should get person's loans", async () => {
      (prisma.person.findFirst as jest.Mock).mockResolvedValue(mockPerson);
      (prisma.loan.findMany as jest.Mock).mockResolvedValue([
        {
          id: "loan-123",
          personId: "person-123",
          status: "ACTIVE",
          items: [],
        },
      ]);

      const result = await PersonService.getLoans("person-123");

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe("ACTIVE");
    });
  });

  describe("delete", () => {
    it("should soft delete person", async () => {
      (prisma.person.findFirst as jest.Mock).mockResolvedValue(mockPerson);
      (prisma.person.findUnique as jest.Mock).mockResolvedValue(mockPerson);
      (prisma.person.update as jest.Mock).mockResolvedValue({
        ...mockPerson,
        deletedAt: new Date(),
      });
      (prisma.deletedItem.create as jest.Mock).mockResolvedValue({
        id: "deleted-123",
      });

      await PersonService.delete("person-123");

      expect(prisma.person.update).toHaveBeenCalled();
      expect(prisma.deletedItem.create).toHaveBeenCalled();
    });
  });
});
