import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Material
 *
 */
export type MaterialModel = runtime.Types.Result.DefaultSelection<Prisma.$MaterialPayload>;
export type AggregateMaterial = {
    _count: MaterialCountAggregateOutputType | null;
    _avg: MaterialAvgAggregateOutputType | null;
    _sum: MaterialSumAggregateOutputType | null;
    _min: MaterialMinAggregateOutputType | null;
    _max: MaterialMaxAggregateOutputType | null;
};
export type MaterialAvgAggregateOutputType = {
    currentStock: number | null;
    minStockAlert: number | null;
    unitPrice: runtime.Decimal | null;
    sellingPrice: runtime.Decimal | null;
};
export type MaterialSumAggregateOutputType = {
    currentStock: number | null;
    minStockAlert: number | null;
    unitPrice: runtime.Decimal | null;
    sellingPrice: runtime.Decimal | null;
};
export type MaterialMinAggregateOutputType = {
    id: string | null;
    type: $Enums.MaterialType | null;
    name: string | null;
    reference: string | null;
    serialNumber: string | null;
    category: string | null;
    language: string | null;
    volume: string | null;
    status: $Enums.MaterialStatus | null;
    currentStock: number | null;
    minStockAlert: number | null;
    unitPrice: runtime.Decimal | null;
    sellingPrice: runtime.Decimal | null;
    location: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type MaterialMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.MaterialType | null;
    name: string | null;
    reference: string | null;
    serialNumber: string | null;
    category: string | null;
    language: string | null;
    volume: string | null;
    status: $Enums.MaterialStatus | null;
    currentStock: number | null;
    minStockAlert: number | null;
    unitPrice: runtime.Decimal | null;
    sellingPrice: runtime.Decimal | null;
    location: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type MaterialCountAggregateOutputType = {
    id: number;
    type: number;
    name: number;
    reference: number;
    serialNumber: number;
    category: number;
    language: number;
    volume: number;
    status: number;
    currentStock: number;
    minStockAlert: number;
    unitPrice: number;
    sellingPrice: number;
    location: number;
    description: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type MaterialAvgAggregateInputType = {
    currentStock?: true;
    minStockAlert?: true;
    unitPrice?: true;
    sellingPrice?: true;
};
export type MaterialSumAggregateInputType = {
    currentStock?: true;
    minStockAlert?: true;
    unitPrice?: true;
    sellingPrice?: true;
};
export type MaterialMinAggregateInputType = {
    id?: true;
    type?: true;
    name?: true;
    reference?: true;
    serialNumber?: true;
    category?: true;
    language?: true;
    volume?: true;
    status?: true;
    currentStock?: true;
    minStockAlert?: true;
    unitPrice?: true;
    sellingPrice?: true;
    location?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type MaterialMaxAggregateInputType = {
    id?: true;
    type?: true;
    name?: true;
    reference?: true;
    serialNumber?: true;
    category?: true;
    language?: true;
    volume?: true;
    status?: true;
    currentStock?: true;
    minStockAlert?: true;
    unitPrice?: true;
    sellingPrice?: true;
    location?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type MaterialCountAggregateInputType = {
    id?: true;
    type?: true;
    name?: true;
    reference?: true;
    serialNumber?: true;
    category?: true;
    language?: true;
    volume?: true;
    status?: true;
    currentStock?: true;
    minStockAlert?: true;
    unitPrice?: true;
    sellingPrice?: true;
    location?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type MaterialAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Material to aggregate.
     */
    where?: Prisma.MaterialWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Materials to fetch.
     */
    orderBy?: Prisma.MaterialOrderByWithRelationInput | Prisma.MaterialOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MaterialWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Materials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Materials
    **/
    _count?: true | MaterialCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MaterialAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MaterialSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MaterialMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MaterialMaxAggregateInputType;
};
export type GetMaterialAggregateType<T extends MaterialAggregateArgs> = {
    [P in keyof T & keyof AggregateMaterial]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaterial[P]> : Prisma.GetScalarType<T[P], AggregateMaterial[P]>;
};
export type MaterialGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaterialWhereInput;
    orderBy?: Prisma.MaterialOrderByWithAggregationInput | Prisma.MaterialOrderByWithAggregationInput[];
    by: Prisma.MaterialScalarFieldEnum[] | Prisma.MaterialScalarFieldEnum;
    having?: Prisma.MaterialScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaterialCountAggregateInputType | true;
    _avg?: MaterialAvgAggregateInputType;
    _sum?: MaterialSumAggregateInputType;
    _min?: MaterialMinAggregateInputType;
    _max?: MaterialMaxAggregateInputType;
};
export type MaterialGroupByOutputType = {
    id: string;
    type: $Enums.MaterialType;
    name: string;
    reference: string | null;
    serialNumber: string | null;
    category: string | null;
    language: string | null;
    volume: string | null;
    status: $Enums.MaterialStatus;
    currentStock: number;
    minStockAlert: number;
    unitPrice: runtime.Decimal | null;
    sellingPrice: runtime.Decimal | null;
    location: string | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: MaterialCountAggregateOutputType | null;
    _avg: MaterialAvgAggregateOutputType | null;
    _sum: MaterialSumAggregateOutputType | null;
    _min: MaterialMinAggregateOutputType | null;
    _max: MaterialMaxAggregateOutputType | null;
};
type GetMaterialGroupByPayload<T extends MaterialGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaterialGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaterialGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaterialGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaterialGroupByOutputType[P]>;
}>>;
export type MaterialWhereInput = {
    AND?: Prisma.MaterialWhereInput | Prisma.MaterialWhereInput[];
    OR?: Prisma.MaterialWhereInput[];
    NOT?: Prisma.MaterialWhereInput | Prisma.MaterialWhereInput[];
    id?: Prisma.StringFilter<"Material"> | string;
    type?: Prisma.EnumMaterialTypeFilter<"Material"> | $Enums.MaterialType;
    name?: Prisma.StringFilter<"Material"> | string;
    reference?: Prisma.StringNullableFilter<"Material"> | string | null;
    serialNumber?: Prisma.StringNullableFilter<"Material"> | string | null;
    category?: Prisma.StringNullableFilter<"Material"> | string | null;
    language?: Prisma.StringNullableFilter<"Material"> | string | null;
    volume?: Prisma.StringNullableFilter<"Material"> | string | null;
    status?: Prisma.EnumMaterialStatusFilter<"Material"> | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFilter<"Material"> | number;
    minStockAlert?: Prisma.IntFilter<"Material"> | number;
    unitPrice?: Prisma.DecimalNullableFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.DecimalNullableFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.StringNullableFilter<"Material"> | string | null;
    description?: Prisma.StringNullableFilter<"Material"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Material"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Material"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Material"> | Date | string | null;
    stockMovements?: Prisma.StockMovementListRelationFilter;
    loanItems?: Prisma.LoanItemListRelationFilter;
    saleItems?: Prisma.SaleItemListRelationFilter;
    purchaseItems?: Prisma.PurchaseItemListRelationFilter;
    donationItems?: Prisma.DonationItemListRelationFilter;
};
export type MaterialOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    language?: Prisma.SortOrderInput | Prisma.SortOrder;
    volume?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    minStockAlert?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    stockMovements?: Prisma.StockMovementOrderByRelationAggregateInput;
    loanItems?: Prisma.LoanItemOrderByRelationAggregateInput;
    saleItems?: Prisma.SaleItemOrderByRelationAggregateInput;
    purchaseItems?: Prisma.PurchaseItemOrderByRelationAggregateInput;
    donationItems?: Prisma.DonationItemOrderByRelationAggregateInput;
};
export type MaterialWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    reference?: string;
    serialNumber?: string;
    AND?: Prisma.MaterialWhereInput | Prisma.MaterialWhereInput[];
    OR?: Prisma.MaterialWhereInput[];
    NOT?: Prisma.MaterialWhereInput | Prisma.MaterialWhereInput[];
    type?: Prisma.EnumMaterialTypeFilter<"Material"> | $Enums.MaterialType;
    name?: Prisma.StringFilter<"Material"> | string;
    category?: Prisma.StringNullableFilter<"Material"> | string | null;
    language?: Prisma.StringNullableFilter<"Material"> | string | null;
    volume?: Prisma.StringNullableFilter<"Material"> | string | null;
    status?: Prisma.EnumMaterialStatusFilter<"Material"> | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFilter<"Material"> | number;
    minStockAlert?: Prisma.IntFilter<"Material"> | number;
    unitPrice?: Prisma.DecimalNullableFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.DecimalNullableFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.StringNullableFilter<"Material"> | string | null;
    description?: Prisma.StringNullableFilter<"Material"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Material"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Material"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Material"> | Date | string | null;
    stockMovements?: Prisma.StockMovementListRelationFilter;
    loanItems?: Prisma.LoanItemListRelationFilter;
    saleItems?: Prisma.SaleItemListRelationFilter;
    purchaseItems?: Prisma.PurchaseItemListRelationFilter;
    donationItems?: Prisma.DonationItemListRelationFilter;
}, "id" | "reference" | "serialNumber">;
export type MaterialOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    language?: Prisma.SortOrderInput | Prisma.SortOrder;
    volume?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    minStockAlert?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MaterialCountOrderByAggregateInput;
    _avg?: Prisma.MaterialAvgOrderByAggregateInput;
    _max?: Prisma.MaterialMaxOrderByAggregateInput;
    _min?: Prisma.MaterialMinOrderByAggregateInput;
    _sum?: Prisma.MaterialSumOrderByAggregateInput;
};
export type MaterialScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaterialScalarWhereWithAggregatesInput | Prisma.MaterialScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaterialScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaterialScalarWhereWithAggregatesInput | Prisma.MaterialScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Material"> | string;
    type?: Prisma.EnumMaterialTypeWithAggregatesFilter<"Material"> | $Enums.MaterialType;
    name?: Prisma.StringWithAggregatesFilter<"Material"> | string;
    reference?: Prisma.StringNullableWithAggregatesFilter<"Material"> | string | null;
    serialNumber?: Prisma.StringNullableWithAggregatesFilter<"Material"> | string | null;
    category?: Prisma.StringNullableWithAggregatesFilter<"Material"> | string | null;
    language?: Prisma.StringNullableWithAggregatesFilter<"Material"> | string | null;
    volume?: Prisma.StringNullableWithAggregatesFilter<"Material"> | string | null;
    status?: Prisma.EnumMaterialStatusWithAggregatesFilter<"Material"> | $Enums.MaterialStatus;
    currentStock?: Prisma.IntWithAggregatesFilter<"Material"> | number;
    minStockAlert?: Prisma.IntWithAggregatesFilter<"Material"> | number;
    unitPrice?: Prisma.DecimalNullableWithAggregatesFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.DecimalNullableWithAggregatesFilter<"Material"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.StringNullableWithAggregatesFilter<"Material"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"Material"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Material"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Material"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Material"> | Date | string | null;
};
export type MaterialCreateInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementCreateNestedManyWithoutMaterialInput;
    loanItems?: Prisma.LoanItemCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutMaterialInput;
    loanItems?: Prisma.LoanItemUncheckedCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemUncheckedCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUpdateManyWithoutMaterialNestedInput;
    loanItems?: Prisma.LoanItemUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedUpdateManyWithoutMaterialNestedInput;
    loanItems?: Prisma.LoanItemUncheckedUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUncheckedUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialCreateManyInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type MaterialUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MaterialUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MaterialCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    minStockAlert?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type MaterialAvgOrderByAggregateInput = {
    currentStock?: Prisma.SortOrder;
    minStockAlert?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
};
export type MaterialMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    minStockAlert?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type MaterialMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    volume?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    minStockAlert?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type MaterialSumOrderByAggregateInput = {
    currentStock?: Prisma.SortOrder;
    minStockAlert?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    sellingPrice?: Prisma.SortOrder;
};
export type MaterialScalarRelationFilter = {
    is?: Prisma.MaterialWhereInput;
    isNot?: Prisma.MaterialWhereInput;
};
export type EnumMaterialTypeFieldUpdateOperationsInput = {
    set?: $Enums.MaterialType;
};
export type EnumMaterialStatusFieldUpdateOperationsInput = {
    set?: $Enums.MaterialStatus;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type MaterialCreateNestedOneWithoutStockMovementsInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutStockMovementsInput, Prisma.MaterialUncheckedCreateWithoutStockMovementsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutStockMovementsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
};
export type MaterialUpdateOneRequiredWithoutStockMovementsNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutStockMovementsInput, Prisma.MaterialUncheckedCreateWithoutStockMovementsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutStockMovementsInput;
    upsert?: Prisma.MaterialUpsertWithoutStockMovementsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialUpdateToOneWithWhereWithoutStockMovementsInput, Prisma.MaterialUpdateWithoutStockMovementsInput>, Prisma.MaterialUncheckedUpdateWithoutStockMovementsInput>;
};
export type MaterialCreateNestedOneWithoutLoanItemsInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutLoanItemsInput, Prisma.MaterialUncheckedCreateWithoutLoanItemsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutLoanItemsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
};
export type MaterialUpdateOneRequiredWithoutLoanItemsNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutLoanItemsInput, Prisma.MaterialUncheckedCreateWithoutLoanItemsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutLoanItemsInput;
    upsert?: Prisma.MaterialUpsertWithoutLoanItemsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialUpdateToOneWithWhereWithoutLoanItemsInput, Prisma.MaterialUpdateWithoutLoanItemsInput>, Prisma.MaterialUncheckedUpdateWithoutLoanItemsInput>;
};
export type MaterialCreateNestedOneWithoutSaleItemsInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutSaleItemsInput, Prisma.MaterialUncheckedCreateWithoutSaleItemsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutSaleItemsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
};
export type MaterialUpdateOneRequiredWithoutSaleItemsNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutSaleItemsInput, Prisma.MaterialUncheckedCreateWithoutSaleItemsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutSaleItemsInput;
    upsert?: Prisma.MaterialUpsertWithoutSaleItemsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialUpdateToOneWithWhereWithoutSaleItemsInput, Prisma.MaterialUpdateWithoutSaleItemsInput>, Prisma.MaterialUncheckedUpdateWithoutSaleItemsInput>;
};
export type MaterialCreateNestedOneWithoutPurchaseItemsInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutPurchaseItemsInput, Prisma.MaterialUncheckedCreateWithoutPurchaseItemsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutPurchaseItemsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
};
export type MaterialUpdateOneRequiredWithoutPurchaseItemsNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutPurchaseItemsInput, Prisma.MaterialUncheckedCreateWithoutPurchaseItemsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutPurchaseItemsInput;
    upsert?: Prisma.MaterialUpsertWithoutPurchaseItemsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialUpdateToOneWithWhereWithoutPurchaseItemsInput, Prisma.MaterialUpdateWithoutPurchaseItemsInput>, Prisma.MaterialUncheckedUpdateWithoutPurchaseItemsInput>;
};
export type MaterialCreateNestedOneWithoutDonationItemsInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutDonationItemsInput, Prisma.MaterialUncheckedCreateWithoutDonationItemsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutDonationItemsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
};
export type MaterialUpdateOneRequiredWithoutDonationItemsNestedInput = {
    create?: Prisma.XOR<Prisma.MaterialCreateWithoutDonationItemsInput, Prisma.MaterialUncheckedCreateWithoutDonationItemsInput>;
    connectOrCreate?: Prisma.MaterialCreateOrConnectWithoutDonationItemsInput;
    upsert?: Prisma.MaterialUpsertWithoutDonationItemsInput;
    connect?: Prisma.MaterialWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaterialUpdateToOneWithWhereWithoutDonationItemsInput, Prisma.MaterialUpdateWithoutDonationItemsInput>, Prisma.MaterialUncheckedUpdateWithoutDonationItemsInput>;
};
export type MaterialCreateWithoutStockMovementsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    loanItems?: Prisma.LoanItemCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateWithoutStockMovementsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    loanItems?: Prisma.LoanItemUncheckedCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemUncheckedCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialCreateOrConnectWithoutStockMovementsInput = {
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutStockMovementsInput, Prisma.MaterialUncheckedCreateWithoutStockMovementsInput>;
};
export type MaterialUpsertWithoutStockMovementsInput = {
    update: Prisma.XOR<Prisma.MaterialUpdateWithoutStockMovementsInput, Prisma.MaterialUncheckedUpdateWithoutStockMovementsInput>;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutStockMovementsInput, Prisma.MaterialUncheckedCreateWithoutStockMovementsInput>;
    where?: Prisma.MaterialWhereInput;
};
export type MaterialUpdateToOneWithWhereWithoutStockMovementsInput = {
    where?: Prisma.MaterialWhereInput;
    data: Prisma.XOR<Prisma.MaterialUpdateWithoutStockMovementsInput, Prisma.MaterialUncheckedUpdateWithoutStockMovementsInput>;
};
export type MaterialUpdateWithoutStockMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    loanItems?: Prisma.LoanItemUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateWithoutStockMovementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    loanItems?: Prisma.LoanItemUncheckedUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUncheckedUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialCreateWithoutLoanItemsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateWithoutLoanItemsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemUncheckedCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialCreateOrConnectWithoutLoanItemsInput = {
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutLoanItemsInput, Prisma.MaterialUncheckedCreateWithoutLoanItemsInput>;
};
export type MaterialUpsertWithoutLoanItemsInput = {
    update: Prisma.XOR<Prisma.MaterialUpdateWithoutLoanItemsInput, Prisma.MaterialUncheckedUpdateWithoutLoanItemsInput>;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutLoanItemsInput, Prisma.MaterialUncheckedCreateWithoutLoanItemsInput>;
    where?: Prisma.MaterialWhereInput;
};
export type MaterialUpdateToOneWithWhereWithoutLoanItemsInput = {
    where?: Prisma.MaterialWhereInput;
    data: Prisma.XOR<Prisma.MaterialUpdateWithoutLoanItemsInput, Prisma.MaterialUncheckedUpdateWithoutLoanItemsInput>;
};
export type MaterialUpdateWithoutLoanItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateWithoutLoanItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUncheckedUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialCreateWithoutSaleItemsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementCreateNestedManyWithoutMaterialInput;
    loanItems?: Prisma.LoanItemCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateWithoutSaleItemsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutMaterialInput;
    loanItems?: Prisma.LoanItemUncheckedCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialCreateOrConnectWithoutSaleItemsInput = {
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutSaleItemsInput, Prisma.MaterialUncheckedCreateWithoutSaleItemsInput>;
};
export type MaterialUpsertWithoutSaleItemsInput = {
    update: Prisma.XOR<Prisma.MaterialUpdateWithoutSaleItemsInput, Prisma.MaterialUncheckedUpdateWithoutSaleItemsInput>;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutSaleItemsInput, Prisma.MaterialUncheckedCreateWithoutSaleItemsInput>;
    where?: Prisma.MaterialWhereInput;
};
export type MaterialUpdateToOneWithWhereWithoutSaleItemsInput = {
    where?: Prisma.MaterialWhereInput;
    data: Prisma.XOR<Prisma.MaterialUpdateWithoutSaleItemsInput, Prisma.MaterialUncheckedUpdateWithoutSaleItemsInput>;
};
export type MaterialUpdateWithoutSaleItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUpdateManyWithoutMaterialNestedInput;
    loanItems?: Prisma.LoanItemUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateWithoutSaleItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedUpdateManyWithoutMaterialNestedInput;
    loanItems?: Prisma.LoanItemUncheckedUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialCreateWithoutPurchaseItemsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementCreateNestedManyWithoutMaterialInput;
    loanItems?: Prisma.LoanItemCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateWithoutPurchaseItemsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutMaterialInput;
    loanItems?: Prisma.LoanItemUncheckedCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemUncheckedCreateNestedManyWithoutMaterialInput;
    donationItems?: Prisma.DonationItemUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialCreateOrConnectWithoutPurchaseItemsInput = {
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutPurchaseItemsInput, Prisma.MaterialUncheckedCreateWithoutPurchaseItemsInput>;
};
export type MaterialUpsertWithoutPurchaseItemsInput = {
    update: Prisma.XOR<Prisma.MaterialUpdateWithoutPurchaseItemsInput, Prisma.MaterialUncheckedUpdateWithoutPurchaseItemsInput>;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutPurchaseItemsInput, Prisma.MaterialUncheckedCreateWithoutPurchaseItemsInput>;
    where?: Prisma.MaterialWhereInput;
};
export type MaterialUpdateToOneWithWhereWithoutPurchaseItemsInput = {
    where?: Prisma.MaterialWhereInput;
    data: Prisma.XOR<Prisma.MaterialUpdateWithoutPurchaseItemsInput, Prisma.MaterialUncheckedUpdateWithoutPurchaseItemsInput>;
};
export type MaterialUpdateWithoutPurchaseItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUpdateManyWithoutMaterialNestedInput;
    loanItems?: Prisma.LoanItemUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateWithoutPurchaseItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedUpdateManyWithoutMaterialNestedInput;
    loanItems?: Prisma.LoanItemUncheckedUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUncheckedUpdateManyWithoutMaterialNestedInput;
    donationItems?: Prisma.DonationItemUncheckedUpdateManyWithoutMaterialNestedInput;
};
export type MaterialCreateWithoutDonationItemsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementCreateNestedManyWithoutMaterialInput;
    loanItems?: Prisma.LoanItemCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemCreateNestedManyWithoutMaterialInput;
};
export type MaterialUncheckedCreateWithoutDonationItemsInput = {
    id?: string;
    type: $Enums.MaterialType;
    name: string;
    reference?: string | null;
    serialNumber?: string | null;
    category?: string | null;
    language?: string | null;
    volume?: string | null;
    status?: $Enums.MaterialStatus;
    currentStock?: number;
    minStockAlert?: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: string | null;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutMaterialInput;
    loanItems?: Prisma.LoanItemUncheckedCreateNestedManyWithoutMaterialInput;
    saleItems?: Prisma.SaleItemUncheckedCreateNestedManyWithoutMaterialInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedCreateNestedManyWithoutMaterialInput;
};
export type MaterialCreateOrConnectWithoutDonationItemsInput = {
    where: Prisma.MaterialWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutDonationItemsInput, Prisma.MaterialUncheckedCreateWithoutDonationItemsInput>;
};
export type MaterialUpsertWithoutDonationItemsInput = {
    update: Prisma.XOR<Prisma.MaterialUpdateWithoutDonationItemsInput, Prisma.MaterialUncheckedUpdateWithoutDonationItemsInput>;
    create: Prisma.XOR<Prisma.MaterialCreateWithoutDonationItemsInput, Prisma.MaterialUncheckedCreateWithoutDonationItemsInput>;
    where?: Prisma.MaterialWhereInput;
};
export type MaterialUpdateToOneWithWhereWithoutDonationItemsInput = {
    where?: Prisma.MaterialWhereInput;
    data: Prisma.XOR<Prisma.MaterialUpdateWithoutDonationItemsInput, Prisma.MaterialUncheckedUpdateWithoutDonationItemsInput>;
};
export type MaterialUpdateWithoutDonationItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUpdateManyWithoutMaterialNestedInput;
    loanItems?: Prisma.LoanItemUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUpdateManyWithoutMaterialNestedInput;
};
export type MaterialUncheckedUpdateWithoutDonationItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumMaterialTypeFieldUpdateOperationsInput | $Enums.MaterialType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    volume?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumMaterialStatusFieldUpdateOperationsInput | $Enums.MaterialStatus;
    currentStock?: Prisma.IntFieldUpdateOperationsInput | number;
    minStockAlert?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sellingPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stockMovements?: Prisma.StockMovementUncheckedUpdateManyWithoutMaterialNestedInput;
    loanItems?: Prisma.LoanItemUncheckedUpdateManyWithoutMaterialNestedInput;
    saleItems?: Prisma.SaleItemUncheckedUpdateManyWithoutMaterialNestedInput;
    purchaseItems?: Prisma.PurchaseItemUncheckedUpdateManyWithoutMaterialNestedInput;
};
/**
 * Count Type MaterialCountOutputType
 */
export type MaterialCountOutputType = {
    stockMovements: number;
    loanItems: number;
    saleItems: number;
    purchaseItems: number;
    donationItems: number;
};
export type MaterialCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    stockMovements?: boolean | MaterialCountOutputTypeCountStockMovementsArgs;
    loanItems?: boolean | MaterialCountOutputTypeCountLoanItemsArgs;
    saleItems?: boolean | MaterialCountOutputTypeCountSaleItemsArgs;
    purchaseItems?: boolean | MaterialCountOutputTypeCountPurchaseItemsArgs;
    donationItems?: boolean | MaterialCountOutputTypeCountDonationItemsArgs;
};
/**
 * MaterialCountOutputType without action
 */
export type MaterialCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaterialCountOutputType
     */
    select?: Prisma.MaterialCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MaterialCountOutputType without action
 */
export type MaterialCountOutputTypeCountStockMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockMovementWhereInput;
};
/**
 * MaterialCountOutputType without action
 */
export type MaterialCountOutputTypeCountLoanItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanItemWhereInput;
};
/**
 * MaterialCountOutputType without action
 */
export type MaterialCountOutputTypeCountSaleItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleItemWhereInput;
};
/**
 * MaterialCountOutputType without action
 */
export type MaterialCountOutputTypeCountPurchaseItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseItemWhereInput;
};
/**
 * MaterialCountOutputType without action
 */
export type MaterialCountOutputTypeCountDonationItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DonationItemWhereInput;
};
export type MaterialSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    name?: boolean;
    reference?: boolean;
    serialNumber?: boolean;
    category?: boolean;
    language?: boolean;
    volume?: boolean;
    status?: boolean;
    currentStock?: boolean;
    minStockAlert?: boolean;
    unitPrice?: boolean;
    sellingPrice?: boolean;
    location?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    stockMovements?: boolean | Prisma.Material$stockMovementsArgs<ExtArgs>;
    loanItems?: boolean | Prisma.Material$loanItemsArgs<ExtArgs>;
    saleItems?: boolean | Prisma.Material$saleItemsArgs<ExtArgs>;
    purchaseItems?: boolean | Prisma.Material$purchaseItemsArgs<ExtArgs>;
    donationItems?: boolean | Prisma.Material$donationItemsArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["material"]>;
export type MaterialSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    name?: boolean;
    reference?: boolean;
    serialNumber?: boolean;
    category?: boolean;
    language?: boolean;
    volume?: boolean;
    status?: boolean;
    currentStock?: boolean;
    minStockAlert?: boolean;
    unitPrice?: boolean;
    sellingPrice?: boolean;
    location?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["material"]>;
export type MaterialSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    name?: boolean;
    reference?: boolean;
    serialNumber?: boolean;
    category?: boolean;
    language?: boolean;
    volume?: boolean;
    status?: boolean;
    currentStock?: boolean;
    minStockAlert?: boolean;
    unitPrice?: boolean;
    sellingPrice?: boolean;
    location?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["material"]>;
export type MaterialSelectScalar = {
    id?: boolean;
    type?: boolean;
    name?: boolean;
    reference?: boolean;
    serialNumber?: boolean;
    category?: boolean;
    language?: boolean;
    volume?: boolean;
    status?: boolean;
    currentStock?: boolean;
    minStockAlert?: boolean;
    unitPrice?: boolean;
    sellingPrice?: boolean;
    location?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type MaterialOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "name" | "reference" | "serialNumber" | "category" | "language" | "volume" | "status" | "currentStock" | "minStockAlert" | "unitPrice" | "sellingPrice" | "location" | "description" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["material"]>;
export type MaterialInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    stockMovements?: boolean | Prisma.Material$stockMovementsArgs<ExtArgs>;
    loanItems?: boolean | Prisma.Material$loanItemsArgs<ExtArgs>;
    saleItems?: boolean | Prisma.Material$saleItemsArgs<ExtArgs>;
    purchaseItems?: boolean | Prisma.Material$purchaseItemsArgs<ExtArgs>;
    donationItems?: boolean | Prisma.Material$donationItemsArgs<ExtArgs>;
    _count?: boolean | Prisma.MaterialCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaterialIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type MaterialIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $MaterialPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Material";
    objects: {
        stockMovements: Prisma.$StockMovementPayload<ExtArgs>[];
        loanItems: Prisma.$LoanItemPayload<ExtArgs>[];
        saleItems: Prisma.$SaleItemPayload<ExtArgs>[];
        purchaseItems: Prisma.$PurchaseItemPayload<ExtArgs>[];
        donationItems: Prisma.$DonationItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.MaterialType;
        name: string;
        reference: string | null;
        serialNumber: string | null;
        category: string | null;
        language: string | null;
        volume: string | null;
        status: $Enums.MaterialStatus;
        currentStock: number;
        minStockAlert: number;
        unitPrice: runtime.Decimal | null;
        sellingPrice: runtime.Decimal | null;
        location: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["material"]>;
    composites: {};
};
export type MaterialGetPayload<S extends boolean | null | undefined | MaterialDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaterialPayload, S>;
export type MaterialCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaterialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaterialCountAggregateInputType | true;
};
export interface MaterialDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Material'];
        meta: {
            name: 'Material';
        };
    };
    /**
     * Find zero or one Material that matches the filter.
     * @param {MaterialFindUniqueArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialFindUniqueArgs>(args: Prisma.SelectSubset<T, MaterialFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Material that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialFindUniqueOrThrowArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaterialFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Material that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindFirstArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialFindFirstArgs>(args?: Prisma.SelectSubset<T, MaterialFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Material that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindFirstOrThrowArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaterialFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Materials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Materials
     * const materials = await prisma.material.findMany()
     *
     * // Get first 10 Materials
     * const materials = await prisma.material.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const materialWithIdOnly = await prisma.material.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MaterialFindManyArgs>(args?: Prisma.SelectSubset<T, MaterialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Material.
     * @param {MaterialCreateArgs} args - Arguments to create a Material.
     * @example
     * // Create one Material
     * const Material = await prisma.material.create({
     *   data: {
     *     // ... data to create a Material
     *   }
     * })
     *
     */
    create<T extends MaterialCreateArgs>(args: Prisma.SelectSubset<T, MaterialCreateArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Materials.
     * @param {MaterialCreateManyArgs} args - Arguments to create many Materials.
     * @example
     * // Create many Materials
     * const material = await prisma.material.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MaterialCreateManyArgs>(args?: Prisma.SelectSubset<T, MaterialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Materials and returns the data saved in the database.
     * @param {MaterialCreateManyAndReturnArgs} args - Arguments to create many Materials.
     * @example
     * // Create many Materials
     * const material = await prisma.material.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Materials and only return the `id`
     * const materialWithIdOnly = await prisma.material.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MaterialCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaterialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Material.
     * @param {MaterialDeleteArgs} args - Arguments to delete one Material.
     * @example
     * // Delete one Material
     * const Material = await prisma.material.delete({
     *   where: {
     *     // ... filter to delete one Material
     *   }
     * })
     *
     */
    delete<T extends MaterialDeleteArgs>(args: Prisma.SelectSubset<T, MaterialDeleteArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Material.
     * @param {MaterialUpdateArgs} args - Arguments to update one Material.
     * @example
     * // Update one Material
     * const material = await prisma.material.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MaterialUpdateArgs>(args: Prisma.SelectSubset<T, MaterialUpdateArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Materials.
     * @param {MaterialDeleteManyArgs} args - Arguments to filter Materials to delete.
     * @example
     * // Delete a few Materials
     * const { count } = await prisma.material.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MaterialDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaterialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Materials
     * const material = await prisma.material.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MaterialUpdateManyArgs>(args: Prisma.SelectSubset<T, MaterialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Materials and returns the data updated in the database.
     * @param {MaterialUpdateManyAndReturnArgs} args - Arguments to update many Materials.
     * @example
     * // Update many Materials
     * const material = await prisma.material.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Materials and only return the `id`
     * const materialWithIdOnly = await prisma.material.updateManyAndReturn({
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
    updateManyAndReturn<T extends MaterialUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaterialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Material.
     * @param {MaterialUpsertArgs} args - Arguments to update or create a Material.
     * @example
     * // Update or create a Material
     * const material = await prisma.material.upsert({
     *   create: {
     *     // ... data to create a Material
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Material we want to update
     *   }
     * })
     */
    upsert<T extends MaterialUpsertArgs>(args: Prisma.SelectSubset<T, MaterialUpsertArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCountArgs} args - Arguments to filter Materials to count.
     * @example
     * // Count the number of Materials
     * const count = await prisma.material.count({
     *   where: {
     *     // ... the filter for the Materials we want to count
     *   }
     * })
    **/
    count<T extends MaterialCountArgs>(args?: Prisma.Subset<T, MaterialCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaterialCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Material.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaterialAggregateArgs>(args: Prisma.Subset<T, MaterialAggregateArgs>): Prisma.PrismaPromise<GetMaterialAggregateType<T>>;
    /**
     * Group by Material.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MaterialGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaterialGroupByArgs['orderBy'];
    } : {
        orderBy?: MaterialGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaterialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Material model
     */
    readonly fields: MaterialFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Material.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MaterialClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    stockMovements<T extends Prisma.Material$stockMovementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Material$stockMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    loanItems<T extends Prisma.Material$loanItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Material$loanItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    saleItems<T extends Prisma.Material$saleItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Material$saleItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SaleItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    purchaseItems<T extends Prisma.Material$purchaseItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Material$purchaseItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    donationItems<T extends Prisma.Material$donationItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Material$donationItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Material model
 */
export interface MaterialFieldRefs {
    readonly id: Prisma.FieldRef<"Material", 'String'>;
    readonly type: Prisma.FieldRef<"Material", 'MaterialType'>;
    readonly name: Prisma.FieldRef<"Material", 'String'>;
    readonly reference: Prisma.FieldRef<"Material", 'String'>;
    readonly serialNumber: Prisma.FieldRef<"Material", 'String'>;
    readonly category: Prisma.FieldRef<"Material", 'String'>;
    readonly language: Prisma.FieldRef<"Material", 'String'>;
    readonly volume: Prisma.FieldRef<"Material", 'String'>;
    readonly status: Prisma.FieldRef<"Material", 'MaterialStatus'>;
    readonly currentStock: Prisma.FieldRef<"Material", 'Int'>;
    readonly minStockAlert: Prisma.FieldRef<"Material", 'Int'>;
    readonly unitPrice: Prisma.FieldRef<"Material", 'Decimal'>;
    readonly sellingPrice: Prisma.FieldRef<"Material", 'Decimal'>;
    readonly location: Prisma.FieldRef<"Material", 'String'>;
    readonly description: Prisma.FieldRef<"Material", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Material", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Material", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Material", 'DateTime'>;
}
/**
 * Material findUnique
 */
export type MaterialFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    /**
     * Filter, which Material to fetch.
     */
    where: Prisma.MaterialWhereUniqueInput;
};
/**
 * Material findUniqueOrThrow
 */
export type MaterialFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    /**
     * Filter, which Material to fetch.
     */
    where: Prisma.MaterialWhereUniqueInput;
};
/**
 * Material findFirst
 */
export type MaterialFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    /**
     * Filter, which Material to fetch.
     */
    where?: Prisma.MaterialWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Materials to fetch.
     */
    orderBy?: Prisma.MaterialOrderByWithRelationInput | Prisma.MaterialOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Materials.
     */
    cursor?: Prisma.MaterialWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Materials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Materials.
     */
    distinct?: Prisma.MaterialScalarFieldEnum | Prisma.MaterialScalarFieldEnum[];
};
/**
 * Material findFirstOrThrow
 */
export type MaterialFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    /**
     * Filter, which Material to fetch.
     */
    where?: Prisma.MaterialWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Materials to fetch.
     */
    orderBy?: Prisma.MaterialOrderByWithRelationInput | Prisma.MaterialOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Materials.
     */
    cursor?: Prisma.MaterialWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Materials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Materials.
     */
    distinct?: Prisma.MaterialScalarFieldEnum | Prisma.MaterialScalarFieldEnum[];
};
/**
 * Material findMany
 */
export type MaterialFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    /**
     * Filter, which Materials to fetch.
     */
    where?: Prisma.MaterialWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Materials to fetch.
     */
    orderBy?: Prisma.MaterialOrderByWithRelationInput | Prisma.MaterialOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Materials.
     */
    cursor?: Prisma.MaterialWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Materials.
     */
    skip?: number;
    distinct?: Prisma.MaterialScalarFieldEnum | Prisma.MaterialScalarFieldEnum[];
};
/**
 * Material create
 */
export type MaterialCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    /**
     * The data needed to create a Material.
     */
    data: Prisma.XOR<Prisma.MaterialCreateInput, Prisma.MaterialUncheckedCreateInput>;
};
/**
 * Material createMany
 */
export type MaterialCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Materials.
     */
    data: Prisma.MaterialCreateManyInput | Prisma.MaterialCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Material createManyAndReturn
 */
export type MaterialCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * The data used to create many Materials.
     */
    data: Prisma.MaterialCreateManyInput | Prisma.MaterialCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Material update
 */
export type MaterialUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    /**
     * The data needed to update a Material.
     */
    data: Prisma.XOR<Prisma.MaterialUpdateInput, Prisma.MaterialUncheckedUpdateInput>;
    /**
     * Choose, which Material to update.
     */
    where: Prisma.MaterialWhereUniqueInput;
};
/**
 * Material updateMany
 */
export type MaterialUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Materials.
     */
    data: Prisma.XOR<Prisma.MaterialUpdateManyMutationInput, Prisma.MaterialUncheckedUpdateManyInput>;
    /**
     * Filter which Materials to update
     */
    where?: Prisma.MaterialWhereInput;
    /**
     * Limit how many Materials to update.
     */
    limit?: number;
};
/**
 * Material updateManyAndReturn
 */
export type MaterialUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * The data used to update Materials.
     */
    data: Prisma.XOR<Prisma.MaterialUpdateManyMutationInput, Prisma.MaterialUncheckedUpdateManyInput>;
    /**
     * Filter which Materials to update
     */
    where?: Prisma.MaterialWhereInput;
    /**
     * Limit how many Materials to update.
     */
    limit?: number;
};
/**
 * Material upsert
 */
export type MaterialUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    /**
     * The filter to search for the Material to update in case it exists.
     */
    where: Prisma.MaterialWhereUniqueInput;
    /**
     * In case the Material found by the `where` argument doesn't exist, create a new Material with this data.
     */
    create: Prisma.XOR<Prisma.MaterialCreateInput, Prisma.MaterialUncheckedCreateInput>;
    /**
     * In case the Material was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MaterialUpdateInput, Prisma.MaterialUncheckedUpdateInput>;
};
/**
 * Material delete
 */
export type MaterialDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
    /**
     * Filter which Material to delete.
     */
    where: Prisma.MaterialWhereUniqueInput;
};
/**
 * Material deleteMany
 */
export type MaterialDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Materials to delete
     */
    where?: Prisma.MaterialWhereInput;
    /**
     * Limit how many Materials to delete.
     */
    limit?: number;
};
/**
 * Material.stockMovements
 */
export type Material$stockMovementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    where?: Prisma.StockMovementWhereInput;
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    cursor?: Prisma.StockMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
/**
 * Material.loanItems
 */
export type Material$loanItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanItem
     */
    select?: Prisma.LoanItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LoanItem
     */
    omit?: Prisma.LoanItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanItemInclude<ExtArgs> | null;
    where?: Prisma.LoanItemWhereInput;
    orderBy?: Prisma.LoanItemOrderByWithRelationInput | Prisma.LoanItemOrderByWithRelationInput[];
    cursor?: Prisma.LoanItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LoanItemScalarFieldEnum | Prisma.LoanItemScalarFieldEnum[];
};
/**
 * Material.saleItems
 */
export type Material$saleItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleItem
     */
    select?: Prisma.SaleItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SaleItem
     */
    omit?: Prisma.SaleItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleItemInclude<ExtArgs> | null;
    where?: Prisma.SaleItemWhereInput;
    orderBy?: Prisma.SaleItemOrderByWithRelationInput | Prisma.SaleItemOrderByWithRelationInput[];
    cursor?: Prisma.SaleItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleItemScalarFieldEnum | Prisma.SaleItemScalarFieldEnum[];
};
/**
 * Material.purchaseItems
 */
export type Material$purchaseItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: Prisma.PurchaseItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PurchaseItem
     */
    omit?: Prisma.PurchaseItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PurchaseItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseItemWhereInput;
    orderBy?: Prisma.PurchaseItemOrderByWithRelationInput | Prisma.PurchaseItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseItemScalarFieldEnum | Prisma.PurchaseItemScalarFieldEnum[];
};
/**
 * Material.donationItems
 */
export type Material$donationItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationItem
     */
    select?: Prisma.DonationItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DonationItem
     */
    omit?: Prisma.DonationItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DonationItemInclude<ExtArgs> | null;
    where?: Prisma.DonationItemWhereInput;
    orderBy?: Prisma.DonationItemOrderByWithRelationInput | Prisma.DonationItemOrderByWithRelationInput[];
    cursor?: Prisma.DonationItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DonationItemScalarFieldEnum | Prisma.DonationItemScalarFieldEnum[];
};
/**
 * Material without action
 */
export type MaterialDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: Prisma.MaterialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Material
     */
    omit?: Prisma.MaterialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaterialInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Material.d.ts.map