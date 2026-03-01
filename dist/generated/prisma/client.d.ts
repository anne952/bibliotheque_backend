import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Session
 *
 */
export type Session = Prisma.SessionModel;
/**
 * Model CompanyProfile
 *
 */
export type CompanyProfile = Prisma.CompanyProfileModel;
/**
 * Model Person
 *
 */
export type Person = Prisma.PersonModel;
/**
 * Model VisitorLog
 *
 */
export type VisitorLog = Prisma.VisitorLogModel;
/**
 * Model Material
 *
 */
export type Material = Prisma.MaterialModel;
/**
 * Model StockMovement
 *
 */
export type StockMovement = Prisma.StockMovementModel;
/**
 * Model Loan
 *
 */
export type Loan = Prisma.LoanModel;
/**
 * Model LoanItem
 *
 */
export type LoanItem = Prisma.LoanItemModel;
/**
 * Model Sale
 *
 */
export type Sale = Prisma.SaleModel;
/**
 * Model SaleItem
 *
 */
export type SaleItem = Prisma.SaleItemModel;
/**
 * Model Purchase
 *
 */
export type Purchase = Prisma.PurchaseModel;
/**
 * Model PurchaseItem
 *
 */
export type PurchaseItem = Prisma.PurchaseItemModel;
/**
 * Model Donation
 *
 */
export type Donation = Prisma.DonationModel;
/**
 * Model DonationItem
 *
 */
export type DonationItem = Prisma.DonationItemModel;
/**
 * Model FiscalYear
 *
 */
export type FiscalYear = Prisma.FiscalYearModel;
/**
 * Model Account
 *
 */
export type Account = Prisma.AccountModel;
/**
 * Model JournalEntry
 *
 */
export type JournalEntry = Prisma.JournalEntryModel;
/**
 * Model JournalLine
 *
 */
export type JournalLine = Prisma.JournalLineModel;
/**
 * Model DeletedItem
 *
 */
export type DeletedItem = Prisma.DeletedItemModel;
/**
 * Model SyncTask
 *
 */
export type SyncTask = Prisma.SyncTaskModel;
//# sourceMappingURL=client.d.ts.map