import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Session: "Session";
    readonly CompanyProfile: "CompanyProfile";
    readonly Person: "Person";
    readonly VisitorLog: "VisitorLog";
    readonly Material: "Material";
    readonly StockMovement: "StockMovement";
    readonly Loan: "Loan";
    readonly LoanItem: "LoanItem";
    readonly Sale: "Sale";
    readonly SaleItem: "SaleItem";
    readonly Purchase: "Purchase";
    readonly PurchaseItem: "PurchaseItem";
    readonly Donation: "Donation";
    readonly DonationItem: "DonationItem";
    readonly FiscalYear: "FiscalYear";
    readonly Account: "Account";
    readonly JournalEntry: "JournalEntry";
    readonly JournalLine: "JournalLine";
    readonly DeletedItem: "DeletedItem";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly companyName: "companyName";
    readonly profilePicture: "profilePicture";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly refreshToken: "refreshToken";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly createdAt: "createdAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const CompanyProfileScalarFieldEnum: {
    readonly id: "id";
    readonly companyName: "companyName";
    readonly companyEmail: "companyEmail";
    readonly companyLogoUrl: "companyLogoUrl";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CompanyProfileScalarFieldEnum = (typeof CompanyProfileScalarFieldEnum)[keyof typeof CompanyProfileScalarFieldEnum];
export declare const PersonScalarFieldEnum: {
    readonly id: "id";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly phone: "phone";
    readonly email: "email";
    readonly address: "address";
    readonly church: "church";
    readonly isVisitor: "isVisitor";
    readonly isBorrower: "isBorrower";
    readonly isBuyer: "isBuyer";
    readonly isDonor: "isDonor";
    readonly isSupplier: "isSupplier";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type PersonScalarFieldEnum = (typeof PersonScalarFieldEnum)[keyof typeof PersonScalarFieldEnum];
export declare const VisitorLogScalarFieldEnum: {
    readonly id: "id";
    readonly personId: "personId";
    readonly fullName: "fullName";
    readonly phone: "phone";
    readonly email: "email";
    readonly address: "address";
    readonly church: "church";
    readonly visitDate: "visitDate";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type VisitorLogScalarFieldEnum = (typeof VisitorLogScalarFieldEnum)[keyof typeof VisitorLogScalarFieldEnum];
export declare const MaterialScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly name: "name";
    readonly reference: "reference";
    readonly serialNumber: "serialNumber";
    readonly category: "category";
    readonly language: "language";
    readonly volume: "volume";
    readonly status: "status";
    readonly currentStock: "currentStock";
    readonly minStockAlert: "minStockAlert";
    readonly unitPrice: "unitPrice";
    readonly sellingPrice: "sellingPrice";
    readonly location: "location";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type MaterialScalarFieldEnum = (typeof MaterialScalarFieldEnum)[keyof typeof MaterialScalarFieldEnum];
export declare const StockMovementScalarFieldEnum: {
    readonly id: "id";
    readonly materialId: "materialId";
    readonly movementType: "movementType";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly totalAmount: "totalAmount";
    readonly movementDate: "movementDate";
    readonly description: "description";
    readonly reference: "reference";
    readonly sourceType: "sourceType";
    readonly sourceId: "sourceId";
    readonly createdAt: "createdAt";
};
export type StockMovementScalarFieldEnum = (typeof StockMovementScalarFieldEnum)[keyof typeof StockMovementScalarFieldEnum];
export declare const LoanScalarFieldEnum: {
    readonly id: "id";
    readonly personId: "personId";
    readonly borrowedAt: "borrowedAt";
    readonly expectedReturnAt: "expectedReturnAt";
    readonly returnedAt: "returnedAt";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LoanScalarFieldEnum = (typeof LoanScalarFieldEnum)[keyof typeof LoanScalarFieldEnum];
export declare const LoanItemScalarFieldEnum: {
    readonly id: "id";
    readonly loanId: "loanId";
    readonly materialId: "materialId";
    readonly quantity: "quantity";
    readonly createdAt: "createdAt";
};
export type LoanItemScalarFieldEnum = (typeof LoanItemScalarFieldEnum)[keyof typeof LoanItemScalarFieldEnum];
export declare const SaleScalarFieldEnum: {
    readonly id: "id";
    readonly personId: "personId";
    readonly saleDate: "saleDate";
    readonly paymentMethod: "paymentMethod";
    readonly paymentStatus: "paymentStatus";
    readonly invoiceNumber: "invoiceNumber";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum];
export declare const SaleItemScalarFieldEnum: {
    readonly id: "id";
    readonly saleId: "saleId";
    readonly materialId: "materialId";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly totalAmount: "totalAmount";
    readonly createdAt: "createdAt";
};
export type SaleItemScalarFieldEnum = (typeof SaleItemScalarFieldEnum)[keyof typeof SaleItemScalarFieldEnum];
export declare const PurchaseScalarFieldEnum: {
    readonly id: "id";
    readonly supplierId: "supplierId";
    readonly purchaseDate: "purchaseDate";
    readonly paymentMethod: "paymentMethod";
    readonly paymentStatus: "paymentStatus";
    readonly invoiceNumber: "invoiceNumber";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PurchaseScalarFieldEnum = (typeof PurchaseScalarFieldEnum)[keyof typeof PurchaseScalarFieldEnum];
export declare const PurchaseItemScalarFieldEnum: {
    readonly id: "id";
    readonly purchaseId: "purchaseId";
    readonly materialId: "materialId";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly totalAmount: "totalAmount";
    readonly createdAt: "createdAt";
};
export type PurchaseItemScalarFieldEnum = (typeof PurchaseItemScalarFieldEnum)[keyof typeof PurchaseItemScalarFieldEnum];
export declare const DonationScalarFieldEnum: {
    readonly id: "id";
    readonly donorId: "donorId";
    readonly donorName: "donorName";
    readonly donorType: "donorType";
    readonly donationKind: "donationKind";
    readonly direction: "direction";
    readonly amount: "amount";
    readonly paymentMethod: "paymentMethod";
    readonly donationDate: "donationDate";
    readonly description: "description";
    readonly institution: "institution";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DonationScalarFieldEnum = (typeof DonationScalarFieldEnum)[keyof typeof DonationScalarFieldEnum];
export declare const DonationItemScalarFieldEnum: {
    readonly id: "id";
    readonly donationId: "donationId";
    readonly materialId: "materialId";
    readonly quantity: "quantity";
    readonly createdAt: "createdAt";
};
export type DonationItemScalarFieldEnum = (typeof DonationItemScalarFieldEnum)[keyof typeof DonationItemScalarFieldEnum];
export declare const FiscalYearScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isClosed: "isClosed";
    readonly closedAt: "closedAt";
    readonly closedById: "closedById";
    readonly createdAt: "createdAt";
};
export type FiscalYearScalarFieldEnum = (typeof FiscalYearScalarFieldEnum)[keyof typeof FiscalYearScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly accountNumber: "accountNumber";
    readonly name: "name";
    readonly type: "type";
    readonly accountClass: "accountClass";
    readonly isActive: "isActive";
    readonly isAnalytic: "isAnalytic";
    readonly parentId: "parentId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const JournalEntryScalarFieldEnum: {
    readonly id: "id";
    readonly entryNumber: "entryNumber";
    readonly fiscalYearId: "fiscalYearId";
    readonly date: "date";
    readonly journalType: "journalType";
    readonly pieceNumber: "pieceNumber";
    readonly description: "description";
    readonly sourceType: "sourceType";
    readonly sourceId: "sourceId";
    readonly isValidated: "isValidated";
    readonly validatedAt: "validatedAt";
    readonly validatedById: "validatedById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type JournalEntryScalarFieldEnum = (typeof JournalEntryScalarFieldEnum)[keyof typeof JournalEntryScalarFieldEnum];
export declare const JournalLineScalarFieldEnum: {
    readonly id: "id";
    readonly entryId: "entryId";
    readonly accountId: "accountId";
    readonly debit: "debit";
    readonly credit: "credit";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type JournalLineScalarFieldEnum = (typeof JournalLineScalarFieldEnum)[keyof typeof JournalLineScalarFieldEnum];
export declare const DeletedItemScalarFieldEnum: {
    readonly id: "id";
    readonly originalTable: "originalTable";
    readonly originalId: "originalId";
    readonly data: "data";
    readonly deletedAt: "deletedAt";
    readonly expiresAt: "expiresAt";
    readonly restoredAt: "restoredAt";
    readonly restoredById: "restoredById";
};
export type DeletedItemScalarFieldEnum = (typeof DeletedItemScalarFieldEnum)[keyof typeof DeletedItemScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map