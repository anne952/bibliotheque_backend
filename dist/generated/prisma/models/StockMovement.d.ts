import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model StockMovement
 *
 */
export type StockMovementModel = runtime.Types.Result.DefaultSelection<Prisma.$StockMovementPayload>;
export type AggregateStockMovement = {
    _count: StockMovementCountAggregateOutputType | null;
    _avg: StockMovementAvgAggregateOutputType | null;
    _sum: StockMovementSumAggregateOutputType | null;
    _min: StockMovementMinAggregateOutputType | null;
    _max: StockMovementMaxAggregateOutputType | null;
};
export type StockMovementAvgAggregateOutputType = {
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
};
export type StockMovementSumAggregateOutputType = {
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
};
export type StockMovementMinAggregateOutputType = {
    id: string | null;
    materialId: string | null;
    movementType: $Enums.StockMovementType | null;
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    movementDate: Date | null;
    description: string | null;
    reference: string | null;
    sourceType: $Enums.SourceType | null;
    sourceId: string | null;
    createdAt: Date | null;
};
export type StockMovementMaxAggregateOutputType = {
    id: string | null;
    materialId: string | null;
    movementType: $Enums.StockMovementType | null;
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    movementDate: Date | null;
    description: string | null;
    reference: string | null;
    sourceType: $Enums.SourceType | null;
    sourceId: string | null;
    createdAt: Date | null;
};
export type StockMovementCountAggregateOutputType = {
    id: number;
    materialId: number;
    movementType: number;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    movementDate: number;
    description: number;
    reference: number;
    sourceType: number;
    sourceId: number;
    createdAt: number;
    _all: number;
};
export type StockMovementAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    totalAmount?: true;
};
export type StockMovementSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    totalAmount?: true;
};
export type StockMovementMinAggregateInputType = {
    id?: true;
    materialId?: true;
    movementType?: true;
    quantity?: true;
    unitPrice?: true;
    totalAmount?: true;
    movementDate?: true;
    description?: true;
    reference?: true;
    sourceType?: true;
    sourceId?: true;
    createdAt?: true;
};
export type StockMovementMaxAggregateInputType = {
    id?: true;
    materialId?: true;
    movementType?: true;
    quantity?: true;
    unitPrice?: true;
    totalAmount?: true;
    movementDate?: true;
    description?: true;
    reference?: true;
    sourceType?: true;
    sourceId?: true;
    createdAt?: true;
};
export type StockMovementCountAggregateInputType = {
    id?: true;
    materialId?: true;
    movementType?: true;
    quantity?: true;
    unitPrice?: true;
    totalAmount?: true;
    movementDate?: true;
    description?: true;
    reference?: true;
    sourceType?: true;
    sourceId?: true;
    createdAt?: true;
    _all?: true;
};
export type StockMovementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovement to aggregate.
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StockMovementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockMovements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned StockMovements
    **/
    _count?: true | StockMovementCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: StockMovementAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: StockMovementSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StockMovementMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StockMovementMaxAggregateInputType;
};
export type GetStockMovementAggregateType<T extends StockMovementAggregateArgs> = {
    [P in keyof T & keyof AggregateStockMovement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStockMovement[P]> : Prisma.GetScalarType<T[P], AggregateStockMovement[P]>;
};
export type StockMovementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockMovementWhereInput;
    orderBy?: Prisma.StockMovementOrderByWithAggregationInput | Prisma.StockMovementOrderByWithAggregationInput[];
    by: Prisma.StockMovementScalarFieldEnum[] | Prisma.StockMovementScalarFieldEnum;
    having?: Prisma.StockMovementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StockMovementCountAggregateInputType | true;
    _avg?: StockMovementAvgAggregateInputType;
    _sum?: StockMovementSumAggregateInputType;
    _min?: StockMovementMinAggregateInputType;
    _max?: StockMovementMaxAggregateInputType;
};
export type StockMovementGroupByOutputType = {
    id: string;
    materialId: string;
    movementType: $Enums.StockMovementType;
    quantity: number;
    unitPrice: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    movementDate: Date;
    description: string | null;
    reference: string | null;
    sourceType: $Enums.SourceType | null;
    sourceId: string | null;
    createdAt: Date;
    _count: StockMovementCountAggregateOutputType | null;
    _avg: StockMovementAvgAggregateOutputType | null;
    _sum: StockMovementSumAggregateOutputType | null;
    _min: StockMovementMinAggregateOutputType | null;
    _max: StockMovementMaxAggregateOutputType | null;
};
type GetStockMovementGroupByPayload<T extends StockMovementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StockMovementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StockMovementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StockMovementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StockMovementGroupByOutputType[P]>;
}>>;
export type StockMovementWhereInput = {
    AND?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    OR?: Prisma.StockMovementWhereInput[];
    NOT?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    id?: Prisma.StringFilter<"StockMovement"> | string;
    materialId?: Prisma.StringFilter<"StockMovement"> | string;
    movementType?: Prisma.EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType;
    quantity?: Prisma.IntFilter<"StockMovement"> | number;
    unitPrice?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    description?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    reference?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    sourceType?: Prisma.EnumSourceTypeNullableFilter<"StockMovement"> | $Enums.SourceType | null;
    sourceId?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
};
export type StockMovementOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    movementDate?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    material?: Prisma.MaterialOrderByWithRelationInput;
};
export type StockMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    OR?: Prisma.StockMovementWhereInput[];
    NOT?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    materialId?: Prisma.StringFilter<"StockMovement"> | string;
    movementType?: Prisma.EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType;
    quantity?: Prisma.IntFilter<"StockMovement"> | number;
    unitPrice?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    description?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    reference?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    sourceType?: Prisma.EnumSourceTypeNullableFilter<"StockMovement"> | $Enums.SourceType | null;
    sourceId?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
}, "id">;
export type StockMovementOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    movementDate?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.StockMovementCountOrderByAggregateInput;
    _avg?: Prisma.StockMovementAvgOrderByAggregateInput;
    _max?: Prisma.StockMovementMaxOrderByAggregateInput;
    _min?: Prisma.StockMovementMinOrderByAggregateInput;
    _sum?: Prisma.StockMovementSumOrderByAggregateInput;
};
export type StockMovementScalarWhereWithAggregatesInput = {
    AND?: Prisma.StockMovementScalarWhereWithAggregatesInput | Prisma.StockMovementScalarWhereWithAggregatesInput[];
    OR?: Prisma.StockMovementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StockMovementScalarWhereWithAggregatesInput | Prisma.StockMovementScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StockMovement"> | string;
    materialId?: Prisma.StringWithAggregatesFilter<"StockMovement"> | string;
    movementType?: Prisma.EnumStockMovementTypeWithAggregatesFilter<"StockMovement"> | $Enums.StockMovementType;
    quantity?: Prisma.IntWithAggregatesFilter<"StockMovement"> | number;
    unitPrice?: Prisma.DecimalNullableWithAggregatesFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.DecimalNullableWithAggregatesFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeWithAggregatesFilter<"StockMovement"> | Date | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"StockMovement"> | string | null;
    reference?: Prisma.StringNullableWithAggregatesFilter<"StockMovement"> | string | null;
    sourceType?: Prisma.EnumSourceTypeNullableWithAggregatesFilter<"StockMovement"> | $Enums.SourceType | null;
    sourceId?: Prisma.StringNullableWithAggregatesFilter<"StockMovement"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StockMovement"> | Date | string;
};
export type StockMovementCreateInput = {
    id?: string;
    movementType: $Enums.StockMovementType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Date | string;
    description?: string | null;
    reference?: string | null;
    sourceType?: $Enums.SourceType | null;
    sourceId?: string | null;
    createdAt?: Date | string;
    material: Prisma.MaterialCreateNestedOneWithoutStockMovementsInput;
};
export type StockMovementUncheckedCreateInput = {
    id?: string;
    materialId: string;
    movementType: $Enums.StockMovementType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Date | string;
    description?: string | null;
    reference?: string | null;
    sourceType?: $Enums.SourceType | null;
    sourceId?: string | null;
    createdAt?: Date | string;
};
export type StockMovementUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    movementType?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    material?: Prisma.MaterialUpdateOneRequiredWithoutStockMovementsNestedInput;
};
export type StockMovementUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    movementType?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementCreateManyInput = {
    id?: string;
    materialId: string;
    movementType: $Enums.StockMovementType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Date | string;
    description?: string | null;
    reference?: string | null;
    sourceType?: $Enums.SourceType | null;
    sourceId?: string | null;
    createdAt?: Date | string;
};
export type StockMovementUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    movementType?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    movementType?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementListRelationFilter = {
    every?: Prisma.StockMovementWhereInput;
    some?: Prisma.StockMovementWhereInput;
    none?: Prisma.StockMovementWhereInput;
};
export type StockMovementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StockMovementCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    movementDate?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StockMovementAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
};
export type StockMovementMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    movementDate?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StockMovementMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    movementType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    movementDate?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StockMovementSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
};
export type StockMovementCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutMaterialInput, Prisma.StockMovementUncheckedCreateWithoutMaterialInput> | Prisma.StockMovementCreateWithoutMaterialInput[] | Prisma.StockMovementUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutMaterialInput | Prisma.StockMovementCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.StockMovementCreateManyMaterialInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutMaterialInput, Prisma.StockMovementUncheckedCreateWithoutMaterialInput> | Prisma.StockMovementCreateWithoutMaterialInput[] | Prisma.StockMovementUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutMaterialInput | Prisma.StockMovementCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.StockMovementCreateManyMaterialInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutMaterialInput, Prisma.StockMovementUncheckedCreateWithoutMaterialInput> | Prisma.StockMovementCreateWithoutMaterialInput[] | Prisma.StockMovementUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutMaterialInput | Prisma.StockMovementCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutMaterialInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.StockMovementCreateManyMaterialInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutMaterialInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutMaterialInput | Prisma.StockMovementUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutMaterialInput, Prisma.StockMovementUncheckedCreateWithoutMaterialInput> | Prisma.StockMovementCreateWithoutMaterialInput[] | Prisma.StockMovementUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutMaterialInput | Prisma.StockMovementCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutMaterialInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.StockMovementCreateManyMaterialInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutMaterialInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutMaterialInput | Prisma.StockMovementUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type EnumStockMovementTypeFieldUpdateOperationsInput = {
    set?: $Enums.StockMovementType;
};
export type NullableEnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType | null;
};
export type StockMovementCreateWithoutMaterialInput = {
    id?: string;
    movementType: $Enums.StockMovementType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Date | string;
    description?: string | null;
    reference?: string | null;
    sourceType?: $Enums.SourceType | null;
    sourceId?: string | null;
    createdAt?: Date | string;
};
export type StockMovementUncheckedCreateWithoutMaterialInput = {
    id?: string;
    movementType: $Enums.StockMovementType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Date | string;
    description?: string | null;
    reference?: string | null;
    sourceType?: $Enums.SourceType | null;
    sourceId?: string | null;
    createdAt?: Date | string;
};
export type StockMovementCreateOrConnectWithoutMaterialInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutMaterialInput, Prisma.StockMovementUncheckedCreateWithoutMaterialInput>;
};
export type StockMovementCreateManyMaterialInputEnvelope = {
    data: Prisma.StockMovementCreateManyMaterialInput | Prisma.StockMovementCreateManyMaterialInput[];
    skipDuplicates?: boolean;
};
export type StockMovementUpsertWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockMovementUpdateWithoutMaterialInput, Prisma.StockMovementUncheckedUpdateWithoutMaterialInput>;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutMaterialInput, Prisma.StockMovementUncheckedCreateWithoutMaterialInput>;
};
export type StockMovementUpdateWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateWithoutMaterialInput, Prisma.StockMovementUncheckedUpdateWithoutMaterialInput>;
};
export type StockMovementUpdateManyWithWhereWithoutMaterialInput = {
    where: Prisma.StockMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyWithoutMaterialInput>;
};
export type StockMovementScalarWhereInput = {
    AND?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
    OR?: Prisma.StockMovementScalarWhereInput[];
    NOT?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
    id?: Prisma.StringFilter<"StockMovement"> | string;
    materialId?: Prisma.StringFilter<"StockMovement"> | string;
    movementType?: Prisma.EnumStockMovementTypeFilter<"StockMovement"> | $Enums.StockMovementType;
    quantity?: Prisma.IntFilter<"StockMovement"> | number;
    unitPrice?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    description?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    reference?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    sourceType?: Prisma.EnumSourceTypeNullableFilter<"StockMovement"> | $Enums.SourceType | null;
    sourceId?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
};
export type StockMovementCreateManyMaterialInput = {
    id?: string;
    movementType: $Enums.StockMovementType;
    quantity: number;
    unitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Date | string;
    description?: string | null;
    reference?: string | null;
    sourceType?: $Enums.SourceType | null;
    sourceId?: string | null;
    createdAt?: Date | string;
};
export type StockMovementUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    movementType?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementUncheckedUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    movementType?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementUncheckedUpdateManyWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    movementType?: Prisma.EnumStockMovementTypeFieldUpdateOperationsInput | $Enums.StockMovementType;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    movementDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceType?: Prisma.NullableEnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType | null;
    sourceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockMovementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    materialId?: boolean;
    movementType?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalAmount?: boolean;
    movementDate?: boolean;
    description?: boolean;
    reference?: boolean;
    sourceType?: boolean;
    sourceId?: boolean;
    createdAt?: boolean;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockMovement"]>;
export type StockMovementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    materialId?: boolean;
    movementType?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalAmount?: boolean;
    movementDate?: boolean;
    description?: boolean;
    reference?: boolean;
    sourceType?: boolean;
    sourceId?: boolean;
    createdAt?: boolean;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockMovement"]>;
export type StockMovementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    materialId?: boolean;
    movementType?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalAmount?: boolean;
    movementDate?: boolean;
    description?: boolean;
    reference?: boolean;
    sourceType?: boolean;
    sourceId?: boolean;
    createdAt?: boolean;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockMovement"]>;
export type StockMovementSelectScalar = {
    id?: boolean;
    materialId?: boolean;
    movementType?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalAmount?: boolean;
    movementDate?: boolean;
    description?: boolean;
    reference?: boolean;
    sourceType?: boolean;
    sourceId?: boolean;
    createdAt?: boolean;
};
export type StockMovementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "materialId" | "movementType" | "quantity" | "unitPrice" | "totalAmount" | "movementDate" | "description" | "reference" | "sourceType" | "sourceId" | "createdAt", ExtArgs["result"]["stockMovement"]>;
export type StockMovementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type StockMovementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type StockMovementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type $StockMovementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StockMovement";
    objects: {
        material: Prisma.$MaterialPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        materialId: string;
        movementType: $Enums.StockMovementType;
        quantity: number;
        unitPrice: runtime.Decimal | null;
        totalAmount: runtime.Decimal | null;
        movementDate: Date;
        description: string | null;
        reference: string | null;
        sourceType: $Enums.SourceType | null;
        sourceId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["stockMovement"]>;
    composites: {};
};
export type StockMovementGetPayload<S extends boolean | null | undefined | StockMovementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StockMovementPayload, S>;
export type StockMovementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StockMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StockMovementCountAggregateInputType | true;
};
export interface StockMovementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StockMovement'];
        meta: {
            name: 'StockMovement';
        };
    };
    /**
     * Find zero or one StockMovement that matches the filter.
     * @param {StockMovementFindUniqueArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockMovementFindUniqueArgs>(args: Prisma.SelectSubset<T, StockMovementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one StockMovement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockMovementFindUniqueOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockMovementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StockMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockMovement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockMovementFindFirstArgs>(args?: Prisma.SelectSubset<T, StockMovementFindFirstArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockMovement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockMovementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StockMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more StockMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockMovements
     * const stockMovements = await prisma.stockMovement.findMany()
     *
     * // Get first 10 StockMovements
     * const stockMovements = await prisma.stockMovement.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StockMovementFindManyArgs>(args?: Prisma.SelectSubset<T, StockMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a StockMovement.
     * @param {StockMovementCreateArgs} args - Arguments to create a StockMovement.
     * @example
     * // Create one StockMovement
     * const StockMovement = await prisma.stockMovement.create({
     *   data: {
     *     // ... data to create a StockMovement
     *   }
     * })
     *
     */
    create<T extends StockMovementCreateArgs>(args: Prisma.SelectSubset<T, StockMovementCreateArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many StockMovements.
     * @param {StockMovementCreateManyArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StockMovementCreateManyArgs>(args?: Prisma.SelectSubset<T, StockMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many StockMovements and returns the data saved in the database.
     * @param {StockMovementCreateManyAndReturnArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many StockMovements and only return the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StockMovementCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StockMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a StockMovement.
     * @param {StockMovementDeleteArgs} args - Arguments to delete one StockMovement.
     * @example
     * // Delete one StockMovement
     * const StockMovement = await prisma.stockMovement.delete({
     *   where: {
     *     // ... filter to delete one StockMovement
     *   }
     * })
     *
     */
    delete<T extends StockMovementDeleteArgs>(args: Prisma.SelectSubset<T, StockMovementDeleteArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one StockMovement.
     * @param {StockMovementUpdateArgs} args - Arguments to update one StockMovement.
     * @example
     * // Update one StockMovement
     * const stockMovement = await prisma.stockMovement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StockMovementUpdateArgs>(args: Prisma.SelectSubset<T, StockMovementUpdateArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more StockMovements.
     * @param {StockMovementDeleteManyArgs} args - Arguments to filter StockMovements to delete.
     * @example
     * // Delete a few StockMovements
     * const { count } = await prisma.stockMovement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StockMovementDeleteManyArgs>(args?: Prisma.SelectSubset<T, StockMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StockMovementUpdateManyArgs>(args: Prisma.SelectSubset<T, StockMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockMovements and returns the data updated in the database.
     * @param {StockMovementUpdateManyAndReturnArgs} args - Arguments to update many StockMovements.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more StockMovements and only return the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.updateManyAndReturn({
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
    updateManyAndReturn<T extends StockMovementUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StockMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one StockMovement.
     * @param {StockMovementUpsertArgs} args - Arguments to update or create a StockMovement.
     * @example
     * // Update or create a StockMovement
     * const stockMovement = await prisma.stockMovement.upsert({
     *   create: {
     *     // ... data to create a StockMovement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockMovement we want to update
     *   }
     * })
     */
    upsert<T extends StockMovementUpsertArgs>(args: Prisma.SelectSubset<T, StockMovementUpsertArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementCountArgs} args - Arguments to filter StockMovements to count.
     * @example
     * // Count the number of StockMovements
     * const count = await prisma.stockMovement.count({
     *   where: {
     *     // ... the filter for the StockMovements we want to count
     *   }
     * })
    **/
    count<T extends StockMovementCountArgs>(args?: Prisma.Subset<T, StockMovementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StockMovementCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockMovementAggregateArgs>(args: Prisma.Subset<T, StockMovementAggregateArgs>): Prisma.PrismaPromise<GetStockMovementAggregateType<T>>;
    /**
     * Group by StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementGroupByArgs} args - Group by arguments.
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
    groupBy<T extends StockMovementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StockMovementGroupByArgs['orderBy'];
    } : {
        orderBy?: StockMovementGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StockMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the StockMovement model
     */
    readonly fields: StockMovementFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for StockMovement.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StockMovementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    material<T extends Prisma.MaterialDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaterialDefaultArgs<ExtArgs>>): Prisma.Prisma__MaterialClient<runtime.Types.Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the StockMovement model
 */
export interface StockMovementFieldRefs {
    readonly id: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly materialId: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly movementType: Prisma.FieldRef<"StockMovement", 'StockMovementType'>;
    readonly quantity: Prisma.FieldRef<"StockMovement", 'Int'>;
    readonly unitPrice: Prisma.FieldRef<"StockMovement", 'Decimal'>;
    readonly totalAmount: Prisma.FieldRef<"StockMovement", 'Decimal'>;
    readonly movementDate: Prisma.FieldRef<"StockMovement", 'DateTime'>;
    readonly description: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly reference: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly sourceType: Prisma.FieldRef<"StockMovement", 'SourceType'>;
    readonly sourceId: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly createdAt: Prisma.FieldRef<"StockMovement", 'DateTime'>;
}
/**
 * StockMovement findUnique
 */
export type StockMovementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovement to fetch.
     */
    where: Prisma.StockMovementWhereUniqueInput;
};
/**
 * StockMovement findUniqueOrThrow
 */
export type StockMovementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovement to fetch.
     */
    where: Prisma.StockMovementWhereUniqueInput;
};
/**
 * StockMovement findFirst
 */
export type StockMovementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockMovements.
     */
    cursor?: Prisma.StockMovementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockMovements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockMovements.
     */
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
/**
 * StockMovement findFirstOrThrow
 */
export type StockMovementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockMovements.
     */
    cursor?: Prisma.StockMovementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockMovements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockMovements.
     */
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
/**
 * StockMovement findMany
 */
export type StockMovementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovements to fetch.
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing StockMovements.
     */
    cursor?: Prisma.StockMovementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockMovements.
     */
    skip?: number;
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
/**
 * StockMovement create
 */
export type StockMovementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a StockMovement.
     */
    data: Prisma.XOR<Prisma.StockMovementCreateInput, Prisma.StockMovementUncheckedCreateInput>;
};
/**
 * StockMovement createMany
 */
export type StockMovementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockMovements.
     */
    data: Prisma.StockMovementCreateManyInput | Prisma.StockMovementCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StockMovement createManyAndReturn
 */
export type StockMovementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: Prisma.StockMovementSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    /**
     * The data used to create many StockMovements.
     */
    data: Prisma.StockMovementCreateManyInput | Prisma.StockMovementCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockMovementIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * StockMovement update
 */
export type StockMovementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a StockMovement.
     */
    data: Prisma.XOR<Prisma.StockMovementUpdateInput, Prisma.StockMovementUncheckedUpdateInput>;
    /**
     * Choose, which StockMovement to update.
     */
    where: Prisma.StockMovementWhereUniqueInput;
};
/**
 * StockMovement updateMany
 */
export type StockMovementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update StockMovements.
     */
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyInput>;
    /**
     * Filter which StockMovements to update
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number;
};
/**
 * StockMovement updateManyAndReturn
 */
export type StockMovementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: Prisma.StockMovementSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    /**
     * The data used to update StockMovements.
     */
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyInput>;
    /**
     * Filter which StockMovements to update
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockMovementIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * StockMovement upsert
 */
export type StockMovementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the StockMovement to update in case it exists.
     */
    where: Prisma.StockMovementWhereUniqueInput;
    /**
     * In case the StockMovement found by the `where` argument doesn't exist, create a new StockMovement with this data.
     */
    create: Prisma.XOR<Prisma.StockMovementCreateInput, Prisma.StockMovementUncheckedCreateInput>;
    /**
     * In case the StockMovement was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StockMovementUpdateInput, Prisma.StockMovementUncheckedUpdateInput>;
};
/**
 * StockMovement delete
 */
export type StockMovementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which StockMovement to delete.
     */
    where: Prisma.StockMovementWhereUniqueInput;
};
/**
 * StockMovement deleteMany
 */
export type StockMovementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovements to delete
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * Limit how many StockMovements to delete.
     */
    limit?: number;
};
/**
 * StockMovement without action
 */
export type StockMovementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=StockMovement.d.ts.map