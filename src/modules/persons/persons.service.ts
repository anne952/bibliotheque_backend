import { prisma } from "../../config/prisma";
import { AppError } from "../../common/http";

export interface CreatePersonInput {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  address?: string;
  church?: string;
  isBorrower?: boolean;
  isBuyer?: boolean;
  isDonor?: boolean;
  isSupplier?: boolean;
  isVisitor?: boolean;
}

export interface UpdatePersonInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  church?: string;
  isBorrower?: boolean;
  isBuyer?: boolean;
  isDonor?: boolean;
  isSupplier?: boolean;
  isVisitor?: boolean;
}

export class PersonService {
  /**
   * Get all persons
   */
  static async getAll(filters?: {
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    isVisitor?: boolean;
  }) {
    const where: any = { deletedAt: null };

    if (filters?.isBorrower) where.isBorrower = true;
    if (filters?.isBuyer) where.isBuyer = true;
    if (filters?.isDonor) where.isDonor = true;
    if (filters?.isSupplier) where.isSupplier = true;
    if (filters?.isVisitor) where.isVisitor = true;

    return prisma.person.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Get a person by ID
   */
  static async getById(id: string) {
    const person = await prisma.person.findFirst({
      where: { id, deletedAt: null },
    });

    if (!person) {
      throw new AppError("Personne non trouvée", 404);
    }

    return person;
  }

  /**
   * Get loans for a person
   */
  static async getLoans(personId: string) {
    await this.getById(personId); // Verify person exists

    return prisma.loan.findMany({
      where: { personId },
      include: {
        items: {
          include: { material: true },
        },
      },
      orderBy: { borrowedAt: "desc" },
    });
  }

  /**
   * Get purchases for a person
   */
  static async getPurchases(personId: string) {
    await this.getById(personId); // Verify person exists

    return prisma.purchase.findMany({
      where: { supplierId: personId },
      include: {
        items: {
          include: { material: true },
        },
      },
      orderBy: { purchaseDate: "desc" },
    });
  }

  /**
   * Get sales for a person
   */
  static async getSales(personId: string) {
    await this.getById(personId); // Verify person exists

    return prisma.sale.findMany({
      where: { personId },
      include: {
        items: {
          include: { material: true },
        },
      },
      orderBy: { saleDate: "desc" },
    });
  }

  /**
   * Create a new person
   */
  static async create(input: CreatePersonInput) {
    // Check if email is unique (if provided)
    if (input.email) {
      const existing = await prisma.person.findFirst({
        where: { email: input.email, deletedAt: null },
      });
      if (existing) {
        throw new AppError("Cet email est déjà enregistré", 409);
      }
    }

    return prisma.person.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        email: input.email,
        address: input.address,
        church: input.church,
        isBorrower: input.isBorrower ?? false,
        isBuyer: input.isBuyer ?? false,
        isDonor: input.isDonor ?? false,
        isSupplier: input.isSupplier ?? false,
        isVisitor: input.isVisitor ?? false,
      },
    });
  }

  /**
   * Update a person
   */
  static async update(id: string, input: UpdatePersonInput) {
    // Verify person exists
    await this.getById(id);

    // Check email uniqueness if being updated
    if (input.email) {
      const existing = await prisma.person.findFirst({
        where: { email: input.email, deletedAt: null, NOT: { id } },
      });
      if (existing) {
        throw new AppError("Cet email est déjà enregistré", 409);
      }
    }

    return prisma.person.update({
      where: { id },
      data: input,
    });
  }

  /**
   * Soft delete a person
   */
  static async delete(id: string) {
    // Verify person exists
    await this.getById(id);

    const person = await prisma.person.findUnique({
      where: { id },
    });

    if (!person) {
      throw new AppError("Personne non trouvée", 404);
    }

    // Soft delete
    await prisma.person.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // Log in DeletedItem (retention 30 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await prisma.deletedItem.create({
      data: {
        originalTable: "Person",
        originalId: id,
        data: person,
        expiresAt,
      },
    });
  }
}
