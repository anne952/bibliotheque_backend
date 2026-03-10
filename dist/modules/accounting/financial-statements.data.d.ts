export type TemplateStatementType = "INCOME_STATEMENT" | "BALANCE_SHEET";
export type TemplateStatementSide = "MAIN" | "ACTIF" | "PASSIF";
export type FinancialTemplateSeedLine = {
    statementType: TemplateStatementType;
    statementSide: TemplateStatementSide;
    rowOrder: number;
    ref: string | null;
    label: string;
    note: string | null;
    sign: string | null;
    accountPrefixes: string[];
    formula: string | null;
    isTitle: boolean;
};
export declare const FINANCIAL_TEMPLATE_SEED_LINES: FinancialTemplateSeedLine[];
//# sourceMappingURL=financial-statements.data.d.ts.map