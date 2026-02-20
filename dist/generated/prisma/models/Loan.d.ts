import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Loan
 *
 */
export type LoanModel = runtime.Types.Result.DefaultSelection<Prisma.$LoanPayload>;
export type AggregateLoan = {
    _count: LoanCountAggregateOutputType | null;
    _min: LoanMinAggregateOutputType | null;
    _max: LoanMaxAggregateOutputType | null;
};
export type LoanMinAggregateOutputType = {
    id: string | null;
    personId: string | null;
    borrowedAt: Date | null;
    expectedReturnAt: Date | null;
    returnedAt: Date | null;
    status: $Enums.LoanStatus | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LoanMaxAggregateOutputType = {
    id: string | null;
    personId: string | null;
    borrowedAt: Date | null;
    expectedReturnAt: Date | null;
    returnedAt: Date | null;
    status: $Enums.LoanStatus | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LoanCountAggregateOutputType = {
    id: number;
    personId: number;
    borrowedAt: number;
    expectedReturnAt: number;
    returnedAt: number;
    status: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LoanMinAggregateInputType = {
    id?: true;
    personId?: true;
    borrowedAt?: true;
    expectedReturnAt?: true;
    returnedAt?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LoanMaxAggregateInputType = {
    id?: true;
    personId?: true;
    borrowedAt?: true;
    expectedReturnAt?: true;
    returnedAt?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LoanCountAggregateInputType = {
    id?: true;
    personId?: true;
    borrowedAt?: true;
    expectedReturnAt?: true;
    returnedAt?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LoanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Loan to aggregate.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Loans
    **/
    _count?: true | LoanCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LoanMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LoanMaxAggregateInputType;
};
export type GetLoanAggregateType<T extends LoanAggregateArgs> = {
    [P in keyof T & keyof AggregateLoan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLoan[P]> : Prisma.GetScalarType<T[P], AggregateLoan[P]>;
};
export type LoanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanWhereInput;
    orderBy?: Prisma.LoanOrderByWithAggregationInput | Prisma.LoanOrderByWithAggregationInput[];
    by: Prisma.LoanScalarFieldEnum[] | Prisma.LoanScalarFieldEnum;
    having?: Prisma.LoanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LoanCountAggregateInputType | true;
    _min?: LoanMinAggregateInputType;
    _max?: LoanMaxAggregateInputType;
};
export type LoanGroupByOutputType = {
    id: string;
    personId: string;
    borrowedAt: Date;
    expectedReturnAt: Date;
    returnedAt: Date | null;
    status: $Enums.LoanStatus;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: LoanCountAggregateOutputType | null;
    _min: LoanMinAggregateOutputType | null;
    _max: LoanMaxAggregateOutputType | null;
};
type GetLoanGroupByPayload<T extends LoanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LoanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LoanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LoanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LoanGroupByOutputType[P]>;
}>>;
export type LoanWhereInput = {
    AND?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    OR?: Prisma.LoanWhereInput[];
    NOT?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    id?: Prisma.StringFilter<"Loan"> | string;
    personId?: Prisma.StringFilter<"Loan"> | string;
    borrowedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    expectedReturnAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    status?: Prisma.EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus;
    notes?: Prisma.StringNullableFilter<"Loan"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    person?: Prisma.XOR<Prisma.PersonScalarRelationFilter, Prisma.PersonWhereInput>;
    items?: Prisma.LoanItemListRelationFilter;
};
export type LoanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    personId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    expectedReturnAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    person?: Prisma.PersonOrderByWithRelationInput;
    items?: Prisma.LoanItemOrderByRelationAggregateInput;
};
export type LoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    OR?: Prisma.LoanWhereInput[];
    NOT?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    personId?: Prisma.StringFilter<"Loan"> | string;
    borrowedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    expectedReturnAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    status?: Prisma.EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus;
    notes?: Prisma.StringNullableFilter<"Loan"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    person?: Prisma.XOR<Prisma.PersonScalarRelationFilter, Prisma.PersonWhereInput>;
    items?: Prisma.LoanItemListRelationFilter;
}, "id">;
export type LoanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    personId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    expectedReturnAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LoanCountOrderByAggregateInput;
    _max?: Prisma.LoanMaxOrderByAggregateInput;
    _min?: Prisma.LoanMinOrderByAggregateInput;
};
export type LoanScalarWhereWithAggregatesInput = {
    AND?: Prisma.LoanScalarWhereWithAggregatesInput | Prisma.LoanScalarWhereWithAggregatesInput[];
    OR?: Prisma.LoanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LoanScalarWhereWithAggregatesInput | Prisma.LoanScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Loan"> | string;
    personId?: Prisma.StringWithAggregatesFilter<"Loan"> | string;
    borrowedAt?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
    expectedReturnAt?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    status?: Prisma.EnumLoanStatusWithAggregatesFilter<"Loan"> | $Enums.LoanStatus;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Loan"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
};
export type LoanCreateInput = {
    id?: string;
    borrowedAt?: Date | string;
    expectedReturnAt: Date | string;
    returnedAt?: Date | string | null;
    status?: $Enums.LoanStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    person: Prisma.PersonCreateNestedOneWithoutLoansInput;
    items?: Prisma.LoanItemCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateInput = {
    id?: string;
    personId: string;
    borrowedAt?: Date | string;
    expectedReturnAt: Date | string;
    returnedAt?: Date | string | null;
    status?: $Enums.LoanStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.LoanItemUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expectedReturnAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    person?: Prisma.PersonUpdateOneRequiredWithoutLoansNestedInput;
    items?: Prisma.LoanItemUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    personId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expectedReturnAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.LoanItemUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanCreateManyInput = {
    id?: string;
    personId: string;
    borrowedAt?: Date | string;
    expectedReturnAt: Date | string;
    returnedAt?: Date | string | null;
    status?: $Enums.LoanStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expectedReturnAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    personId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expectedReturnAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanListRelationFilter = {
    every?: Prisma.LoanWhereInput;
    some?: Prisma.LoanWhereInput;
    none?: Prisma.LoanWhereInput;
};
export type LoanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LoanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    personId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    expectedReturnAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LoanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    personId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    expectedReturnAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LoanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    personId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    expectedReturnAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LoanScalarRelationFilter = {
    is?: Prisma.LoanWhereInput;
    isNot?: Prisma.LoanWhereInput;
};
export type LoanCreateNestedManyWithoutPersonInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutPersonInput, Prisma.LoanUncheckedCreateWithoutPersonInput> | Prisma.LoanCreateWithoutPersonInput[] | Prisma.LoanUncheckedCreateWithoutPersonInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutPersonInput | Prisma.LoanCreateOrConnectWithoutPersonInput[];
    createMany?: Prisma.LoanCreateManyPersonInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutPersonInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutPersonInput, Prisma.LoanUncheckedCreateWithoutPersonInput> | Prisma.LoanCreateWithoutPersonInput[] | Prisma.LoanUncheckedCreateWithoutPersonInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutPersonInput | Prisma.LoanCreateOrConnectWithoutPersonInput[];
    createMany?: Prisma.LoanCreateManyPersonInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUpdateManyWithoutPersonNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutPersonInput, Prisma.LoanUncheckedCreateWithoutPersonInput> | Prisma.LoanCreateWithoutPersonInput[] | Prisma.LoanUncheckedCreateWithoutPersonInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutPersonInput | Prisma.LoanCreateOrConnectWithoutPersonInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutPersonInput | Prisma.LoanUpsertWithWhereUniqueWithoutPersonInput[];
    createMany?: Prisma.LoanCreateManyPersonInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutPersonInput | Prisma.LoanUpdateWithWhereUniqueWithoutPersonInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutPersonInput | Prisma.LoanUpdateManyWithWhereWithoutPersonInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutPersonNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutPersonInput, Prisma.LoanUncheckedCreateWithoutPersonInput> | Prisma.LoanCreateWithoutPersonInput[] | Prisma.LoanUncheckedCreateWithoutPersonInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutPersonInput | Prisma.LoanCreateOrConnectWithoutPersonInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutPersonInput | Prisma.LoanUpsertWithWhereUniqueWithoutPersonInput[];
    createMany?: Prisma.LoanCreateManyPersonInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutPersonInput | Prisma.LoanUpdateWithWhereUniqueWithoutPersonInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutPersonInput | Prisma.LoanUpdateManyWithWhereWithoutPersonInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus;
};
export type LoanCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutItemsInput, Prisma.LoanUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutItemsInput;
    connect?: Prisma.LoanWhereUniqueInput;
};
export type LoanUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutItemsInput, Prisma.LoanUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.LoanUpsertWithoutItemsInput;
    connect?: Prisma.LoanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LoanUpdateToOneWithWhereWithoutItemsInput, Prisma.LoanUpdateWithoutItemsInput>, Prisma.LoanUncheckedUpdateWithoutItemsInput>;
};
export type LoanCreateWithoutPersonInput = {
    id?: string;
    borrowedAt?: Date | string;
    expectedReturnAt: Date | string;
    returnedAt?: Date | string | null;
    status?: $Enums.LoanStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.LoanItemCreateNestedManyWithoutLoanInput;
};
export type LoanUncheckedCreateWithoutPersonInput = {
    id?: string;
    borrowedAt?: Date | string;
    expectedReturnAt: Date | string;
    returnedAt?: Date | string | null;
    status?: $Enums.LoanStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.LoanItemUncheckedCreateNestedManyWithoutLoanInput;
};
export type LoanCreateOrConnectWithoutPersonInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutPersonInput, Prisma.LoanUncheckedCreateWithoutPersonInput>;
};
export type LoanCreateManyPersonInputEnvelope = {
    data: Prisma.LoanCreateManyPersonInput | Prisma.LoanCreateManyPersonInput[];
    skipDuplicates?: boolean;
};
export type LoanUpsertWithWhereUniqueWithoutPersonInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutPersonInput, Prisma.LoanUncheckedUpdateWithoutPersonInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutPersonInput, Prisma.LoanUncheckedCreateWithoutPersonInput>;
};
export type LoanUpdateWithWhereUniqueWithoutPersonInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutPersonInput, Prisma.LoanUncheckedUpdateWithoutPersonInput>;
};
export type LoanUpdateManyWithWhereWithoutPersonInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutPersonInput>;
};
export type LoanScalarWhereInput = {
    AND?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
    OR?: Prisma.LoanScalarWhereInput[];
    NOT?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
    id?: Prisma.StringFilter<"Loan"> | string;
    personId?: Prisma.StringFilter<"Loan"> | string;
    borrowedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    expectedReturnAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    status?: Prisma.EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus;
    notes?: Prisma.StringNullableFilter<"Loan"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
};
export type LoanCreateWithoutItemsInput = {
    id?: string;
    borrowedAt?: Date | string;
    expectedReturnAt: Date | string;
    returnedAt?: Date | string | null;
    status?: $Enums.LoanStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    person: Prisma.PersonCreateNestedOneWithoutLoansInput;
};
export type LoanUncheckedCreateWithoutItemsInput = {
    id?: string;
    personId: string;
    borrowedAt?: Date | string;
    expectedReturnAt: Date | string;
    returnedAt?: Date | string | null;
    status?: $Enums.LoanStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanCreateOrConnectWithoutItemsInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutItemsInput, Prisma.LoanUncheckedCreateWithoutItemsInput>;
};
export type LoanUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.LoanUpdateWithoutItemsInput, Prisma.LoanUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutItemsInput, Prisma.LoanUncheckedCreateWithoutItemsInput>;
    where?: Prisma.LoanWhereInput;
};
export type LoanUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.LoanWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutItemsInput, Prisma.LoanUncheckedUpdateWithoutItemsInput>;
};
export type LoanUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expectedReturnAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    person?: Prisma.PersonUpdateOneRequiredWithoutLoansNestedInput;
};
export type LoanUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    personId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expectedReturnAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanCreateManyPersonInput = {
    id?: string;
    borrowedAt?: Date | string;
    expectedReturnAt: Date | string;
    returnedAt?: Date | string | null;
    status?: $Enums.LoanStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LoanUpdateWithoutPersonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expectedReturnAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.LoanItemUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateWithoutPersonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expectedReturnAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.LoanItemUncheckedUpdateManyWithoutLoanNestedInput;
};
export type LoanUncheckedUpdateManyWithoutPersonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expectedReturnAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type LoanCountOutputType
 */
export type LoanCountOutputType = {
    items: number;
};
export type LoanCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | LoanCountOutputTypeCountItemsArgs;
};
/**
 * LoanCountOutputType without action
 */
export type LoanCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanCountOutputType
     */
    select?: Prisma.LoanCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * LoanCountOutputType without action
 */
export type LoanCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanItemWhereInput;
};
export type LoanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    personId?: boolean;
    borrowedAt?: boolean;
    expectedReturnAt?: boolean;
    returnedAt?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    person?: boolean | Prisma.PersonDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.Loan$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.LoanCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    personId?: boolean;
    borrowedAt?: boolean;
    expectedReturnAt?: boolean;
    returnedAt?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    person?: boolean | Prisma.PersonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    personId?: boolean;
    borrowedAt?: boolean;
    expectedReturnAt?: boolean;
    returnedAt?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    person?: boolean | Prisma.PersonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectScalar = {
    id?: boolean;
    personId?: boolean;
    borrowedAt?: boolean;
    expectedReturnAt?: boolean;
    returnedAt?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LoanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "personId" | "borrowedAt" | "expectedReturnAt" | "returnedAt" | "status" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["loan"]>;
export type LoanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    person?: boolean | Prisma.PersonDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.Loan$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.LoanCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LoanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    person?: boolean | Prisma.PersonDefaultArgs<ExtArgs>;
};
export type LoanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    person?: boolean | Prisma.PersonDefaultArgs<ExtArgs>;
};
export type $LoanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Loan";
    objects: {
        person: Prisma.$PersonPayload<ExtArgs>;
        items: Prisma.$LoanItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        personId: string;
        borrowedAt: Date;
        expectedReturnAt: Date;
        returnedAt: Date | null;
        status: $Enums.LoanStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["loan"]>;
    composites: {};
};
export type LoanGetPayload<S extends boolean | null | undefined | LoanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LoanPayload, S>;
export type LoanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LoanCountAggregateInputType | true;
};
export interface LoanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Loan'];
        meta: {
            name: 'Loan';
        };
    };
    /**
     * Find zero or one Loan that matches the filter.
     * @param {LoanFindUniqueArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanFindUniqueArgs>(args: Prisma.SelectSubset<T, LoanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Loan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanFindUniqueOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Loan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanFindFirstArgs>(args?: Prisma.SelectSubset<T, LoanFindFirstArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Loan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LoanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Loans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loans
     * const loans = await prisma.loan.findMany()
     *
     * // Get first 10 Loans
     * const loans = await prisma.loan.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const loanWithIdOnly = await prisma.loan.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LoanFindManyArgs>(args?: Prisma.SelectSubset<T, LoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Loan.
     * @param {LoanCreateArgs} args - Arguments to create a Loan.
     * @example
     * // Create one Loan
     * const Loan = await prisma.loan.create({
     *   data: {
     *     // ... data to create a Loan
     *   }
     * })
     *
     */
    create<T extends LoanCreateArgs>(args: Prisma.SelectSubset<T, LoanCreateArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Loans.
     * @param {LoanCreateManyArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LoanCreateManyArgs>(args?: Prisma.SelectSubset<T, LoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Loans and returns the data saved in the database.
     * @param {LoanCreateManyAndReturnArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LoanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Loan.
     * @param {LoanDeleteArgs} args - Arguments to delete one Loan.
     * @example
     * // Delete one Loan
     * const Loan = await prisma.loan.delete({
     *   where: {
     *     // ... filter to delete one Loan
     *   }
     * })
     *
     */
    delete<T extends LoanDeleteArgs>(args: Prisma.SelectSubset<T, LoanDeleteArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Loan.
     * @param {LoanUpdateArgs} args - Arguments to update one Loan.
     * @example
     * // Update one Loan
     * const loan = await prisma.loan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LoanUpdateArgs>(args: Prisma.SelectSubset<T, LoanUpdateArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Loans.
     * @param {LoanDeleteManyArgs} args - Arguments to filter Loans to delete.
     * @example
     * // Delete a few Loans
     * const { count } = await prisma.loan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LoanDeleteManyArgs>(args?: Prisma.SelectSubset<T, LoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LoanUpdateManyArgs>(args: Prisma.SelectSubset<T, LoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Loans and returns the data updated in the database.
     * @param {LoanUpdateManyAndReturnArgs} args - Arguments to update many Loans.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.updateManyAndReturn({
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
    updateManyAndReturn<T extends LoanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LoanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Loan.
     * @param {LoanUpsertArgs} args - Arguments to update or create a Loan.
     * @example
     * // Update or create a Loan
     * const loan = await prisma.loan.upsert({
     *   create: {
     *     // ... data to create a Loan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loan we want to update
     *   }
     * })
     */
    upsert<T extends LoanUpsertArgs>(args: Prisma.SelectSubset<T, LoanUpsertArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanCountArgs} args - Arguments to filter Loans to count.
     * @example
     * // Count the number of Loans
     * const count = await prisma.loan.count({
     *   where: {
     *     // ... the filter for the Loans we want to count
     *   }
     * })
    **/
    count<T extends LoanCountArgs>(args?: Prisma.Subset<T, LoanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LoanCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LoanAggregateArgs>(args: Prisma.Subset<T, LoanAggregateArgs>): Prisma.PrismaPromise<GetLoanAggregateType<T>>;
    /**
     * Group by Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanGroupByArgs} args - Group by arguments.
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
    groupBy<T extends LoanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LoanGroupByArgs['orderBy'];
    } : {
        orderBy?: LoanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Loan model
     */
    readonly fields: LoanFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Loan.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__LoanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    person<T extends Prisma.PersonDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PersonDefaultArgs<ExtArgs>>): Prisma.Prisma__PersonClient<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.Loan$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Loan$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Loan model
 */
export interface LoanFieldRefs {
    readonly id: Prisma.FieldRef<"Loan", 'String'>;
    readonly personId: Prisma.FieldRef<"Loan", 'String'>;
    readonly borrowedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly expectedReturnAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly returnedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Loan", 'LoanStatus'>;
    readonly notes: Prisma.FieldRef<"Loan", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
}
/**
 * Loan findUnique
 */
export type LoanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan findUniqueOrThrow
 */
export type LoanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan findFirst
 */
export type LoanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Loans.
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Loans.
     */
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Loan findFirstOrThrow
 */
export type LoanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Loans.
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Loans.
     */
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Loan findMany
 */
export type LoanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loans to fetch.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Loans.
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Loan create
 */
export type LoanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * The data needed to create a Loan.
     */
    data: Prisma.XOR<Prisma.LoanCreateInput, Prisma.LoanUncheckedCreateInput>;
};
/**
 * Loan createMany
 */
export type LoanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Loans.
     */
    data: Prisma.LoanCreateManyInput | Prisma.LoanCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Loan createManyAndReturn
 */
export type LoanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * The data used to create many Loans.
     */
    data: Prisma.LoanCreateManyInput | Prisma.LoanCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Loan update
 */
export type LoanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * The data needed to update a Loan.
     */
    data: Prisma.XOR<Prisma.LoanUpdateInput, Prisma.LoanUncheckedUpdateInput>;
    /**
     * Choose, which Loan to update.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan updateMany
 */
export type LoanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Loans.
     */
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyInput>;
    /**
     * Filter which Loans to update
     */
    where?: Prisma.LoanWhereInput;
    /**
     * Limit how many Loans to update.
     */
    limit?: number;
};
/**
 * Loan updateManyAndReturn
 */
export type LoanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * The data used to update Loans.
     */
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyInput>;
    /**
     * Filter which Loans to update
     */
    where?: Prisma.LoanWhereInput;
    /**
     * Limit how many Loans to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Loan upsert
 */
export type LoanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * The filter to search for the Loan to update in case it exists.
     */
    where: Prisma.LoanWhereUniqueInput;
    /**
     * In case the Loan found by the `where` argument doesn't exist, create a new Loan with this data.
     */
    create: Prisma.XOR<Prisma.LoanCreateInput, Prisma.LoanUncheckedCreateInput>;
    /**
     * In case the Loan was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.LoanUpdateInput, Prisma.LoanUncheckedUpdateInput>;
};
/**
 * Loan delete
 */
export type LoanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter which Loan to delete.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan deleteMany
 */
export type LoanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Loans to delete
     */
    where?: Prisma.LoanWhereInput;
    /**
     * Limit how many Loans to delete.
     */
    limit?: number;
};
/**
 * Loan.items
 */
export type Loan$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Loan without action
 */
export type LoanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Loan.d.ts.map