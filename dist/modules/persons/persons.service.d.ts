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
export declare class PersonService {
    /**
     * Get all persons
     */
    static getAll(filters?: {
        isBorrower?: boolean;
        isBuyer?: boolean;
        isDonor?: boolean;
        isSupplier?: boolean;
        isVisitor?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        email: string | null;
        updatedAt: Date;
        deletedAt: Date | null;
        firstName: string;
        lastName: string;
        phone: string | null;
        address: string | null;
        church: string | null;
        isVisitor: boolean;
        isBorrower: boolean;
        isBuyer: boolean;
        isDonor: boolean;
        isSupplier: boolean;
    }[]>;
    /**
     * Get a person by ID
     */
    static getById(id: string): Promise<{
        id: string;
        createdAt: Date;
        email: string | null;
        updatedAt: Date;
        deletedAt: Date | null;
        firstName: string;
        lastName: string;
        phone: string | null;
        address: string | null;
        church: string | null;
        isVisitor: boolean;
        isBorrower: boolean;
        isBuyer: boolean;
        isDonor: boolean;
        isSupplier: boolean;
    }>;
    /**
     * Get loans for a person
     */
    static getLoans(personId: string): Promise<({
        items: ({
            material: {
                id: string;
                createdAt: Date;
                name: string;
                updatedAt: Date;
                deletedAt: Date | null;
                type: import("../../generated/prisma/enums").MaterialType;
                reference: string | null;
                serialNumber: string | null;
                category: string | null;
                language: string | null;
                volume: string | null;
                status: import("../../generated/prisma/enums").MaterialStatus;
                currentStock: number;
                minStockAlert: number;
                unitPrice: import("@prisma/client-runtime-utils").Decimal | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
                location: string | null;
                description: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            materialId: string;
            quantity: number;
            loanId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums").LoanStatus;
        notes: string | null;
        personId: string;
        borrowedAt: Date;
        expectedReturnAt: Date;
        returnedAt: Date | null;
    })[]>;
    /**
     * Get purchases for a person
     */
    static getPurchases(personId: string): Promise<({
        items: {
            id: string;
            createdAt: Date;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            purchaseId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        purchaseDate: Date;
        paymentMethod: import("../../generated/prisma/enums").PaymentMethod;
        paymentStatus: import("../../generated/prisma/enums").PaymentStatus;
        invoiceNumber: string | null;
        notes: string | null;
        supplierId: string | null;
    })[]>;
    /**
     * Get sales for a person
     */
    static getSales(personId: string): Promise<({
        items: ({
            material: {
                id: string;
                createdAt: Date;
                name: string;
                updatedAt: Date;
                deletedAt: Date | null;
                type: import("../../generated/prisma/enums").MaterialType;
                reference: string | null;
                serialNumber: string | null;
                category: string | null;
                language: string | null;
                volume: string | null;
                status: import("../../generated/prisma/enums").MaterialStatus;
                currentStock: number;
                minStockAlert: number;
                unitPrice: import("@prisma/client-runtime-utils").Decimal | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
                location: string | null;
                description: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            materialId: string;
            quantity: number;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            saleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        paymentMethod: import("../../generated/prisma/enums").PaymentMethod;
        paymentStatus: import("../../generated/prisma/enums").PaymentStatus;
        invoiceNumber: string | null;
        notes: string | null;
        saleDate: Date;
        personId: string | null;
    })[]>;
    /**
     * Create a new person
     */
    static create(input: CreatePersonInput): Promise<{
        id: string;
        createdAt: Date;
        email: string | null;
        updatedAt: Date;
        deletedAt: Date | null;
        firstName: string;
        lastName: string;
        phone: string | null;
        address: string | null;
        church: string | null;
        isVisitor: boolean;
        isBorrower: boolean;
        isBuyer: boolean;
        isDonor: boolean;
        isSupplier: boolean;
    }>;
    /**
     * Update a person
     */
    static update(id: string, input: UpdatePersonInput): Promise<{
        id: string;
        createdAt: Date;
        email: string | null;
        updatedAt: Date;
        deletedAt: Date | null;
        firstName: string;
        lastName: string;
        phone: string | null;
        address: string | null;
        church: string | null;
        isVisitor: boolean;
        isBorrower: boolean;
        isBuyer: boolean;
        isDonor: boolean;
        isSupplier: boolean;
    }>;
    /**
     * Soft delete a person
     */
    static delete(id: string): Promise<void>;
}
//# sourceMappingURL=persons.service.d.ts.map