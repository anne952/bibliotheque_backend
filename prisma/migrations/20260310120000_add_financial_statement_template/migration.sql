CREATE TABLE IF NOT EXISTS "financial_statement_template_lines" (
    "id" TEXT NOT NULL,
    "statementType" TEXT NOT NULL,
    "statementSide" TEXT NOT NULL,
    "rowOrder" INTEGER NOT NULL,
    "ref" TEXT,
    "label" TEXT NOT NULL,
    "note" TEXT,
    "sign" TEXT,
    "accountPrefixes" JSONB,
    "formula" TEXT,
    "isTitle" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_statement_template_lines_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "financial_statement_template_lines_statementType_statementSide_rowOrder_key"
ON "financial_statement_template_lines"("statementType", "statementSide", "rowOrder");

CREATE INDEX IF NOT EXISTS "financial_statement_template_lines_statementType_statementSide_rowOrder_idx"
ON "financial_statement_template_lines"("statementType", "statementSide", "rowOrder");
