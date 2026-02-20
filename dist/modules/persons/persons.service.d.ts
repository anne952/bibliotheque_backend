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
        email: string | null;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
        email: string | null;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                description: string | null;
                type: import(".prisma/client").$Enums.MaterialType;
                reference: string | null;
                serialNumber: string | null;
                category: string | null;
                language: string | null;
                volume: string | null;
                status: import(".prisma/client").$Enums.MaterialStatus;
                currentStock: number;
                minStockAlert: number;
                unitPrice: import("@prisma/client-runtime-utils").Decimal | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
                location: string | null;
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
        status: import(".prisma/client").$Enums.LoanStatus;
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
        items: ({
            material: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                description: string | null;
                type: import(".prisma/client").$Enums.MaterialType;
                reference: string | null;
                serialNumber: string | null;
                category: string | null;
                language: string | null;
                volume: string | null;
                status: import(".prisma/client").$Enums.MaterialStatus;
                currentStock: number;
                minStockAlert: number;
                unitPrice: import("@prisma/client-runtime-utils").Decimal | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
                location: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            materialId: string;
            quantity: number;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            purchaseId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        purchaseDate: Date;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
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
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                description: string | null;
                type: import(".prisma/client").$Enums.MaterialType;
                reference: string | null;
                serialNumber: string | null;
                category: string | null;
                language: string | null;
                volume: string | null;
                status: import(".prisma/client").$Enums.MaterialStatus;
                currentStock: number;
                minStockAlert: number;
                unitPrice: import("@prisma/client-runtime-utils").Decimal | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal | null;
                location: string | null;
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
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
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
        email: string | null;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
        email: string | null;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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