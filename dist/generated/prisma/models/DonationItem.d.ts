import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DonationItem
 *
 */
export type DonationItemModel = runtime.Types.Result.DefaultSelection<Prisma.$DonationItemPayload>;
export type AggregateDonationItem = {
    _count: DonationItemCountAggregateOutputType | null;
    _avg: DonationItemAvgAggregateOutputType | null;
    _sum: DonationItemSumAggregateOutputType | null;
    _min: DonationItemMinAggregateOutputType | null;
    _max: DonationItemMaxAggregateOutputType | null;
};
export type DonationItemAvgAggregateOutputType = {
    quantity: number | null;
};
export type DonationItemSumAggregateOutputType = {
    quantity: number | null;
};
export type DonationItemMinAggregateOutputType = {
    id: string | null;
    donationId: string | null;
    materialId: string | null;
    quantity: number | null;
    createdAt: Date | null;
};
export type DonationItemMaxAggregateOutputType = {
    id: string | null;
    donationId: string | null;
    materialId: string | null;
    quantity: number | null;
    createdAt: Date | null;
};
export type DonationItemCountAggregateOutputType = {
    id: number;
    donationId: number;
    materialId: number;
    quantity: number;
    createdAt: number;
    _all: number;
};
export type DonationItemAvgAggregateInputType = {
    quantity?: true;
};
export type DonationItemSumAggregateInputType = {
    quantity?: true;
};
export type DonationItemMinAggregateInputType = {
    id?: true;
    donationId?: true;
    materialId?: true;
    quantity?: true;
    createdAt?: true;
};
export type DonationItemMaxAggregateInputType = {
    id?: true;
    donationId?: true;
    materialId?: true;
    quantity?: true;
    createdAt?: true;
};
export type DonationItemCountAggregateInputType = {
    id?: true;
    donationId?: true;
    materialId?: true;
    quantity?: true;
    createdAt?: true;
    _all?: true;
};
export type DonationItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DonationItem to aggregate.
     */
    where?: Prisma.DonationItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DonationItems to fetch.
     */
    orderBy?: Prisma.DonationItemOrderByWithRelationInput | Prisma.DonationItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DonationItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DonationItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DonationItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DonationItems
    **/
    _count?: true | DonationItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DonationItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DonationItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DonationItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DonationItemMaxAggregateInputType;
};
export type GetDonationItemAggregateType<T extends DonationItemAggregateArgs> = {
    [P in keyof T & keyof AggregateDonationItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDonationItem[P]> : Prisma.GetScalarType<T[P], AggregateDonationItem[P]>;
};
export type DonationItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DonationItemWhereInput;
    orderBy?: Prisma.DonationItemOrderByWithAggregationInput | Prisma.DonationItemOrderByWithAggregationInput[];
    by: Prisma.DonationItemScalarFieldEnum[] | Prisma.DonationItemScalarFieldEnum;
    having?: Prisma.DonationItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DonationItemCountAggregateInputType | true;
    _avg?: DonationItemAvgAggregateInputType;
    _sum?: DonationItemSumAggregateInputType;
    _min?: DonationItemMinAggregateInputType;
    _max?: DonationItemMaxAggregateInputType;
};
export type DonationItemGroupByOutputType = {
    id: string;
    donationId: string;
    materialId: string;
    quantity: number;
    createdAt: Date;
    _count: DonationItemCountAggregateOutputType | null;
    _avg: DonationItemAvgAggregateOutputType | null;
    _sum: DonationItemSumAggregateOutputType | null;
    _min: DonationItemMinAggregateOutputType | null;
    _max: DonationItemMaxAggregateOutputType | null;
};
type GetDonationItemGroupByPayload<T extends DonationItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DonationItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DonationItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DonationItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DonationItemGroupByOutputType[P]>;
}>>;
export type DonationItemWhereInput = {
    AND?: Prisma.DonationItemWhereInput | Prisma.DonationItemWhereInput[];
    OR?: Prisma.DonationItemWhereInput[];
    NOT?: Prisma.DonationItemWhereInput | Prisma.DonationItemWhereInput[];
    id?: Prisma.StringFilter<"DonationItem"> | string;
    donationId?: Prisma.StringFilter<"DonationItem"> | string;
    materialId?: Prisma.StringFilter<"DonationItem"> | string;
    quantity?: Prisma.IntFilter<"DonationItem"> | number;
    createdAt?: Prisma.DateTimeFilter<"DonationItem"> | Date | string;
    donation?: Prisma.XOR<Prisma.DonationScalarRelationFilter, Prisma.DonationWhereInput>;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
};
export type DonationItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    donationId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    donation?: Prisma.DonationOrderByWithRelationInput;
    material?: Prisma.MaterialOrderByWithRelationInput;
};
export type DonationItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DonationItemWhereInput | Prisma.DonationItemWhereInput[];
    OR?: Prisma.DonationItemWhereInput[];
    NOT?: Prisma.DonationItemWhereInput | Prisma.DonationItemWhereInput[];
    donationId?: Prisma.StringFilter<"DonationItem"> | string;
    materialId?: Prisma.StringFilter<"DonationItem"> | string;
    quantity?: Prisma.IntFilter<"DonationItem"> | number;
    createdAt?: Prisma.DateTimeFilter<"DonationItem"> | Date | string;
    donation?: Prisma.XOR<Prisma.DonationScalarRelationFilter, Prisma.DonationWhereInput>;
    material?: Prisma.XOR<Prisma.MaterialScalarRelationFilter, Prisma.MaterialWhereInput>;
}, "id">;
export type DonationItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    donationId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DonationItemCountOrderByAggregateInput;
    _avg?: Prisma.DonationItemAvgOrderByAggregateInput;
    _max?: Prisma.DonationItemMaxOrderByAggregateInput;
    _min?: Prisma.DonationItemMinOrderByAggregateInput;
    _sum?: Prisma.DonationItemSumOrderByAggregateInput;
};
export type DonationItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.DonationItemScalarWhereWithAggregatesInput | Prisma.DonationItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.DonationItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DonationItemScalarWhereWithAggregatesInput | Prisma.DonationItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DonationItem"> | string;
    donationId?: Prisma.StringWithAggregatesFilter<"DonationItem"> | string;
    materialId?: Prisma.StringWithAggregatesFilter<"DonationItem"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"DonationItem"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DonationItem"> | Date | string;
};
export type DonationItemCreateInput = {
    id?: string;
    quantity: number;
    createdAt?: Date | string;
    donation: Prisma.DonationCreateNestedOneWithoutItemsInput;
    material: Prisma.MaterialCreateNestedOneWithoutDonationItemsInput;
};
export type DonationItemUncheckedCreateInput = {
    id?: string;
    donationId: string;
    materialId: string;
    quantity: number;
    createdAt?: Date | string;
};
export type DonationItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    donation?: Prisma.DonationUpdateOneRequiredWithoutItemsNestedInput;
    material?: Prisma.MaterialUpdateOneRequiredWithoutDonationItemsNestedInput;
};
export type DonationItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    donationId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DonationItemCreateManyInput = {
    id?: string;
    donationId: string;
    materialId: string;
    quantity: number;
    createdAt?: Date | string;
};
export type DonationItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DonationItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    donationId?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DonationItemListRelationFilter = {
    every?: Prisma.DonationItemWhereInput;
    some?: Prisma.DonationItemWhereInput;
    none?: Prisma.DonationItemWhereInput;
};
export type DonationItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DonationItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    donationId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DonationItemAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type DonationItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    donationId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DonationItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    donationId?: Prisma.SortOrder;
    materialId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DonationItemSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
};
export type DonationItemCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.DonationItemCreateWithoutMaterialInput, Prisma.DonationItemUncheckedCreateWithoutMaterialInput> | Prisma.DonationItemCreateWithoutMaterialInput[] | Prisma.DonationItemUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.DonationItemCreateOrConnectWithoutMaterialInput | Prisma.DonationItemCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.DonationItemCreateManyMaterialInputEnvelope;
    connect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
};
export type DonationItemUncheckedCreateNestedManyWithoutMaterialInput = {
    create?: Prisma.XOR<Prisma.DonationItemCreateWithoutMaterialInput, Prisma.DonationItemUncheckedCreateWithoutMaterialInput> | Prisma.DonationItemCreateWithoutMaterialInput[] | Prisma.DonationItemUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.DonationItemCreateOrConnectWithoutMaterialInput | Prisma.DonationItemCreateOrConnectWithoutMaterialInput[];
    createMany?: Prisma.DonationItemCreateManyMaterialInputEnvelope;
    connect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
};
export type DonationItemUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.DonationItemCreateWithoutMaterialInput, Prisma.DonationItemUncheckedCreateWithoutMaterialInput> | Prisma.DonationItemCreateWithoutMaterialInput[] | Prisma.DonationItemUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.DonationItemCreateOrConnectWithoutMaterialInput | Prisma.DonationItemCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.DonationItemUpsertWithWhereUniqueWithoutMaterialInput | Prisma.DonationItemUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.DonationItemCreateManyMaterialInputEnvelope;
    set?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    disconnect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    delete?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    connect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    update?: Prisma.DonationItemUpdateWithWhereUniqueWithoutMaterialInput | Prisma.DonationItemUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.DonationItemUpdateManyWithWhereWithoutMaterialInput | Prisma.DonationItemUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.DonationItemScalarWhereInput | Prisma.DonationItemScalarWhereInput[];
};
export type DonationItemUncheckedUpdateManyWithoutMaterialNestedInput = {
    create?: Prisma.XOR<Prisma.DonationItemCreateWithoutMaterialInput, Prisma.DonationItemUncheckedCreateWithoutMaterialInput> | Prisma.DonationItemCreateWithoutMaterialInput[] | Prisma.DonationItemUncheckedCreateWithoutMaterialInput[];
    connectOrCreate?: Prisma.DonationItemCreateOrConnectWithoutMaterialInput | Prisma.DonationItemCreateOrConnectWithoutMaterialInput[];
    upsert?: Prisma.DonationItemUpsertWithWhereUniqueWithoutMaterialInput | Prisma.DonationItemUpsertWithWhereUniqueWithoutMaterialInput[];
    createMany?: Prisma.DonationItemCreateManyMaterialInputEnvelope;
    set?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    disconnect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    delete?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    connect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    update?: Prisma.DonationItemUpdateWithWhereUniqueWithoutMaterialInput | Prisma.DonationItemUpdateWithWhereUniqueWithoutMaterialInput[];
    updateMany?: Prisma.DonationItemUpdateManyWithWhereWithoutMaterialInput | Prisma.DonationItemUpdateManyWithWhereWithoutMaterialInput[];
    deleteMany?: Prisma.DonationItemScalarWhereInput | Prisma.DonationItemScalarWhereInput[];
};
export type DonationItemCreateNestedManyWithoutDonationInput = {
    create?: Prisma.XOR<Prisma.DonationItemCreateWithoutDonationInput, Prisma.DonationItemUncheckedCreateWithoutDonationInput> | Prisma.DonationItemCreateWithoutDonationInput[] | Prisma.DonationItemUncheckedCreateWithoutDonationInput[];
    connectOrCreate?: Prisma.DonationItemCreateOrConnectWithoutDonationInput | Prisma.DonationItemCreateOrConnectWithoutDonationInput[];
    createMany?: Prisma.DonationItemCreateManyDonationInputEnvelope;
    connect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
};
export type DonationItemUncheckedCreateNestedManyWithoutDonationInput = {
    create?: Prisma.XOR<Prisma.DonationItemCreateWithoutDonationInput, Prisma.DonationItemUncheckedCreateWithoutDonationInput> | Prisma.DonationItemCreateWithoutDonationInput[] | Prisma.DonationItemUncheckedCreateWithoutDonationInput[];
    connectOrCreate?: Prisma.DonationItemCreateOrConnectWithoutDonationInput | Prisma.DonationItemCreateOrConnectWithoutDonationInput[];
    createMany?: Prisma.DonationItemCreateManyDonationInputEnvelope;
    connect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
};
export type DonationItemUpdateManyWithoutDonationNestedInput = {
    create?: Prisma.XOR<Prisma.DonationItemCreateWithoutDonationInput, Prisma.DonationItemUncheckedCreateWithoutDonationInput> | Prisma.DonationItemCreateWithoutDonationInput[] | Prisma.DonationItemUncheckedCreateWithoutDonationInput[];
    connectOrCreate?: Prisma.DonationItemCreateOrConnectWithoutDonationInput | Prisma.DonationItemCreateOrConnectWithoutDonationInput[];
    upsert?: Prisma.DonationItemUpsertWithWhereUniqueWithoutDonationInput | Prisma.DonationItemUpsertWithWhereUniqueWithoutDonationInput[];
    createMany?: Prisma.DonationItemCreateManyDonationInputEnvelope;
    set?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    disconnect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    delete?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    connect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    update?: Prisma.DonationItemUpdateWithWhereUniqueWithoutDonationInput | Prisma.DonationItemUpdateWithWhereUniqueWithoutDonationInput[];
    updateMany?: Prisma.DonationItemUpdateManyWithWhereWithoutDonationInput | Prisma.DonationItemUpdateManyWithWhereWithoutDonationInput[];
    deleteMany?: Prisma.DonationItemScalarWhereInput | Prisma.DonationItemScalarWhereInput[];
};
export type DonationItemUncheckedUpdateManyWithoutDonationNestedInput = {
    create?: Prisma.XOR<Prisma.DonationItemCreateWithoutDonationInput, Prisma.DonationItemUncheckedCreateWithoutDonationInput> | Prisma.DonationItemCreateWithoutDonationInput[] | Prisma.DonationItemUncheckedCreateWithoutDonationInput[];
    connectOrCreate?: Prisma.DonationItemCreateOrConnectWithoutDonationInput | Prisma.DonationItemCreateOrConnectWithoutDonationInput[];
    upsert?: Prisma.DonationItemUpsertWithWhereUniqueWithoutDonationInput | Prisma.DonationItemUpsertWithWhereUniqueWithoutDonationInput[];
    createMany?: Prisma.DonationItemCreateManyDonationInputEnvelope;
    set?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    disconnect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    delete?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    connect?: Prisma.DonationItemWhereUniqueInput | Prisma.DonationItemWhereUniqueInput[];
    update?: Prisma.DonationItemUpdateWithWhereUniqueWithoutDonationInput | Prisma.DonationItemUpdateWithWhereUniqueWithoutDonationInput[];
    updateMany?: Prisma.DonationItemUpdateManyWithWhereWithoutDonationInput | Prisma.DonationItemUpdateManyWithWhereWithoutDonationInput[];
    deleteMany?: Prisma.DonationItemScalarWhereInput | Prisma.DonationItemScalarWhereInput[];
};
export type DonationItemCreateWithoutMaterialInput = {
    id?: string;
    quantity: number;
    createdAt?: Date | string;
    donation: Prisma.DonationCreateNestedOneWithoutItemsInput;
};
export type DonationItemUncheckedCreateWithoutMaterialInput = {
    id?: string;
    donationId: string;
    quantity: number;
    createdAt?: Date | string;
};
export type DonationItemCreateOrConnectWithoutMaterialInput = {
    where: Prisma.DonationItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.DonationItemCreateWithoutMaterialInput, Prisma.DonationItemUncheckedCreateWithoutMaterialInput>;
};
export type DonationItemCreateManyMaterialInputEnvelope = {
    data: Prisma.DonationItemCreateManyMaterialInput | Prisma.DonationItemCreateManyMaterialInput[];
    skipDuplicates?: boolean;
};
export type DonationItemUpsertWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.DonationItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.DonationItemUpdateWithoutMaterialInput, Prisma.DonationItemUncheckedUpdateWithoutMaterialInput>;
    create: Prisma.XOR<Prisma.DonationItemCreateWithoutMaterialInput, Prisma.DonationItemUncheckedCreateWithoutMaterialInput>;
};
export type DonationItemUpdateWithWhereUniqueWithoutMaterialInput = {
    where: Prisma.DonationItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.DonationItemUpdateWithoutMaterialInput, Prisma.DonationItemUncheckedUpdateWithoutMaterialInput>;
};
export type DonationItemUpdateManyWithWhereWithoutMaterialInput = {
    where: Prisma.DonationItemScalarWhereInput;
    data: Prisma.XOR<Prisma.DonationItemUpdateManyMutationInput, Prisma.DonationItemUncheckedUpdateManyWithoutMaterialInput>;
};
export type DonationItemScalarWhereInput = {
    AND?: Prisma.DonationItemScalarWhereInput | Prisma.DonationItemScalarWhereInput[];
    OR?: Prisma.DonationItemScalarWhereInput[];
    NOT?: Prisma.DonationItemScalarWhereInput | Prisma.DonationItemScalarWhereInput[];
    id?: Prisma.StringFilter<"DonationItem"> | string;
    donationId?: Prisma.StringFilter<"DonationItem"> | string;
    materialId?: Prisma.StringFilter<"DonationItem"> | string;
    quantity?: Prisma.IntFilter<"DonationItem"> | number;
    createdAt?: Prisma.DateTimeFilter<"DonationItem"> | Date | string;
};
export type DonationItemCreateWithoutDonationInput = {
    id?: string;
    quantity: number;
    createdAt?: Date | string;
    material: Prisma.MaterialCreateNestedOneWithoutDonationItemsInput;
};
export type DonationItemUncheckedCreateWithoutDonationInput = {
    id?: string;
    materialId: string;
    quantity: number;
    createdAt?: Date | string;
};
export type DonationItemCreateOrConnectWithoutDonationInput = {
    where: Prisma.DonationItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.DonationItemCreateWithoutDonationInput, Prisma.DonationItemUncheckedCreateWithoutDonationInput>;
};
export type DonationItemCreateManyDonationInputEnvelope = {
    data: Prisma.DonationItemCreateManyDonationInput | Prisma.DonationItemCreateManyDonationInput[];
    skipDuplicates?: boolean;
};
export type DonationItemUpsertWithWhereUniqueWithoutDonationInput = {
    where: Prisma.DonationItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.DonationItemUpdateWithoutDonationInput, Prisma.DonationItemUncheckedUpdateWithoutDonationInput>;
    create: Prisma.XOR<Prisma.DonationItemCreateWithoutDonationInput, Prisma.DonationItemUncheckedCreateWithoutDonationInput>;
};
export type DonationItemUpdateWithWhereUniqueWithoutDonationInput = {
    where: Prisma.DonationItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.DonationItemUpdateWithoutDonationInput, Prisma.DonationItemUncheckedUpdateWithoutDonationInput>;
};
export type DonationItemUpdateManyWithWhereWithoutDonationInput = {
    where: Prisma.DonationItemScalarWhereInput;
    data: Prisma.XOR<Prisma.DonationItemUpdateManyMutationInput, Prisma.DonationItemUncheckedUpdateManyWithoutDonationInput>;
};
export type DonationItemCreateManyMaterialInput = {
    id?: string;
    donationId: string;
    quantity: number;
    createdAt?: Date | string;
};
export type DonationItemUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    donation?: Prisma.DonationUpdateOneRequiredWithoutItemsNestedInput;
};
export type DonationItemUncheckedUpdateWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    donationId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DonationItemUncheckedUpdateManyWithoutMaterialInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    donationId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DonationItemCreateManyDonationInput = {
    id?: string;
    materialId: string;
    quantity: number;
    createdAt?: Date | string;
};
export type DonationItemUpdateWithoutDonationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    material?: Prisma.MaterialUpdateOneRequiredWithoutDonationItemsNestedInput;
};
export type DonationItemUncheckedUpdateWithoutDonationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DonationItemUncheckedUpdateManyWithoutDonationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    materialId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DonationItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    donationId?: boolean;
    materialId?: boolean;
    quantity?: boolean;
    createdAt?: boolean;
    donation?: boolean | Prisma.DonationDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["donationItem"]>;
export type DonationItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    donationId?: boolean;
    materialId?: boolean;
    quantity?: boolean;
    createdAt?: boolean;
    donation?: boolean | Prisma.DonationDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["donationItem"]>;
export type DonationItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    donationId?: boolean;
    materialId?: boolean;
    quantity?: boolean;
    createdAt?: boolean;
    donation?: boolean | Prisma.DonationDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["donationItem"]>;
export type DonationItemSelectScalar = {
    id?: boolean;
    donationId?: boolean;
    materialId?: boolean;
    quantity?: boolean;
    createdAt?: boolean;
};
export type DonationItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "donationId" | "materialId" | "quantity" | "createdAt", ExtArgs["result"]["donationItem"]>;
export type DonationItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    donation?: boolean | Prisma.DonationDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type DonationItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    donation?: boolean | Prisma.DonationDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type DonationItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    donation?: boolean | Prisma.DonationDefaultArgs<ExtArgs>;
    material?: boolean | Prisma.MaterialDefaultArgs<ExtArgs>;
};
export type $DonationItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DonationItem";
    objects: {
        donation: Prisma.$DonationPayload<ExtArgs>;
        material: Prisma.$MaterialPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        donationId: string;
        materialId: string;
        quantity: number;
        createdAt: Date;
    }, ExtArgs["result"]["donationItem"]>;
    composites: {};
};
export type DonationItemGetPayload<S extends boolean | null | undefined | DonationItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DonationItemPayload, S>;
export type DonationItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DonationItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DonationItemCountAggregateInputType | true;
};
export interface DonationItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DonationItem'];
        meta: {
            name: 'DonationItem';
        };
    };
    /**
     * Find zero or one DonationItem that matches the filter.
     * @param {DonationItemFindUniqueArgs} args - Arguments to find a DonationItem
     * @example
     * // Get one DonationItem
     * const donationItem = await prisma.donationItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DonationItemFindUniqueArgs>(args: Prisma.SelectSubset<T, DonationItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DonationItemClient<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DonationItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DonationItemFindUniqueOrThrowArgs} args - Arguments to find a DonationItem
     * @example
     * // Get one DonationItem
     * const donationItem = await prisma.donationItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DonationItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DonationItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DonationItemClient<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DonationItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationItemFindFirstArgs} args - Arguments to find a DonationItem
     * @example
     * // Get one DonationItem
     * const donationItem = await prisma.donationItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DonationItemFindFirstArgs>(args?: Prisma.SelectSubset<T, DonationItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__DonationItemClient<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DonationItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationItemFindFirstOrThrowArgs} args - Arguments to find a DonationItem
     * @example
     * // Get one DonationItem
     * const donationItem = await prisma.donationItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DonationItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DonationItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DonationItemClient<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DonationItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DonationItems
     * const donationItems = await prisma.donationItem.findMany()
     *
     * // Get first 10 DonationItems
     * const donationItems = await prisma.donationItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const donationItemWithIdOnly = await prisma.donationItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DonationItemFindManyArgs>(args?: Prisma.SelectSubset<T, DonationItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DonationItem.
     * @param {DonationItemCreateArgs} args - Arguments to create a DonationItem.
     * @example
     * // Create one DonationItem
     * const DonationItem = await prisma.donationItem.create({
     *   data: {
     *     // ... data to create a DonationItem
     *   }
     * })
     *
     */
    create<T extends DonationItemCreateArgs>(args: Prisma.SelectSubset<T, DonationItemCreateArgs<ExtArgs>>): Prisma.Prisma__DonationItemClient<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DonationItems.
     * @param {DonationItemCreateManyArgs} args - Arguments to create many DonationItems.
     * @example
     * // Create many DonationItems
     * const donationItem = await prisma.donationItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DonationItemCreateManyArgs>(args?: Prisma.SelectSubset<T, DonationItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DonationItems and returns the data saved in the database.
     * @param {DonationItemCreateManyAndReturnArgs} args - Arguments to create many DonationItems.
     * @example
     * // Create many DonationItems
     * const donationItem = await prisma.donationItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DonationItems and only return the `id`
     * const donationItemWithIdOnly = await prisma.donationItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DonationItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DonationItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DonationItem.
     * @param {DonationItemDeleteArgs} args - Arguments to delete one DonationItem.
     * @example
     * // Delete one DonationItem
     * const DonationItem = await prisma.donationItem.delete({
     *   where: {
     *     // ... filter to delete one DonationItem
     *   }
     * })
     *
     */
    delete<T extends DonationItemDeleteArgs>(args: Prisma.SelectSubset<T, DonationItemDeleteArgs<ExtArgs>>): Prisma.Prisma__DonationItemClient<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DonationItem.
     * @param {DonationItemUpdateArgs} args - Arguments to update one DonationItem.
     * @example
     * // Update one DonationItem
     * const donationItem = await prisma.donationItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DonationItemUpdateArgs>(args: Prisma.SelectSubset<T, DonationItemUpdateArgs<ExtArgs>>): Prisma.Prisma__DonationItemClient<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DonationItems.
     * @param {DonationItemDeleteManyArgs} args - Arguments to filter DonationItems to delete.
     * @example
     * // Delete a few DonationItems
     * const { count } = await prisma.donationItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DonationItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, DonationItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DonationItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DonationItems
     * const donationItem = await prisma.donationItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DonationItemUpdateManyArgs>(args: Prisma.SelectSubset<T, DonationItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DonationItems and returns the data updated in the database.
     * @param {DonationItemUpdateManyAndReturnArgs} args - Arguments to update many DonationItems.
     * @example
     * // Update many DonationItems
     * const donationItem = await prisma.donationItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DonationItems and only return the `id`
     * const donationItemWithIdOnly = await prisma.donationItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends DonationItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DonationItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DonationItem.
     * @param {DonationItemUpsertArgs} args - Arguments to update or create a DonationItem.
     * @example
     * // Update or create a DonationItem
     * const donationItem = await prisma.donationItem.upsert({
     *   create: {
     *     // ... data to create a DonationItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DonationItem we want to update
     *   }
     * })
     */
    upsert<T extends DonationItemUpsertArgs>(args: Prisma.SelectSubset<T, DonationItemUpsertArgs<ExtArgs>>): Prisma.Prisma__DonationItemClient<runtime.Types.Result.GetResult<Prisma.$DonationItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DonationItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationItemCountArgs} args - Arguments to filter DonationItems to count.
     * @example
     * // Count the number of DonationItems
     * const count = await prisma.donationItem.count({
     *   where: {
     *     // ... the filter for the DonationItems we want to count
     *   }
     * })
    **/
    count<T extends DonationItemCountArgs>(args?: Prisma.Subset<T, DonationItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DonationItemCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DonationItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DonationItemAggregateArgs>(args: Prisma.Subset<T, DonationItemAggregateArgs>): Prisma.PrismaPromise<GetDonationItemAggregateType<T>>;
    /**
     * Group by DonationItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationItemGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DonationItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DonationItemGroupByArgs['orderBy'];
    } : {
        orderBy?: DonationItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DonationItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDonationItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DonationItem model
     */
    readonly fields: DonationItemFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DonationItem.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DonationItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    donation<T extends Prisma.DonationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DonationDefaultArgs<ExtArgs>>): Prisma.Prisma__DonationClient<runtime.Types.Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the DonationItem model
 */
export interface DonationItemFieldRefs {
    readonly id: Prisma.FieldRef<"DonationItem", 'String'>;
    readonly donationId: Prisma.FieldRef<"DonationItem", 'String'>;
    readonly materialId: Prisma.FieldRef<"DonationItem", 'String'>;
    readonly quantity: Prisma.FieldRef<"DonationItem", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"DonationItem", 'DateTime'>;
}
/**
 * DonationItem findUnique
 */
export type DonationItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DonationItem to fetch.
     */
    where: Prisma.DonationItemWhereUniqueInput;
};
/**
 * DonationItem findUniqueOrThrow
 */
export type DonationItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DonationItem to fetch.
     */
    where: Prisma.DonationItemWhereUniqueInput;
};
/**
 * DonationItem findFirst
 */
export type DonationItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DonationItem to fetch.
     */
    where?: Prisma.DonationItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DonationItems to fetch.
     */
    orderBy?: Prisma.DonationItemOrderByWithRelationInput | Prisma.DonationItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DonationItems.
     */
    cursor?: Prisma.DonationItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DonationItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DonationItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DonationItems.
     */
    distinct?: Prisma.DonationItemScalarFieldEnum | Prisma.DonationItemScalarFieldEnum[];
};
/**
 * DonationItem findFirstOrThrow
 */
export type DonationItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DonationItem to fetch.
     */
    where?: Prisma.DonationItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DonationItems to fetch.
     */
    orderBy?: Prisma.DonationItemOrderByWithRelationInput | Prisma.DonationItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DonationItems.
     */
    cursor?: Prisma.DonationItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DonationItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DonationItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DonationItems.
     */
    distinct?: Prisma.DonationItemScalarFieldEnum | Prisma.DonationItemScalarFieldEnum[];
};
/**
 * DonationItem findMany
 */
export type DonationItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DonationItems to fetch.
     */
    where?: Prisma.DonationItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DonationItems to fetch.
     */
    orderBy?: Prisma.DonationItemOrderByWithRelationInput | Prisma.DonationItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DonationItems.
     */
    cursor?: Prisma.DonationItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DonationItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DonationItems.
     */
    skip?: number;
    distinct?: Prisma.DonationItemScalarFieldEnum | Prisma.DonationItemScalarFieldEnum[];
};
/**
 * DonationItem create
 */
export type DonationItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a DonationItem.
     */
    data: Prisma.XOR<Prisma.DonationItemCreateInput, Prisma.DonationItemUncheckedCreateInput>;
};
/**
 * DonationItem createMany
 */
export type DonationItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DonationItems.
     */
    data: Prisma.DonationItemCreateManyInput | Prisma.DonationItemCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DonationItem createManyAndReturn
 */
export type DonationItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationItem
     */
    select?: Prisma.DonationItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DonationItem
     */
    omit?: Prisma.DonationItemOmit<ExtArgs> | null;
    /**
     * The data used to create many DonationItems.
     */
    data: Prisma.DonationItemCreateManyInput | Prisma.DonationItemCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DonationItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DonationItem update
 */
export type DonationItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a DonationItem.
     */
    data: Prisma.XOR<Prisma.DonationItemUpdateInput, Prisma.DonationItemUncheckedUpdateInput>;
    /**
     * Choose, which DonationItem to update.
     */
    where: Prisma.DonationItemWhereUniqueInput;
};
/**
 * DonationItem updateMany
 */
export type DonationItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DonationItems.
     */
    data: Prisma.XOR<Prisma.DonationItemUpdateManyMutationInput, Prisma.DonationItemUncheckedUpdateManyInput>;
    /**
     * Filter which DonationItems to update
     */
    where?: Prisma.DonationItemWhereInput;
    /**
     * Limit how many DonationItems to update.
     */
    limit?: number;
};
/**
 * DonationItem updateManyAndReturn
 */
export type DonationItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DonationItem
     */
    select?: Prisma.DonationItemSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DonationItem
     */
    omit?: Prisma.DonationItemOmit<ExtArgs> | null;
    /**
     * The data used to update DonationItems.
     */
    data: Prisma.XOR<Prisma.DonationItemUpdateManyMutationInput, Prisma.DonationItemUncheckedUpdateManyInput>;
    /**
     * Filter which DonationItems to update
     */
    where?: Prisma.DonationItemWhereInput;
    /**
     * Limit how many DonationItems to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DonationItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DonationItem upsert
 */
export type DonationItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the DonationItem to update in case it exists.
     */
    where: Prisma.DonationItemWhereUniqueInput;
    /**
     * In case the DonationItem found by the `where` argument doesn't exist, create a new DonationItem with this data.
     */
    create: Prisma.XOR<Prisma.DonationItemCreateInput, Prisma.DonationItemUncheckedCreateInput>;
    /**
     * In case the DonationItem was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DonationItemUpdateInput, Prisma.DonationItemUncheckedUpdateInput>;
};
/**
 * DonationItem delete
 */
export type DonationItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which DonationItem to delete.
     */
    where: Prisma.DonationItemWhereUniqueInput;
};
/**
 * DonationItem deleteMany
 */
export type DonationItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DonationItems to delete
     */
    where?: Prisma.DonationItemWhereInput;
    /**
     * Limit how many DonationItems to delete.
     */
    limit?: number;
};
/**
 * DonationItem without action
 */
export type DonationItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=DonationItem.d.ts.map