# API Endpoints Documentation

## Base URL
- Development: `http://localhost:4000/api`
- Production (Render): `https://bibliotheque-backend-1.onrender.com/api`

### Exemples d'appels complets
- Health (local): `http://localhost:4000/api/init/health`
- Health (Render): `https://bibliotheque-backend-1.onrender.com/api/init/health`
- Register status (Render): `https://bibliotheque-backend-1.onrender.com/api/auth/register-status`

---

## 1. INITIALIZATION

### Setup Database
- **POST** `/init/setup`
- Creates default chart of accounts and initial fiscal year
- Response: Success message with timestamp

### Health Check
- **GET** `/init/health`
- Returns API health status
- Response: `{ status: "ok", timestamp: "..." }`

---

## 2. AUTHENTICATION

### Registration Status
- **GET** `/auth/register-status`
- Response: `{ canRegister, usersCount }`
- `canRegister=true` only on first setup (no principal account yet)

### Register
- **POST** `/auth/register`
- Body: `{ email, password, companyName? }`
- Rule: Allowed only once for first setup; afterwards returns `403` and app must use login only
- Response: Principal user object (without password)

### Login
- **POST** `/auth/login`
- Body: `{ email, password }`
- Response: `{ user: {...}, refreshToken }`

### Refresh Token
- **POST** `/auth/refresh`
- Body: `{ refreshToken }`
- Response: `{ user: {...}, refreshToken }`
- Expiration: refresh token valid for 7 days
- Rotation: each successful refresh returns a new refresh token; previous token stays valid for 1 minute (grace period), then becomes invalid
- Frontend rule: always store and use the latest `refreshToken` returned by `/auth/login` or `/auth/refresh`

### Logout
- **POST** `/auth/logout`
- Body: `{ refreshToken }`
- Response: Success message

### Get Profile (Protected)
- **GET** `/auth/profile`
- Headers: `Authorization: Bearer <refreshToken>`
- Response: User profile object

### Update Profile (Protected)
- **PUT** `/auth/profile`
- Headers: `Authorization: Bearer <refreshToken>`
- Body: `{ companyName?, profilePicture? }`
- Response: Updated user object

---

## 3. PERSONS (CRUD)

### Get All Persons
- **GET** `/persons`
- Query params: `?isBorrower=true&isBuyer=true&isDonor=true&isSupplier=true&isVisitor=true`
- Response: Array of person objects

### Get Person by ID
- **GET** `/persons/:id`
- Response: Person object

### Get Person's Loans
- **GET** `/persons/:id/loans`
- Response: Array of loan objects with items

### Get Person's Purchases
- **GET** `/persons/:id/purchases`
- Response: Array of purchase objects with items

### Get Person's Sales
- **GET** `/persons/:id/sales`
- Response: Array of sale objects with items

### Create Person
- **POST** `/persons`
- Body: `{ firstName, lastName, phone?, email?, address?, church?, isBorrower?, isBuyer?, isDonor?, isSupplier?, isVisitor? }`
- Response: Created person object

### Update Person
- **PUT** `/persons/:id`
- Body: Same as create (only provided fields are updated)
- Response: Updated person object

### Delete Person (Soft Delete)
- **DELETE** `/persons/:id`
- Response: 204 No Content

---

## 4. MATERIALS (Inventory)

### Get All Materials
- **GET** `/materials`
- Response: Array of material objects

### Get Low Stock Materials
- **GET** `/materials/low-stock`
- Response: Array of materials where `currentStock <= minStockAlert`

### Get Material by ID
- **GET** `/materials/:id`
- Response: Material object

### Get Material Transactions
- **GET** `/materials/:id/transactions`
- Response: Array of stock movements for this material

### Create Material
- **POST** `/materials`
- Body: `{ type, name, reference?, serialNumber?, category?, language?, volume?, minStockAlert?, unitPrice?, sellingPrice?, location?, description? }`
- Response: Created material object

### Update Material
- **PUT** `/materials/:id`
- Body: Any updatable fields
- Response: Updated material object

### Delete Material (Soft Delete)
- **DELETE** `/materials/:id`
- Response: 204 No Content

### Alias Module Bibliotheque (meme CRUD)
- **GET** `/bibliotheque`
- **GET** `/bibliotheque/low-stock`
- **GET** `/bibliotheque/:id`
- **GET** `/bibliotheque/:id/transactions`
- **POST** `/bibliotheque`
- **PUT** `/bibliotheque/:id`
- **DELETE** `/bibliotheque/:id`
- Notes: cet alias pointe sur la meme logique que `/materials` et couvre bien les actions modifier/supprimer.

### Alias Module Materiel (meme CRUD)
- **GET** `/materiel`
- **GET** `/materiel/low-stock`
- **GET** `/materiel/:id`
- **GET** `/materiel/:id/transactions`
- **POST** `/materiel`
- **PUT** `/materiel/:id`
- **DELETE** `/materiel/:id`
- Notes: cet alias pointe sur la meme logique que `/materials`.

---

## 5. TRANSACTIONS (Stock Movements)

### Get All Stock Movements
- **GET** `/transactions`
- Response: Array of stock movement objects

### Get Stock Movement by ID
- **GET** `/transactions/:id`
- Response: Stock movement object

### Create Purchase
- **POST** `/transactions/purchase`
- Body: `{ materialId, quantity, unitPrice, paymentMethod?, paymentStatus?, supplierId?, invoiceNumber?, notes?, reference? }`
- Creates Purchase record + StockMovement (PURCHASE_IN) + updates Material stock
- Response: Created purchase object

### Update Purchase
- **PUT** `/transactions/purchase/:id`
- Body: `{ supplierId?, paymentMethod?, paymentStatus?, invoiceNumber?, notes?, purchaseDate?, unitPrice?/montant? }`
- Updates purchase metadata and optional item pricing
- Response: Updated purchase object

### Delete Purchase
- **DELETE** `/transactions/purchase/:id`
- Reverts PURCHASE_IN stock impact, removes related stock movements, then deletes purchase
- Response: 204 No Content

### Create Sale
- **POST** `/transactions/sale`
- Body: `{ materialId, quantity, unitPrice, personId?, paymentMethod?, paymentStatus?, invoiceNumber?, notes?, reference? }`
- Creates Sale record + StockMovement (SALE_OUT) + updates Material stock
- Response: Created sale object

### Update Sale
- **PUT** `/transactions/sale/:id`
- Body: `{ personId?, paymentMethod?, paymentStatus?, invoiceNumber?, notes?, saleDate?, unitPrice?/montant? }`
- Updates sale metadata and optional item pricing
- Response: Updated sale object

### Delete Sale
- **DELETE** `/transactions/sale/:id`
- Reverts SALE_OUT stock impact, removes related stock movements, then deletes sale
- Response: 204 No Content

### Create Loan
- **POST** `/transactions/loan`
- Body: `{ personId, expectedReturnAt, notes?, items: [{ materialId, quantity }] }`
- Constraint: Max 3 books per loan, only BOOK type materials
- Creates Loan record + LoanItems + StockMovements (LOAN_OUT) + updates Material stock
- Response: Created loan object with items

### Update Loan
- **PUT** `/transactions/loan/:id`
- Body: `{ personId?, expectedReturnAt?, notes? }`
- Updates loan metadata
- Response: Updated loan object

### Delete Loan
- **DELETE** `/transactions/loan/:id`
- If ACTIVE/OVERDUE: restores stock for loaned items, removes LOAN/RETURN stock movements, then deletes loan
- Response: 204 No Content

### Return Loan
- **POST** `/transactions/return`
- Body: `{ loanId, notes? }`
- Updates Loan status to RETURNED + creates StockMovements (RETURN_IN) + restores Material stock
- Response: Updated loan object

### Create Donation
- **POST** `/transactions/donation`
- Body: `{ donorId?, donorName?, donorType?, donationKind, direction?, amount?, paymentMethod?, description?, institution?, items? }`
- For material donations: requires items array
- For financial donations: requires amount
- Response: Created donation object

### Update Donation
- **PUT** `/transactions/donation/:id`
- Body: `{ donorId?, donorName?, donorType?, paymentMethod?, donationDate?, description?, institution?, amount? }`
- Updates donation metadata
- Response: Updated donation object

### Delete Donation
- **DELETE** `/transactions/donation/:id`
- For material donations: reverts stock impact before deletion, then removes related stock movements
- Response: 204 No Content

### Enum tolerance (transactions)
- `paymentMethod`, `paymentStatus`, `donationKind`, `direction`, `donorType` accept uppercase values and common lowercase/FR aliases (e.g. `cash`/`espece`, `materiel`, `moral`, `physique`)

### Stock Adjustment
- **POST** `/transactions/adjustment`
- Body: `{ materialId, quantityDelta, description?, reference? }`
- Creates StockMovement (ADJUSTMENT) + updates Material stock
- Response: Created stock movement object

---

## 6. ACCOUNTING

### Get Journal Entries
- **GET** `/accounting/entries`
- Response: Array of journal entries with lines

### Get Journal Entry by ID
- **GET** `/accounting/entries/:id`
- Response: Journal entry with lines

### Create Journal Entry
- **POST** `/accounting/entries`
- Body: `{ fiscalYearId, date, journalType, description, pieceNumber?, sourceType?, sourceId?, lines: [{ accountId, debit?, credit?, description? }] }`
- Validation: Debit total must equal credit total, min 2 lines
- Response: Created journal entry

### Update Journal Entry
- **PUT** `/accounting/entries/:id`
- Body: Any updatable fields from create payload (`fiscalYearId`, `date`, `journalType`, `description`, `pieceNumber`, `sourceType`, `sourceId`, `lines`)
- Validation: Cannot update validated entries; if `lines` are provided, debit total must equal credit total and min 2 lines
- Response: Updated journal entry

### Validate Journal Entry
- **PUT** `/accounting/entries/:id/validate`
- Marks entry as validated (can only delete unvalidated entries)
- Response: Updated entry

### Delete Journal Entry
- **DELETE** `/accounting/entries/:id`
- Only unvalidated entries can be deleted
- Logs to DeletedItem for audit trail
- Response: 204 No Content

### Get Trial Balance
- **GET** `/accounting/trial-balance?fiscalYearId=<id>`
- Response: Array of accounts with total debits and credits

### Get Account Balances
- **GET** `/accounting/account-balances?fiscalYearId=<id>`
- Response: Array of accounts with calculated balances

### Get General Ledger (for an account)
- **GET** `/accounting/general-ledger?accountId=<id>&fiscalYearId=<id>`
- Response: Account detail with running balance for each transaction

### Get Balance Sheet
- **GET** `/accounting/balance-sheet?fiscalYearId=<id>`
- Response: Assets, Liabilities, Equity with totals

### Get Income Statement
- **GET** `/accounting/income-statement?fiscalYearId=<id>`
- Response: Revenues, Expenses with net income

### Get Cash Journal
- **GET** `/accounting/cash-journal?fiscalYearId=<id>`
- Response: All cash transactions (JOURNAL_TYPE = CASH)

### Alias Module Comptabilite (meme endpoints)
- Base alias: `/comptabilite`
- Exemples:
  - **PUT** `/comptabilite/entries/:id` (modifier une ecriture)
  - **DELETE** `/comptabilite/entries/:id` (supprimer une ecriture non validee)
  - **GET** `/comptabilite/trial-balance?fiscalYearId=<id>`
- Notes: cet alias pointe sur la meme logique que `/accounting`.

---

## 7. REPORTS

### Daily Report
- **GET** `/reports/daily?date=<YYYY-MM-DD>`
- Shows all transactions for a specific date (defaults to today)
- Response: Sales, purchases, donations, loans, returns counts + details

### Alias Module Rapport (meme endpoints)
- **GET** `/rapport/daily?date=<YYYY-MM-DD>`
- **GET** `/rapport/donors`
- **GET** `/rapport/most-borrowed?limit=10`
- **GET** `/rapport/inventory`
- Notes: cet alias pointe sur la meme logique que `/reports`.

### Donors Report
- **GET** `/reports/donors`
- Response: List of donors sorted by number of donations
- Includes: total donations, financial total, material total, last donation date

### Most Borrowed Materials
- **GET** `/reports/most-borrowed?limit=10`
- Response: Top N most borrowed materials with statistics

### Inventory Report
- **GET** `/reports/inventory`
- Response: Inventory summary (by type, total, low stock, out of stock) + item details

---

## 8. DELETED ITEMS (Corbeille) - Protected

Toutes les routes de cette section exigent:
```
Authorization: Bearer <refreshToken>
```

### List Deleted Items
- **GET** `/deleted-items`
- Query params:
  - `includeRestored=true|false` (default: `false`)
  - `includeExpired=true|false` (default: `false`)
  - `table=<originalTable>` (ex: `Person`, `Material`, `JournalEntry`)
  - `limit=<1..500>` (default: `100`)
- Response: Array of DeletedItem records

### Restore Deleted Item
- **POST** `/deleted-items/:id/restore`
- Restores supported records:
  - `Person` (annule le soft delete)
  - `Material` (annule le soft delete)
  - `JournalEntry` (recreation de l'ecriture + lignes)
- Constraints:
  - Fails if item already restored
  - Fails if item is expired (delai depasse)
- Response: Updated DeletedItem (with `restoredAt`, `restoredById`)

### Delete One Deleted Item (hard delete in audit table)
- **DELETE** `/deleted-items/:id`
- Removes one record from `DeletedItem`
- Response: 204 No Content

### Purge Expired Deleted Items
- **DELETE** `/deleted-items/purge-expired`
- Removes all `DeletedItem` with `expiresAt <= now`
- Response: `{ deletedCount }`

### Alias Module Corbeille (meme endpoints)
- **GET** `/corbeille`
- **POST** `/corbeille/:id/restore`
- **DELETE** `/corbeille/:id`
- **DELETE** `/corbeille/purge-expired`

---

## Error Handling

All endpoints return error responses in this format:
```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: OK
- `201`: Created
- `204`: No Content (successful delete)
- `400`: Bad Request (validation error)
- `401`: Unauthorized (authentication required/failed)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `409`: Conflict (e.g., duplicate email)
- `500`: Internal Server Error
- `501`: Not Implemented

---

## Authentication

Protected endpoints require the `Authorization` header:
```
Authorization: Bearer <refreshToken>
```

The refresh token is obtained from login/register endpoints.

---

## Key Business Rules

1. **Loans**: Max 3 books per loan, only BOOK type materials
2. **Stock**: All stock movements are tracked in `StockMovement` table
3. **Accounting**: Journal entries must be balanced (debit = credit)
4. **Soft Delete**: All deletions use soft delete with 30-day retention
5. **Fiscal Year**: Must not be closed to accept new entries
6. **Role-Based Access**: (Not implemented yet, can be added to auth middleware)

---

## Data Models Summary

- **User**: Authentication + profile
- **Person**: Persons (visitors, borrowers, buyers, donors, suppliers)
- **Material**: Inventory items
- **StockMovement**: All stock transactions audit trail
- **Loan/LoanItem**: Book borrowing with return tracking
- **Sale/SaleItem**: Sales transactions
- **Purchase/PurchaseItem**: Purchase transactions
- **Donation/DonationItem**: Material and financial donations
- **JournalEntry/JournalLine**: Accounting double-entry records
- **Account**: Chart of accounts
- **FiscalYear**: Accounting periods
- **Session**: User authentication sessions
- **DeletedItem**: Soft-deleted items audit trail

---

Generated: February 19, 2026
