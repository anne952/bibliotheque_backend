export declare class ReportsService {
    /**
     * Get daily report (transactions for a specific date)
     */
    static getDailyReport(date?: string): Promise<{
        date: Date;
        sales: number;
        purchases: number;
        donations: number;
        loans: number;
        returns: number;
        details: {
            sales: ({
                person: {
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
                } | null;
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
            })[];
            purchases: ({
                supplier: {
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
                } | null;
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
                    purchaseId: string;
                })[];
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
            })[];
            donations: ({
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
                    donationId: string;
                })[];
                donor: {
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
                } | null;
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                paymentMethod: import("../../generated/prisma/enums").PaymentMethod | null;
                donorId: string | null;
                donorName: string | null;
                donorType: import("../../generated/prisma/enums").DonorType;
                donationKind: import("../../generated/prisma/enums").DonationKind;
                direction: import("../../generated/prisma/enums").DonationDirection;
                amount: import("@prisma/client-runtime-utils").Decimal | null;
                donationDate: Date;
                institution: string | null;
            })[];
            loans: ({
                person: {
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
                };
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
            })[];
            returns: ({
                person: {
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
                };
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
            })[];
        };
    }>;
    /**
     * Get donors report with total donations
     */
    static getDonorsReport(): Promise<{
        donor: {
            id: string;
            firstName: string;
            lastName: string;
            email: string | null;
            phone: string | null;
        };
        totalDonations: number;
        totalFinancial: number;
        totalMaterial: number;
        lastDonation: Date | null;
    }[]>;
    /**
     * Get most borrowed materials report
     */
    static getMostBorrowedReport(limit?: number): Promise<{
        material: {
            id: string;
            name: string;
            type: import("../../generated/prisma/enums").MaterialType;
            reference: string | null;
            currentStock: number;
        };
        totalBorrowed: number;
        activeBorrows: number;
        totalQuantityBorrowed: number;
    }[]>;
    /**
     * Get inventory report
     */
    static getInventoryReport(): Promise<{
        summary: {
            totalItems: number;
            totalStock: number;
            lowStockCount: number;
            outOfStock: number;
            byType: Record<string, {
                count: number;
                stock: number;
            }>;
        };
        items: {
            id: string;
            name: string;
            type: import("../../generated/prisma/enums").MaterialType;
            reference: string | null;
            currentStock: number;
            minStockAlert: number;
            unitPrice: number | undefined;
            valuation: number | null;
            isLowStock: boolean;
            isOutOfStock: boolean;
        }[];
    }>;
}
//# sourceMappingURL=reports.service.d.ts.map