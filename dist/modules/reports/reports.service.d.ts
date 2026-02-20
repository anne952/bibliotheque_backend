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
                } | null;
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
            })[];
            purchases: ({
                supplier: {
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
                } | null;
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
            })[];
            donations: ({
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
                    donationId: string;
                })[];
                donor: {
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
                } | null;
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                paymentMethod: import(".prisma/client").$Enums.PaymentMethod | null;
                donorId: string | null;
                donorName: string | null;
                donorType: import(".prisma/client").$Enums.DonorType;
                donationKind: import(".prisma/client").$Enums.DonationKind;
                direction: import(".prisma/client").$Enums.DonationDirection;
                amount: import("@prisma/client-runtime-utils").Decimal | null;
                donationDate: Date;
                institution: string | null;
            })[];
            loans: ({
                person: {
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
                };
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
            })[];
            returns: ({
                person: {
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
                };
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
            type: import(".prisma/client").$Enums.MaterialType;
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
            type: import(".prisma/client").$Enums.MaterialType;
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