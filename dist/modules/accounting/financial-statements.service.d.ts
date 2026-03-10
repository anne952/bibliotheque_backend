export declare class FinancialStatementsService {
    private static ensureTemplateTable;
    private static ensureTemplateSeeded;
    private static getTemplateLines;
    private static sumByPrefixes;
    private static computeDirectAmount;
    private static getBalancesForFiscalYear;
    private static resolvePreviousFiscalYearId;
    private static computeLines;
    static getIncomeStatementV2(fiscalYearId: string): Promise<{
        fiscalYearId: string;
        previousFiscalYearId: string | null;
        structure: {
            rowOrder: number;
            ref: string | null;
            libelle: string;
            note: string | null;
            signe: string | null;
            isTitle: boolean;
            exercice: {
                n: number | null;
                n1: number | null;
            };
        }[];
        chiffres: {
            resultatNet: number;
        };
    }>;
    static getBalanceSheetV2(fiscalYearId: string): Promise<{
        fiscalYearId: string;
        previousFiscalYearId: string | null;
        structure: {
            rowOrder: number;
            actif: {
                ref: string | null;
                libelle: string;
                note: string | null;
                isTitle: boolean;
                exercice: {
                    n: number | null;
                    n1: number | null;
                };
            };
            passif: {
                ref: string | null;
                libelle: string;
                note: string | null;
                isTitle: boolean;
                exercice: {
                    n: number | null;
                    n1: number | null;
                };
            } | null;
        }[];
        chiffres: {
            totalActif: number;
            totalPassif: number;
            ecart: number;
        };
    }>;
    static getFinancialStatementsPackage(fiscalYearId: string): Promise<{
        fiscalYearId: string;
        compteResultat: {
            fiscalYearId: string;
            previousFiscalYearId: string | null;
            structure: {
                rowOrder: number;
                ref: string | null;
                libelle: string;
                note: string | null;
                signe: string | null;
                isTitle: boolean;
                exercice: {
                    n: number | null;
                    n1: number | null;
                };
            }[];
            chiffres: {
                resultatNet: number;
            };
        };
        bilan: {
            fiscalYearId: string;
            previousFiscalYearId: string | null;
            structure: {
                rowOrder: number;
                actif: {
                    ref: string | null;
                    libelle: string;
                    note: string | null;
                    isTitle: boolean;
                    exercice: {
                        n: number | null;
                        n1: number | null;
                    };
                };
                passif: {
                    ref: string | null;
                    libelle: string;
                    note: string | null;
                    isTitle: boolean;
                    exercice: {
                        n: number | null;
                        n1: number | null;
                    };
                } | null;
            }[];
            chiffres: {
                totalActif: number;
                totalPassif: number;
                ecart: number;
            };
        };
    }>;
}
//# sourceMappingURL=financial-statements.service.d.ts.map