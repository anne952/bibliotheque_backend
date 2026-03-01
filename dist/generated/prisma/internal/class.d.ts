import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.session`: Exposes CRUD operations for the **Session** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sessions
      * const sessions = await prisma.session.findMany()
      * ```
      */
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.companyProfile`: Exposes CRUD operations for the **CompanyProfile** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CompanyProfiles
      * const companyProfiles = await prisma.companyProfile.findMany()
      * ```
      */
    get companyProfile(): Prisma.CompanyProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.person`: Exposes CRUD operations for the **Person** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more People
      * const people = await prisma.person.findMany()
      * ```
      */
    get person(): Prisma.PersonDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.visitorLog`: Exposes CRUD operations for the **VisitorLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more VisitorLogs
      * const visitorLogs = await prisma.visitorLog.findMany()
      * ```
      */
    get visitorLog(): Prisma.VisitorLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.material`: Exposes CRUD operations for the **Material** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Materials
      * const materials = await prisma.material.findMany()
      * ```
      */
    get material(): Prisma.MaterialDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.stockMovement`: Exposes CRUD operations for the **StockMovement** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more StockMovements
      * const stockMovements = await prisma.stockMovement.findMany()
      * ```
      */
    get stockMovement(): Prisma.StockMovementDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.loan`: Exposes CRUD operations for the **Loan** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Loans
      * const loans = await prisma.loan.findMany()
      * ```
      */
    get loan(): Prisma.LoanDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.loanItem`: Exposes CRUD operations for the **LoanItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more LoanItems
      * const loanItems = await prisma.loanItem.findMany()
      * ```
      */
    get loanItem(): Prisma.LoanItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sales
      * const sales = await prisma.sale.findMany()
      * ```
      */
    get sale(): Prisma.SaleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.saleItem`: Exposes CRUD operations for the **SaleItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SaleItems
      * const saleItems = await prisma.saleItem.findMany()
      * ```
      */
    get saleItem(): Prisma.SaleItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.purchase`: Exposes CRUD operations for the **Purchase** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Purchases
      * const purchases = await prisma.purchase.findMany()
      * ```
      */
    get purchase(): Prisma.PurchaseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.purchaseItem`: Exposes CRUD operations for the **PurchaseItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PurchaseItems
      * const purchaseItems = await prisma.purchaseItem.findMany()
      * ```
      */
    get purchaseItem(): Prisma.PurchaseItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.donation`: Exposes CRUD operations for the **Donation** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Donations
      * const donations = await prisma.donation.findMany()
      * ```
      */
    get donation(): Prisma.DonationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.donationItem`: Exposes CRUD operations for the **DonationItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DonationItems
      * const donationItems = await prisma.donationItem.findMany()
      * ```
      */
    get donationItem(): Prisma.DonationItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.fiscalYear`: Exposes CRUD operations for the **FiscalYear** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FiscalYears
      * const fiscalYears = await prisma.fiscalYear.findMany()
      * ```
      */
    get fiscalYear(): Prisma.FiscalYearDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.account`: Exposes CRUD operations for the **Account** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Accounts
      * const accounts = await prisma.account.findMany()
      * ```
      */
    get account(): Prisma.AccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.journalEntry`: Exposes CRUD operations for the **JournalEntry** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more JournalEntries
      * const journalEntries = await prisma.journalEntry.findMany()
      * ```
      */
    get journalEntry(): Prisma.JournalEntryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.journalLine`: Exposes CRUD operations for the **JournalLine** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more JournalLines
      * const journalLines = await prisma.journalLine.findMany()
      * ```
      */
    get journalLine(): Prisma.JournalLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.deletedItem`: Exposes CRUD operations for the **DeletedItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DeletedItems
      * const deletedItems = await prisma.deletedItem.findMany()
      * ```
      */
    get deletedItem(): Prisma.DeletedItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.syncTask`: Exposes CRUD operations for the **SyncTask** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SyncTasks
      * const syncTasks = await prisma.syncTask.findMany()
      * ```
      */
    get syncTask(): Prisma.SyncTaskDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map