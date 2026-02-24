export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly MANAGER: "MANAGER";
    readonly USER: "USER";
    readonly VIEWER: "VIEWER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const MaterialType: {
    readonly BOOK: "BOOK";
    readonly SD_CARD: "SD_CARD";
    readonly TABLET: "TABLET";
    readonly PHOTOCOPIER: "PHOTOCOPIER";
    readonly PRINTER: "PRINTER";
    readonly CHAIR: "CHAIR";
    readonly OTHER: "OTHER";
};
export type MaterialType = (typeof MaterialType)[keyof typeof MaterialType];
export declare const MaterialStatus: {
    readonly FUNCTIONAL: "FUNCTIONAL";
    readonly DEFECTIVE: "DEFECTIVE";
    readonly UNDER_REPAIR: "UNDER_REPAIR";
    readonly UNUSABLE: "UNUSABLE";
    readonly LOST: "LOST";
    readonly DONATED: "DONATED";
};
export type MaterialStatus = (typeof MaterialStatus)[keyof typeof MaterialStatus];
export declare const StockMovementType: {
    readonly PURCHASE_IN: "PURCHASE_IN";
    readonly DONATION_IN: "DONATION_IN";
    readonly DONATION_OUT: "DONATION_OUT";
    readonly LOAN_OUT: "LOAN_OUT";
    readonly RETURN_IN: "RETURN_IN";
    readonly SALE_OUT: "SALE_OUT";
    readonly ADJUSTMENT: "ADJUSTMENT";
    readonly TRANSFER: "TRANSFER";
    readonly LOSS: "LOSS";
};
export type StockMovementType = (typeof StockMovementType)[keyof typeof StockMovementType];
export declare const LoanStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly RETURNED: "RETURNED";
    readonly OVERDUE: "OVERDUE";
    readonly LOST: "LOST";
};
export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus];
export declare const DonationKind: {
    readonly FINANCIAL: "FINANCIAL";
    readonly MATERIAL: "MATERIAL";
};
export type DonationKind = (typeof DonationKind)[keyof typeof DonationKind];
export declare const DonationDirection: {
    readonly IN: "IN";
    readonly OUT: "OUT";
};
export type DonationDirection = (typeof DonationDirection)[keyof typeof DonationDirection];
export declare const DonorType: {
    readonly INDIVIDUAL: "INDIVIDUAL";
    readonly CORPORATE: "CORPORATE";
    readonly ASSOCIATION: "ASSOCIATION";
    readonly CHURCH: "CHURCH";
    readonly OTHER: "OTHER";
};
export type DonorType = (typeof DonorType)[keyof typeof DonorType];
export declare const PaymentMethod: {
    readonly CASH: "CASH";
    readonly CHECK: "CHECK";
    readonly BANK_TRANSFER: "BANK_TRANSFER";
    readonly CREDIT_CARD: "CREDIT_CARD";
    readonly MOBILE_MONEY: "MOBILE_MONEY";
    readonly IN_KIND: "IN_KIND";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly PARTIALLY_PAID: "PARTIALLY_PAID";
    readonly CANCELLED: "CANCELLED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const AccountType: {
    readonly ASSET: "ASSET";
    readonly LIABILITY: "LIABILITY";
    readonly EQUITY: "EQUITY";
    readonly REVENUE: "REVENUE";
    readonly EXPENSE: "EXPENSE";
    readonly CONTINGENT: "CONTINGENT";
};
export type AccountType = (typeof AccountType)[keyof typeof AccountType];
export declare const JournalType: {
    readonly GENERAL: "GENERAL";
    readonly CASH: "CASH";
    readonly DONATION: "DONATION";
    readonly PURCHASE: "PURCHASE";
    readonly SALES: "SALES";
    readonly BANK: "BANK";
};
export type JournalType = (typeof JournalType)[keyof typeof JournalType];
export declare const SourceType: {
    readonly SALE: "SALE";
    readonly PURCHASE: "PURCHASE";
    readonly DONATION_FINANCIAL: "DONATION_FINANCIAL";
    readonly DONATION_MATERIAL: "DONATION_MATERIAL";
    readonly LOAN: "LOAN";
    readonly RETURN: "RETURN";
    readonly STOCK_ADJUSTMENT: "STOCK_ADJUSTMENT";
    readonly EXPENSE: "EXPENSE";
    readonly OTHER: "OTHER";
};
export type SourceType = (typeof SourceType)[keyof typeof SourceType];
//# sourceMappingURL=enums.d.ts.map