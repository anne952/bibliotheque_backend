import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model FinancialStatementTemplateLine
 *
 */
export type FinancialStatementTemplateLineModel = runtime.Types.Result.DefaultSelection<Prisma.$FinancialStatementTemplateLinePayload>;
export type AggregateFinancialStatementTemplateLine = {
    _count: FinancialStatementTemplateLineCountAggregateOutputType | null;
    _avg: FinancialStatementTemplateLineAvgAggregateOutputType | null;
    _sum: FinancialStatementTemplateLineSumAggregateOutputType | null;
    _min: FinancialStatementTemplateLineMinAggregateOutputType | null;
    _max: FinancialStatementTemplateLineMaxAggregateOutputType | null;
};
export type FinancialStatementTemplateLineAvgAggregateOutputType = {
    rowOrder: number | null;
};
export type FinancialStatementTemplateLineSumAggregateOutputType = {
    rowOrder: number | null;
};
export type FinancialStatementTemplateLineMinAggregateOutputType = {
    id: string | null;
    statementType: string | null;
    statementSide: string | null;
    rowOrder: number | null;
    ref: string | null;
    label: string | null;
    note: string | null;
    sign: string | null;
    formula: string | null;
    isTitle: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FinancialStatementTemplateLineMaxAggregateOutputType = {
    id: string | null;
    statementType: string | null;
    statementSide: string | null;
    rowOrder: number | null;
    ref: string | null;
    label: string | null;
    note: string | null;
    sign: string | null;
    formula: string | null;
    isTitle: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FinancialStatementTemplateLineCountAggregateOutputType = {
    id: number;
    statementType: number;
    statementSide: number;
    rowOrder: number;
    ref: number;
    label: number;
    note: number;
    sign: number;
    accountPrefixes: number;
    formula: number;
    isTitle: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FinancialStatementTemplateLineAvgAggregateInputType = {
    rowOrder?: true;
};
export type FinancialStatementTemplateLineSumAggregateInputType = {
    rowOrder?: true;
};
export type FinancialStatementTemplateLineMinAggregateInputType = {
    id?: true;
    statementType?: true;
    statementSide?: true;
    rowOrder?: true;
    ref?: true;
    label?: true;
    note?: true;
    sign?: true;
    formula?: true;
    isTitle?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FinancialStatementTemplateLineMaxAggregateInputType = {
    id?: true;
    statementType?: true;
    statementSide?: true;
    rowOrder?: true;
    ref?: true;
    label?: true;
    note?: true;
    sign?: true;
    formula?: true;
    isTitle?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FinancialStatementTemplateLineCountAggregateInputType = {
    id?: true;
    statementType?: true;
    statementSide?: true;
    rowOrder?: true;
    ref?: true;
    label?: true;
    note?: true;
    sign?: true;
    accountPrefixes?: true;
    formula?: true;
    isTitle?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FinancialStatementTemplateLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialStatementTemplateLine to aggregate.
     */
    where?: Prisma.FinancialStatementTemplateLineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FinancialStatementTemplateLines to fetch.
     */
    orderBy?: Prisma.FinancialStatementTemplateLineOrderByWithRelationInput | Prisma.FinancialStatementTemplateLineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FinancialStatementTemplateLineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FinancialStatementTemplateLines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FinancialStatementTemplateLines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FinancialStatementTemplateLines
    **/
    _count?: true | FinancialStatementTemplateLineCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FinancialStatementTemplateLineAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FinancialStatementTemplateLineSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FinancialStatementTemplateLineMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FinancialStatementTemplateLineMaxAggregateInputType;
};
export type GetFinancialStatementTemplateLineAggregateType<T extends FinancialStatementTemplateLineAggregateArgs> = {
    [P in keyof T & keyof AggregateFinancialStatementTemplateLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFinancialStatementTemplateLine[P]> : Prisma.GetScalarType<T[P], AggregateFinancialStatementTemplateLine[P]>;
};
export type FinancialStatementTemplateLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinancialStatementTemplateLineWhereInput;
    orderBy?: Prisma.FinancialStatementTemplateLineOrderByWithAggregationInput | Prisma.FinancialStatementTemplateLineOrderByWithAggregationInput[];
    by: Prisma.FinancialStatementTemplateLineScalarFieldEnum[] | Prisma.FinancialStatementTemplateLineScalarFieldEnum;
    having?: Prisma.FinancialStatementTemplateLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FinancialStatementTemplateLineCountAggregateInputType | true;
    _avg?: FinancialStatementTemplateLineAvgAggregateInputType;
    _sum?: FinancialStatementTemplateLineSumAggregateInputType;
    _min?: FinancialStatementTemplateLineMinAggregateInputType;
    _max?: FinancialStatementTemplateLineMaxAggregateInputType;
};
export type FinancialStatementTemplateLineGroupByOutputType = {
    id: string;
    statementType: string;
    statementSide: string;
    rowOrder: number;
    ref: string | null;
    label: string;
    note: string | null;
    sign: string | null;
    accountPrefixes: runtime.JsonValue | null;
    formula: string | null;
    isTitle: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: FinancialStatementTemplateLineCountAggregateOutputType | null;
    _avg: FinancialStatementTemplateLineAvgAggregateOutputType | null;
    _sum: FinancialStatementTemplateLineSumAggregateOutputType | null;
    _min: FinancialStatementTemplateLineMinAggregateOutputType | null;
    _max: FinancialStatementTemplateLineMaxAggregateOutputType | null;
};
type GetFinancialStatementTemplateLineGroupByPayload<T extends FinancialStatementTemplateLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FinancialStatementTemplateLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FinancialStatementTemplateLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FinancialStatementTemplateLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FinancialStatementTemplateLineGroupByOutputType[P]>;
}>>;
export type FinancialStatementTemplateLineWhereInput = {
    AND?: Prisma.FinancialStatementTemplateLineWhereInput | Prisma.FinancialStatementTemplateLineWhereInput[];
    OR?: Prisma.FinancialStatementTemplateLineWhereInput[];
    NOT?: Prisma.FinancialStatementTemplateLineWhereInput | Prisma.FinancialStatementTemplateLineWhereInput[];
    id?: Prisma.StringFilter<"FinancialStatementTemplateLine"> | string;
    statementType?: Prisma.StringFilter<"FinancialStatementTemplateLine"> | string;
    statementSide?: Prisma.StringFilter<"FinancialStatementTemplateLine"> | string;
    rowOrder?: Prisma.IntFilter<"FinancialStatementTemplateLine"> | number;
    ref?: Prisma.StringNullableFilter<"FinancialStatementTemplateLine"> | string | null;
    label?: Prisma.StringFilter<"FinancialStatementTemplateLine"> | string;
    note?: Prisma.StringNullableFilter<"FinancialStatementTemplateLine"> | string | null;
    sign?: Prisma.StringNullableFilter<"FinancialStatementTemplateLine"> | string | null;
    accountPrefixes?: Prisma.JsonNullableFilter<"FinancialStatementTemplateLine">;
    formula?: Prisma.StringNullableFilter<"FinancialStatementTemplateLine"> | string | null;
    isTitle?: Prisma.BoolFilter<"FinancialStatementTemplateLine"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FinancialStatementTemplateLine"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FinancialStatementTemplateLine"> | Date | string;
};
export type FinancialStatementTemplateLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    statementType?: Prisma.SortOrder;
    statementSide?: Prisma.SortOrder;
    rowOrder?: Prisma.SortOrder;
    ref?: Prisma.SortOrderInput | Prisma.SortOrder;
    label?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    sign?: Prisma.SortOrderInput | Prisma.SortOrder;
    accountPrefixes?: Prisma.SortOrderInput | Prisma.SortOrder;
    formula?: Prisma.SortOrderInput | Prisma.SortOrder;
    isTitle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FinancialStatementTemplateLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    statementType_statementSide_rowOrder?: Prisma.FinancialStatementTemplateLineStatementTypeStatementSideRowOrderCompoundUniqueInput;
    AND?: Prisma.FinancialStatementTemplateLineWhereInput | Prisma.FinancialStatementTemplateLineWhereInput[];
    OR?: Prisma.FinancialStatementTemplateLineWhereInput[];
    NOT?: Prisma.FinancialStatementTemplateLineWhereInput | Prisma.FinancialStatementTemplateLineWhereInput[];
    statementType?: Prisma.StringFilter<"FinancialStatementTemplateLine"> | string;
    statementSide?: Prisma.StringFilter<"FinancialStatementTemplateLine"> | string;
    rowOrder?: Prisma.IntFilter<"FinancialStatementTemplateLine"> | number;
    ref?: Prisma.StringNullableFilter<"FinancialStatementTemplateLine"> | string | null;
    label?: Prisma.StringFilter<"FinancialStatementTemplateLine"> | string;
    note?: Prisma.StringNullableFilter<"FinancialStatementTemplateLine"> | string | null;
    sign?: Prisma.StringNullableFilter<"FinancialStatementTemplateLine"> | string | null;
    accountPrefixes?: Prisma.JsonNullableFilter<"FinancialStatementTemplateLine">;
    formula?: Prisma.StringNullableFilter<"FinancialStatementTemplateLine"> | string | null;
    isTitle?: Prisma.BoolFilter<"FinancialStatementTemplateLine"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FinancialStatementTemplateLine"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FinancialStatementTemplateLine"> | Date | string;
}, "id" | "statementType_statementSide_rowOrder">;
export type FinancialStatementTemplateLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    statementType?: Prisma.SortOrder;
    statementSide?: Prisma.SortOrder;
    rowOrder?: Prisma.SortOrder;
    ref?: Prisma.SortOrderInput | Prisma.SortOrder;
    label?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    sign?: Prisma.SortOrderInput | Prisma.SortOrder;
    accountPrefixes?: Prisma.SortOrderInput | Prisma.SortOrder;
    formula?: Prisma.SortOrderInput | Prisma.SortOrder;
    isTitle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FinancialStatementTemplateLineCountOrderByAggregateInput;
    _avg?: Prisma.FinancialStatementTemplateLineAvgOrderByAggregateInput;
    _max?: Prisma.FinancialStatementTemplateLineMaxOrderByAggregateInput;
    _min?: Prisma.FinancialStatementTemplateLineMinOrderByAggregateInput;
    _sum?: Prisma.FinancialStatementTemplateLineSumOrderByAggregateInput;
};
export type FinancialStatementTemplateLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.FinancialStatementTemplateLineScalarWhereWithAggregatesInput | Prisma.FinancialStatementTemplateLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.FinancialStatementTemplateLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FinancialStatementTemplateLineScalarWhereWithAggregatesInput | Prisma.FinancialStatementTemplateLineScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FinancialStatementTemplateLine"> | string;
    statementType?: Prisma.StringWithAggregatesFilter<"FinancialStatementTemplateLine"> | string;
    statementSide?: Prisma.StringWithAggregatesFilter<"FinancialStatementTemplateLine"> | string;
    rowOrder?: Prisma.IntWithAggregatesFilter<"FinancialStatementTemplateLine"> | number;
    ref?: Prisma.StringNullableWithAggregatesFilter<"FinancialStatementTemplateLine"> | string | null;
    label?: Prisma.StringWithAggregatesFilter<"FinancialStatementTemplateLine"> | string;
    note?: Prisma.StringNullableWithAggregatesFilter<"FinancialStatementTemplateLine"> | string | null;
    sign?: Prisma.StringNullableWithAggregatesFilter<"FinancialStatementTemplateLine"> | string | null;
    accountPrefixes?: Prisma.JsonNullableWithAggregatesFilter<"FinancialStatementTemplateLine">;
    formula?: Prisma.StringNullableWithAggregatesFilter<"FinancialStatementTemplateLine"> | string | null;
    isTitle?: Prisma.BoolWithAggregatesFilter<"FinancialStatementTemplateLine"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FinancialStatementTemplateLine"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FinancialStatementTemplateLine"> | Date | string;
};
export type FinancialStatementTemplateLineCreateInput = {
    id: string;
    statementType: string;
    statementSide: string;
    rowOrder: number;
    ref?: string | null;
    label: string;
    note?: string | null;
    sign?: string | null;
    accountPrefixes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    formula?: string | null;
    isTitle?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FinancialStatementTemplateLineUncheckedCreateInput = {
    id: string;
    statementType: string;
    statementSide: string;
    rowOrder: number;
    ref?: string | null;
    label: string;
    note?: string | null;
    sign?: string | null;
    accountPrefixes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    formula?: string | null;
    isTitle?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FinancialStatementTemplateLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statementType?: Prisma.StringFieldUpdateOperationsInput | string;
    statementSide?: Prisma.StringFieldUpdateOperationsInput | string;
    rowOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    ref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sign?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountPrefixes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isTitle?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialStatementTemplateLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statementType?: Prisma.StringFieldUpdateOperationsInput | string;
    statementSide?: Prisma.StringFieldUpdateOperationsInput | string;
    rowOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    ref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sign?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountPrefixes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isTitle?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialStatementTemplateLineCreateManyInput = {
    id: string;
    statementType: string;
    statementSide: string;
    rowOrder: number;
    ref?: string | null;
    label: string;
    note?: string | null;
    sign?: string | null;
    accountPrefixes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    formula?: string | null;
    isTitle?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FinancialStatementTemplateLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statementType?: Prisma.StringFieldUpdateOperationsInput | string;
    statementSide?: Prisma.StringFieldUpdateOperationsInput | string;
    rowOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    ref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sign?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountPrefixes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isTitle?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialStatementTemplateLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statementType?: Prisma.StringFieldUpdateOperationsInput | string;
    statementSide?: Prisma.StringFieldUpdateOperationsInput | string;
    rowOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    ref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sign?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountPrefixes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    formula?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isTitle?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialStatementTemplateLineStatementTypeStatementSideRowOrderCompoundUniqueInput = {
    statementType: string;
    statementSide: string;
    rowOrder: number;
};
export type FinancialStatementTemplateLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    statementType?: Prisma.SortOrder;
    statementSide?: Prisma.SortOrder;
    rowOrder?: Prisma.SortOrder;
    ref?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    sign?: Prisma.SortOrder;
    accountPrefixes?: Prisma.SortOrder;
    formula?: Prisma.SortOrder;
    isTitle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FinancialStatementTemplateLineAvgOrderByAggregateInput = {
    rowOrder?: Prisma.SortOrder;
};
export type FinancialStatementTemplateLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    statementType?: Prisma.SortOrder;
    statementSide?: Prisma.SortOrder;
    rowOrder?: Prisma.SortOrder;
    ref?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    sign?: Prisma.SortOrder;
    formula?: Prisma.SortOrder;
    isTitle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FinancialStatementTemplateLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    statementType?: Prisma.SortOrder;
    statementSide?: Prisma.SortOrder;
    rowOrder?: Prisma.SortOrder;
    ref?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    sign?: Prisma.SortOrder;
    formula?: Prisma.SortOrder;
    isTitle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FinancialStatementTemplateLineSumOrderByAggregateInput = {
    rowOrder?: Prisma.SortOrder;
};
export type FinancialStatementTemplateLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    statementType?: boolean;
    statementSide?: boolean;
    rowOrder?: boolean;
    ref?: boolean;
    label?: boolean;
    note?: boolean;
    sign?: boolean;
    accountPrefixes?: boolean;
    formula?: boolean;
    isTitle?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["financialStatementTemplateLine"]>;
export type FinancialStatementTemplateLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    statementType?: boolean;
    statementSide?: boolean;
    rowOrder?: boolean;
    ref?: boolean;
    label?: boolean;
    note?: boolean;
    sign?: boolean;
    accountPrefixes?: boolean;
    formula?: boolean;
    isTitle?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["financialStatementTemplateLine"]>;
export type FinancialStatementTemplateLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    statementType?: boolean;
    statementSide?: boolean;
    rowOrder?: boolean;
    ref?: boolean;
    label?: boolean;
    note?: boolean;
    sign?: boolean;
    accountPrefixes?: boolean;
    formula?: boolean;
    isTitle?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["financialStatementTemplateLine"]>;
export type FinancialStatementTemplateLineSelectScalar = {
    id?: boolean;
    statementType?: boolean;
    statementSide?: boolean;
    rowOrder?: boolean;
    ref?: boolean;
    label?: boolean;
    note?: boolean;
    sign?: boolean;
    accountPrefixes?: boolean;
    formula?: boolean;
    isTitle?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FinancialStatementTemplateLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "statementType" | "statementSide" | "rowOrder" | "ref" | "label" | "note" | "sign" | "accountPrefixes" | "formula" | "isTitle" | "createdAt" | "updatedAt", ExtArgs["result"]["financialStatementTemplateLine"]>;
export type $FinancialStatementTemplateLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FinancialStatementTemplateLine";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        statementType: string;
        statementSide: string;
        rowOrder: number;
        ref: string | null;
        label: string;
        note: string | null;
        sign: string | null;
        accountPrefixes: runtime.JsonValue | null;
        formula: string | null;
        isTitle: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["financialStatementTemplateLine"]>;
    composites: {};
};
export type FinancialStatementTemplateLineGetPayload<S extends boolean | null | undefined | FinancialStatementTemplateLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload, S>;
export type FinancialStatementTemplateLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FinancialStatementTemplateLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FinancialStatementTemplateLineCountAggregateInputType | true;
};
export interface FinancialStatementTemplateLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FinancialStatementTemplateLine'];
        meta: {
            name: 'FinancialStatementTemplateLine';
        };
    };
    /**
     * Find zero or one FinancialStatementTemplateLine that matches the filter.
     * @param {FinancialStatementTemplateLineFindUniqueArgs} args - Arguments to find a FinancialStatementTemplateLine
     * @example
     * // Get one FinancialStatementTemplateLine
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinancialStatementTemplateLineFindUniqueArgs>(args: Prisma.SelectSubset<T, FinancialStatementTemplateLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FinancialStatementTemplateLineClient<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FinancialStatementTemplateLine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FinancialStatementTemplateLineFindUniqueOrThrowArgs} args - Arguments to find a FinancialStatementTemplateLine
     * @example
     * // Get one FinancialStatementTemplateLine
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinancialStatementTemplateLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FinancialStatementTemplateLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinancialStatementTemplateLineClient<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FinancialStatementTemplateLine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialStatementTemplateLineFindFirstArgs} args - Arguments to find a FinancialStatementTemplateLine
     * @example
     * // Get one FinancialStatementTemplateLine
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinancialStatementTemplateLineFindFirstArgs>(args?: Prisma.SelectSubset<T, FinancialStatementTemplateLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__FinancialStatementTemplateLineClient<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FinancialStatementTemplateLine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialStatementTemplateLineFindFirstOrThrowArgs} args - Arguments to find a FinancialStatementTemplateLine
     * @example
     * // Get one FinancialStatementTemplateLine
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinancialStatementTemplateLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FinancialStatementTemplateLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinancialStatementTemplateLineClient<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FinancialStatementTemplateLines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialStatementTemplateLineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FinancialStatementTemplateLines
     * const financialStatementTemplateLines = await prisma.financialStatementTemplateLine.findMany()
     *
     * // Get first 10 FinancialStatementTemplateLines
     * const financialStatementTemplateLines = await prisma.financialStatementTemplateLine.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const financialStatementTemplateLineWithIdOnly = await prisma.financialStatementTemplateLine.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FinancialStatementTemplateLineFindManyArgs>(args?: Prisma.SelectSubset<T, FinancialStatementTemplateLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FinancialStatementTemplateLine.
     * @param {FinancialStatementTemplateLineCreateArgs} args - Arguments to create a FinancialStatementTemplateLine.
     * @example
     * // Create one FinancialStatementTemplateLine
     * const FinancialStatementTemplateLine = await prisma.financialStatementTemplateLine.create({
     *   data: {
     *     // ... data to create a FinancialStatementTemplateLine
     *   }
     * })
     *
     */
    create<T extends FinancialStatementTemplateLineCreateArgs>(args: Prisma.SelectSubset<T, FinancialStatementTemplateLineCreateArgs<ExtArgs>>): Prisma.Prisma__FinancialStatementTemplateLineClient<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FinancialStatementTemplateLines.
     * @param {FinancialStatementTemplateLineCreateManyArgs} args - Arguments to create many FinancialStatementTemplateLines.
     * @example
     * // Create many FinancialStatementTemplateLines
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FinancialStatementTemplateLineCreateManyArgs>(args?: Prisma.SelectSubset<T, FinancialStatementTemplateLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FinancialStatementTemplateLines and returns the data saved in the database.
     * @param {FinancialStatementTemplateLineCreateManyAndReturnArgs} args - Arguments to create many FinancialStatementTemplateLines.
     * @example
     * // Create many FinancialStatementTemplateLines
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FinancialStatementTemplateLines and only return the `id`
     * const financialStatementTemplateLineWithIdOnly = await prisma.financialStatementTemplateLine.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FinancialStatementTemplateLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FinancialStatementTemplateLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FinancialStatementTemplateLine.
     * @param {FinancialStatementTemplateLineDeleteArgs} args - Arguments to delete one FinancialStatementTemplateLine.
     * @example
     * // Delete one FinancialStatementTemplateLine
     * const FinancialStatementTemplateLine = await prisma.financialStatementTemplateLine.delete({
     *   where: {
     *     // ... filter to delete one FinancialStatementTemplateLine
     *   }
     * })
     *
     */
    delete<T extends FinancialStatementTemplateLineDeleteArgs>(args: Prisma.SelectSubset<T, FinancialStatementTemplateLineDeleteArgs<ExtArgs>>): Prisma.Prisma__FinancialStatementTemplateLineClient<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FinancialStatementTemplateLine.
     * @param {FinancialStatementTemplateLineUpdateArgs} args - Arguments to update one FinancialStatementTemplateLine.
     * @example
     * // Update one FinancialStatementTemplateLine
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FinancialStatementTemplateLineUpdateArgs>(args: Prisma.SelectSubset<T, FinancialStatementTemplateLineUpdateArgs<ExtArgs>>): Prisma.Prisma__FinancialStatementTemplateLineClient<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FinancialStatementTemplateLines.
     * @param {FinancialStatementTemplateLineDeleteManyArgs} args - Arguments to filter FinancialStatementTemplateLines to delete.
     * @example
     * // Delete a few FinancialStatementTemplateLines
     * const { count } = await prisma.financialStatementTemplateLine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FinancialStatementTemplateLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, FinancialStatementTemplateLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FinancialStatementTemplateLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialStatementTemplateLineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FinancialStatementTemplateLines
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FinancialStatementTemplateLineUpdateManyArgs>(args: Prisma.SelectSubset<T, FinancialStatementTemplateLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FinancialStatementTemplateLines and returns the data updated in the database.
     * @param {FinancialStatementTemplateLineUpdateManyAndReturnArgs} args - Arguments to update many FinancialStatementTemplateLines.
     * @example
     * // Update many FinancialStatementTemplateLines
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FinancialStatementTemplateLines and only return the `id`
     * const financialStatementTemplateLineWithIdOnly = await prisma.financialStatementTemplateLine.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends FinancialStatementTemplateLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FinancialStatementTemplateLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FinancialStatementTemplateLine.
     * @param {FinancialStatementTemplateLineUpsertArgs} args - Arguments to update or create a FinancialStatementTemplateLine.
     * @example
     * // Update or create a FinancialStatementTemplateLine
     * const financialStatementTemplateLine = await prisma.financialStatementTemplateLine.upsert({
     *   create: {
     *     // ... data to create a FinancialStatementTemplateLine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FinancialStatementTemplateLine we want to update
     *   }
     * })
     */
    upsert<T extends FinancialStatementTemplateLineUpsertArgs>(args: Prisma.SelectSubset<T, FinancialStatementTemplateLineUpsertArgs<ExtArgs>>): Prisma.Prisma__FinancialStatementTemplateLineClient<runtime.Types.Result.GetResult<Prisma.$FinancialStatementTemplateLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FinancialStatementTemplateLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialStatementTemplateLineCountArgs} args - Arguments to filter FinancialStatementTemplateLines to count.
     * @example
     * // Count the number of FinancialStatementTemplateLines
     * const count = await prisma.financialStatementTemplateLine.count({
     *   where: {
     *     // ... the filter for the FinancialStatementTemplateLines we want to count
     *   }
     * })
    **/
    count<T extends FinancialStatementTemplateLineCountArgs>(args?: Prisma.Subset<T, FinancialStatementTemplateLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FinancialStatementTemplateLineCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FinancialStatementTemplateLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialStatementTemplateLineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinancialStatementTemplateLineAggregateArgs>(args: Prisma.Subset<T, FinancialStatementTemplateLineAggregateArgs>): Prisma.PrismaPromise<GetFinancialStatementTemplateLineAggregateType<T>>;
    /**
     * Group by FinancialStatementTemplateLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialStatementTemplateLineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends FinancialStatementTemplateLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FinancialStatementTemplateLineGroupByArgs['orderBy'];
    } : {
        orderBy?: FinancialStatementTemplateLineGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FinancialStatementTemplateLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinancialStatementTemplateLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FinancialStatementTemplateLine model
     */
    readonly fields: FinancialStatementTemplateLineFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FinancialStatementTemplateLine.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FinancialStatementTemplateLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the FinancialStatementTemplateLine model
 */
export interface FinancialStatementTemplateLineFieldRefs {
    readonly id: Prisma.FieldRef<"FinancialStatementTemplateLine", 'String'>;
    readonly statementType: Prisma.FieldRef<"FinancialStatementTemplateLine", 'String'>;
    readonly statementSide: Prisma.FieldRef<"FinancialStatementTemplateLine", 'String'>;
    readonly rowOrder: Prisma.FieldRef<"FinancialStatementTemplateLine", 'Int'>;
    readonly ref: Prisma.FieldRef<"FinancialStatementTemplateLine", 'String'>;
    readonly label: Prisma.FieldRef<"FinancialStatementTemplateLine", 'String'>;
    readonly note: Prisma.FieldRef<"FinancialStatementTemplateLine", 'String'>;
    readonly sign: Prisma.FieldRef<"FinancialStatementTemplateLine", 'String'>;
    readonly accountPrefixes: Prisma.FieldRef<"FinancialStatementTemplateLine", 'Json'>;
    readonly formula: Prisma.FieldRef<"FinancialStatementTemplateLine", 'String'>;
    readonly isTitle: Prisma.FieldRef<"FinancialStatementTemplateLine", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"FinancialStatementTemplateLine", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FinancialStatementTemplateLine", 'DateTime'>;
}
/**
 * FinancialStatementTemplateLine findUnique
 */
export type FinancialStatementTemplateLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * Filter, which FinancialStatementTemplateLine to fetch.
     */
    where: Prisma.FinancialStatementTemplateLineWhereUniqueInput;
};
/**
 * FinancialStatementTemplateLine findUniqueOrThrow
 */
export type FinancialStatementTemplateLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * Filter, which FinancialStatementTemplateLine to fetch.
     */
    where: Prisma.FinancialStatementTemplateLineWhereUniqueInput;
};
/**
 * FinancialStatementTemplateLine findFirst
 */
export type FinancialStatementTemplateLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * Filter, which FinancialStatementTemplateLine to fetch.
     */
    where?: Prisma.FinancialStatementTemplateLineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FinancialStatementTemplateLines to fetch.
     */
    orderBy?: Prisma.FinancialStatementTemplateLineOrderByWithRelationInput | Prisma.FinancialStatementTemplateLineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FinancialStatementTemplateLines.
     */
    cursor?: Prisma.FinancialStatementTemplateLineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FinancialStatementTemplateLines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FinancialStatementTemplateLines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FinancialStatementTemplateLines.
     */
    distinct?: Prisma.FinancialStatementTemplateLineScalarFieldEnum | Prisma.FinancialStatementTemplateLineScalarFieldEnum[];
};
/**
 * FinancialStatementTemplateLine findFirstOrThrow
 */
export type FinancialStatementTemplateLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * Filter, which FinancialStatementTemplateLine to fetch.
     */
    where?: Prisma.FinancialStatementTemplateLineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FinancialStatementTemplateLines to fetch.
     */
    orderBy?: Prisma.FinancialStatementTemplateLineOrderByWithRelationInput | Prisma.FinancialStatementTemplateLineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FinancialStatementTemplateLines.
     */
    cursor?: Prisma.FinancialStatementTemplateLineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FinancialStatementTemplateLines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FinancialStatementTemplateLines.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FinancialStatementTemplateLines.
     */
    distinct?: Prisma.FinancialStatementTemplateLineScalarFieldEnum | Prisma.FinancialStatementTemplateLineScalarFieldEnum[];
};
/**
 * FinancialStatementTemplateLine findMany
 */
export type FinancialStatementTemplateLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * Filter, which FinancialStatementTemplateLines to fetch.
     */
    where?: Prisma.FinancialStatementTemplateLineWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FinancialStatementTemplateLines to fetch.
     */
    orderBy?: Prisma.FinancialStatementTemplateLineOrderByWithRelationInput | Prisma.FinancialStatementTemplateLineOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FinancialStatementTemplateLines.
     */
    cursor?: Prisma.FinancialStatementTemplateLineWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FinancialStatementTemplateLines from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FinancialStatementTemplateLines.
     */
    skip?: number;
    distinct?: Prisma.FinancialStatementTemplateLineScalarFieldEnum | Prisma.FinancialStatementTemplateLineScalarFieldEnum[];
};
/**
 * FinancialStatementTemplateLine create
 */
export type FinancialStatementTemplateLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * The data needed to create a FinancialStatementTemplateLine.
     */
    data: Prisma.XOR<Prisma.FinancialStatementTemplateLineCreateInput, Prisma.FinancialStatementTemplateLineUncheckedCreateInput>;
};
/**
 * FinancialStatementTemplateLine createMany
 */
export type FinancialStatementTemplateLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FinancialStatementTemplateLines.
     */
    data: Prisma.FinancialStatementTemplateLineCreateManyInput | Prisma.FinancialStatementTemplateLineCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FinancialStatementTemplateLine createManyAndReturn
 */
export type FinancialStatementTemplateLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * The data used to create many FinancialStatementTemplateLines.
     */
    data: Prisma.FinancialStatementTemplateLineCreateManyInput | Prisma.FinancialStatementTemplateLineCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FinancialStatementTemplateLine update
 */
export type FinancialStatementTemplateLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * The data needed to update a FinancialStatementTemplateLine.
     */
    data: Prisma.XOR<Prisma.FinancialStatementTemplateLineUpdateInput, Prisma.FinancialStatementTemplateLineUncheckedUpdateInput>;
    /**
     * Choose, which FinancialStatementTemplateLine to update.
     */
    where: Prisma.FinancialStatementTemplateLineWhereUniqueInput;
};
/**
 * FinancialStatementTemplateLine updateMany
 */
export type FinancialStatementTemplateLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FinancialStatementTemplateLines.
     */
    data: Prisma.XOR<Prisma.FinancialStatementTemplateLineUpdateManyMutationInput, Prisma.FinancialStatementTemplateLineUncheckedUpdateManyInput>;
    /**
     * Filter which FinancialStatementTemplateLines to update
     */
    where?: Prisma.FinancialStatementTemplateLineWhereInput;
    /**
     * Limit how many FinancialStatementTemplateLines to update.
     */
    limit?: number;
};
/**
 * FinancialStatementTemplateLine updateManyAndReturn
 */
export type FinancialStatementTemplateLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * The data used to update FinancialStatementTemplateLines.
     */
    data: Prisma.XOR<Prisma.FinancialStatementTemplateLineUpdateManyMutationInput, Prisma.FinancialStatementTemplateLineUncheckedUpdateManyInput>;
    /**
     * Filter which FinancialStatementTemplateLines to update
     */
    where?: Prisma.FinancialStatementTemplateLineWhereInput;
    /**
     * Limit how many FinancialStatementTemplateLines to update.
     */
    limit?: number;
};
/**
 * FinancialStatementTemplateLine upsert
 */
export type FinancialStatementTemplateLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * The filter to search for the FinancialStatementTemplateLine to update in case it exists.
     */
    where: Prisma.FinancialStatementTemplateLineWhereUniqueInput;
    /**
     * In case the FinancialStatementTemplateLine found by the `where` argument doesn't exist, create a new FinancialStatementTemplateLine with this data.
     */
    create: Prisma.XOR<Prisma.FinancialStatementTemplateLineCreateInput, Prisma.FinancialStatementTemplateLineUncheckedCreateInput>;
    /**
     * In case the FinancialStatementTemplateLine was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FinancialStatementTemplateLineUpdateInput, Prisma.FinancialStatementTemplateLineUncheckedUpdateInput>;
};
/**
 * FinancialStatementTemplateLine delete
 */
export type FinancialStatementTemplateLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
    /**
     * Filter which FinancialStatementTemplateLine to delete.
     */
    where: Prisma.FinancialStatementTemplateLineWhereUniqueInput;
};
/**
 * FinancialStatementTemplateLine deleteMany
 */
export type FinancialStatementTemplateLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialStatementTemplateLines to delete
     */
    where?: Prisma.FinancialStatementTemplateLineWhereInput;
    /**
     * Limit how many FinancialStatementTemplateLines to delete.
     */
    limit?: number;
};
/**
 * FinancialStatementTemplateLine without action
 */
export type FinancialStatementTemplateLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialStatementTemplateLine
     */
    select?: Prisma.FinancialStatementTemplateLineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FinancialStatementTemplateLine
     */
    omit?: Prisma.FinancialStatementTemplateLineOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FinancialStatementTemplateLine.d.ts.map