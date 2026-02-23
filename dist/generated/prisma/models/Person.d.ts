import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Person
 *
 */
export type PersonModel = runtime.Types.Result.DefaultSelection<Prisma.$PersonPayload>;
export type AggregatePerson = {
    _count: PersonCountAggregateOutputType | null;
    _min: PersonMinAggregateOutputType | null;
    _max: PersonMaxAggregateOutputType | null;
};
export type PersonMinAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    church: string | null;
    isVisitor: boolean | null;
    isBorrower: boolean | null;
    isBuyer: boolean | null;
    isDonor: boolean | null;
    isSupplier: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type PersonMaxAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    church: string | null;
    isVisitor: boolean | null;
    isBorrower: boolean | null;
    isBuyer: boolean | null;
    isDonor: boolean | null;
    isSupplier: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type PersonCountAggregateOutputType = {
    id: number;
    firstName: number;
    lastName: number;
    phone: number;
    email: number;
    address: number;
    church: number;
    isVisitor: number;
    isBorrower: number;
    isBuyer: number;
    isDonor: number;
    isSupplier: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type PersonMinAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    phone?: true;
    email?: true;
    address?: true;
    church?: true;
    isVisitor?: true;
    isBorrower?: true;
    isBuyer?: true;
    isDonor?: true;
    isSupplier?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type PersonMaxAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    phone?: true;
    email?: true;
    address?: true;
    church?: true;
    isVisitor?: true;
    isBorrower?: true;
    isBuyer?: true;
    isDonor?: true;
    isSupplier?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type PersonCountAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    phone?: true;
    email?: true;
    address?: true;
    church?: true;
    isVisitor?: true;
    isBorrower?: true;
    isBuyer?: true;
    isDonor?: true;
    isSupplier?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type PersonAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Person to aggregate.
     */
    where?: Prisma.PersonWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of People to fetch.
     */
    orderBy?: Prisma.PersonOrderByWithRelationInput | Prisma.PersonOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PersonWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` People from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` People.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned People
    **/
    _count?: true | PersonCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PersonMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PersonMaxAggregateInputType;
};
export type GetPersonAggregateType<T extends PersonAggregateArgs> = {
    [P in keyof T & keyof AggregatePerson]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePerson[P]> : Prisma.GetScalarType<T[P], AggregatePerson[P]>;
};
export type PersonGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PersonWhereInput;
    orderBy?: Prisma.PersonOrderByWithAggregationInput | Prisma.PersonOrderByWithAggregationInput[];
    by: Prisma.PersonScalarFieldEnum[] | Prisma.PersonScalarFieldEnum;
    having?: Prisma.PersonScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PersonCountAggregateInputType | true;
    _min?: PersonMinAggregateInputType;
    _max?: PersonMaxAggregateInputType;
};
export type PersonGroupByOutputType = {
    id: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string | null;
    address: string | null;
    church: string | null;
    isVisitor: boolean;
    isBorrower: boolean;
    isBuyer: boolean;
    isDonor: boolean;
    isSupplier: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: PersonCountAggregateOutputType | null;
    _min: PersonMinAggregateOutputType | null;
    _max: PersonMaxAggregateOutputType | null;
};
type GetPersonGroupByPayload<T extends PersonGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PersonGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PersonGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PersonGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PersonGroupByOutputType[P]>;
}>>;
export type PersonWhereInput = {
    AND?: Prisma.PersonWhereInput | Prisma.PersonWhereInput[];
    OR?: Prisma.PersonWhereInput[];
    NOT?: Prisma.PersonWhereInput | Prisma.PersonWhereInput[];
    id?: Prisma.StringFilter<"Person"> | string;
    firstName?: Prisma.StringFilter<"Person"> | string;
    lastName?: Prisma.StringFilter<"Person"> | string;
    phone?: Prisma.StringNullableFilter<"Person"> | string | null;
    email?: Prisma.StringNullableFilter<"Person"> | string | null;
    address?: Prisma.StringNullableFilter<"Person"> | string | null;
    church?: Prisma.StringNullableFilter<"Person"> | string | null;
    isVisitor?: Prisma.BoolFilter<"Person"> | boolean;
    isBorrower?: Prisma.BoolFilter<"Person"> | boolean;
    isBuyer?: Prisma.BoolFilter<"Person"> | boolean;
    isDonor?: Prisma.BoolFilter<"Person"> | boolean;
    isSupplier?: Prisma.BoolFilter<"Person"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Person"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Person"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Person"> | Date | string | null;
    donations?: Prisma.DonationListRelationFilter;
    loans?: Prisma.LoanListRelationFilter;
    purchases?: Prisma.PurchaseListRelationFilter;
    sales?: Prisma.SaleListRelationFilter;
    visits?: Prisma.VisitorLogListRelationFilter;
};
export type PersonOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    church?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVisitor?: Prisma.SortOrder;
    isBorrower?: Prisma.SortOrder;
    isBuyer?: Prisma.SortOrder;
    isDonor?: Prisma.SortOrder;
    isSupplier?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    donations?: Prisma.DonationOrderByRelationAggregateInput;
    loans?: Prisma.LoanOrderByRelationAggregateInput;
    purchases?: Prisma.PurchaseOrderByRelationAggregateInput;
    sales?: Prisma.SaleOrderByRelationAggregateInput;
    visits?: Prisma.VisitorLogOrderByRelationAggregateInput;
};
export type PersonWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.PersonWhereInput | Prisma.PersonWhereInput[];
    OR?: Prisma.PersonWhereInput[];
    NOT?: Prisma.PersonWhereInput | Prisma.PersonWhereInput[];
    firstName?: Prisma.StringFilter<"Person"> | string;
    lastName?: Prisma.StringFilter<"Person"> | string;
    phone?: Prisma.StringNullableFilter<"Person"> | string | null;
    address?: Prisma.StringNullableFilter<"Person"> | string | null;
    church?: Prisma.StringNullableFilter<"Person"> | string | null;
    isVisitor?: Prisma.BoolFilter<"Person"> | boolean;
    isBorrower?: Prisma.BoolFilter<"Person"> | boolean;
    isBuyer?: Prisma.BoolFilter<"Person"> | boolean;
    isDonor?: Prisma.BoolFilter<"Person"> | boolean;
    isSupplier?: Prisma.BoolFilter<"Person"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Person"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Person"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Person"> | Date | string | null;
    donations?: Prisma.DonationListRelationFilter;
    loans?: Prisma.LoanListRelationFilter;
    purchases?: Prisma.PurchaseListRelationFilter;
    sales?: Prisma.SaleListRelationFilter;
    visits?: Prisma.VisitorLogListRelationFilter;
}, "id" | "email">;
export type PersonOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    church?: Prisma.SortOrderInput | Prisma.SortOrder;
    isVisitor?: Prisma.SortOrder;
    isBorrower?: Prisma.SortOrder;
    isBuyer?: Prisma.SortOrder;
    isDonor?: Prisma.SortOrder;
    isSupplier?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PersonCountOrderByAggregateInput;
    _max?: Prisma.PersonMaxOrderByAggregateInput;
    _min?: Prisma.PersonMinOrderByAggregateInput;
};
export type PersonScalarWhereWithAggregatesInput = {
    AND?: Prisma.PersonScalarWhereWithAggregatesInput | Prisma.PersonScalarWhereWithAggregatesInput[];
    OR?: Prisma.PersonScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PersonScalarWhereWithAggregatesInput | Prisma.PersonScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Person"> | string;
    firstName?: Prisma.StringWithAggregatesFilter<"Person"> | string;
    lastName?: Prisma.StringWithAggregatesFilter<"Person"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Person"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"Person"> | string | null;
    address?: Prisma.StringNullableWithAggregatesFilter<"Person"> | string | null;
    church?: Prisma.StringNullableWithAggregatesFilter<"Person"> | string | null;
    isVisitor?: Prisma.BoolWithAggregatesFilter<"Person"> | boolean;
    isBorrower?: Prisma.BoolWithAggregatesFilter<"Person"> | boolean;
    isBuyer?: Prisma.BoolWithAggregatesFilter<"Person"> | boolean;
    isDonor?: Prisma.BoolWithAggregatesFilter<"Person"> | boolean;
    isSupplier?: Prisma.BoolWithAggregatesFilter<"Person"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Person"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Person"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null;
};
export type PersonCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationCreateNestedManyWithoutDonorInput;
    loans?: Prisma.LoanCreateNestedManyWithoutPersonInput;
    purchases?: Prisma.PurchaseCreateNestedManyWithoutSupplierInput;
    sales?: Prisma.SaleCreateNestedManyWithoutPersonInput;
    visits?: Prisma.VisitorLogCreateNestedManyWithoutPersonInput;
};
export type PersonUncheckedCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutDonorInput;
    loans?: Prisma.LoanUncheckedCreateNestedManyWithoutPersonInput;
    purchases?: Prisma.PurchaseUncheckedCreateNestedManyWithoutSupplierInput;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutPersonInput;
    visits?: Prisma.VisitorLogUncheckedCreateNestedManyWithoutPersonInput;
};
export type PersonUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUpdateManyWithoutDonorNestedInput;
    loans?: Prisma.LoanUpdateManyWithoutPersonNestedInput;
    purchases?: Prisma.PurchaseUpdateManyWithoutSupplierNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutPersonNestedInput;
    visits?: Prisma.VisitorLogUpdateManyWithoutPersonNestedInput;
};
export type PersonUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutDonorNestedInput;
    loans?: Prisma.LoanUncheckedUpdateManyWithoutPersonNestedInput;
    purchases?: Prisma.PurchaseUncheckedUpdateManyWithoutSupplierNestedInput;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutPersonNestedInput;
    visits?: Prisma.VisitorLogUncheckedUpdateManyWithoutPersonNestedInput;
};
export type PersonCreateManyInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type PersonUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PersonUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PersonCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    church?: Prisma.SortOrder;
    isVisitor?: Prisma.SortOrder;
    isBorrower?: Prisma.SortOrder;
    isBuyer?: Prisma.SortOrder;
    isDonor?: Prisma.SortOrder;
    isSupplier?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PersonMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    church?: Prisma.SortOrder;
    isVisitor?: Prisma.SortOrder;
    isBorrower?: Prisma.SortOrder;
    isBuyer?: Prisma.SortOrder;
    isDonor?: Prisma.SortOrder;
    isSupplier?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PersonMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    church?: Prisma.SortOrder;
    isVisitor?: Prisma.SortOrder;
    isBorrower?: Prisma.SortOrder;
    isBuyer?: Prisma.SortOrder;
    isDonor?: Prisma.SortOrder;
    isSupplier?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type PersonNullableScalarRelationFilter = {
    is?: Prisma.PersonWhereInput | null;
    isNot?: Prisma.PersonWhereInput | null;
};
export type PersonScalarRelationFilter = {
    is?: Prisma.PersonWhereInput;
    isNot?: Prisma.PersonWhereInput;
};
export type PersonCreateNestedOneWithoutVisitsInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutVisitsInput, Prisma.PersonUncheckedCreateWithoutVisitsInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutVisitsInput;
    connect?: Prisma.PersonWhereUniqueInput;
};
export type PersonUpdateOneWithoutVisitsNestedInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutVisitsInput, Prisma.PersonUncheckedCreateWithoutVisitsInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutVisitsInput;
    upsert?: Prisma.PersonUpsertWithoutVisitsInput;
    disconnect?: Prisma.PersonWhereInput | boolean;
    delete?: Prisma.PersonWhereInput | boolean;
    connect?: Prisma.PersonWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PersonUpdateToOneWithWhereWithoutVisitsInput, Prisma.PersonUpdateWithoutVisitsInput>, Prisma.PersonUncheckedUpdateWithoutVisitsInput>;
};
export type PersonCreateNestedOneWithoutLoansInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutLoansInput, Prisma.PersonUncheckedCreateWithoutLoansInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutLoansInput;
    connect?: Prisma.PersonWhereUniqueInput;
};
export type PersonUpdateOneRequiredWithoutLoansNestedInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutLoansInput, Prisma.PersonUncheckedCreateWithoutLoansInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutLoansInput;
    upsert?: Prisma.PersonUpsertWithoutLoansInput;
    connect?: Prisma.PersonWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PersonUpdateToOneWithWhereWithoutLoansInput, Prisma.PersonUpdateWithoutLoansInput>, Prisma.PersonUncheckedUpdateWithoutLoansInput>;
};
export type PersonCreateNestedOneWithoutSalesInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutSalesInput, Prisma.PersonUncheckedCreateWithoutSalesInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutSalesInput;
    connect?: Prisma.PersonWhereUniqueInput;
};
export type PersonUpdateOneWithoutSalesNestedInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutSalesInput, Prisma.PersonUncheckedCreateWithoutSalesInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutSalesInput;
    upsert?: Prisma.PersonUpsertWithoutSalesInput;
    disconnect?: Prisma.PersonWhereInput | boolean;
    delete?: Prisma.PersonWhereInput | boolean;
    connect?: Prisma.PersonWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PersonUpdateToOneWithWhereWithoutSalesInput, Prisma.PersonUpdateWithoutSalesInput>, Prisma.PersonUncheckedUpdateWithoutSalesInput>;
};
export type PersonCreateNestedOneWithoutPurchasesInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutPurchasesInput, Prisma.PersonUncheckedCreateWithoutPurchasesInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutPurchasesInput;
    connect?: Prisma.PersonWhereUniqueInput;
};
export type PersonUpdateOneWithoutPurchasesNestedInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutPurchasesInput, Prisma.PersonUncheckedCreateWithoutPurchasesInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutPurchasesInput;
    upsert?: Prisma.PersonUpsertWithoutPurchasesInput;
    disconnect?: Prisma.PersonWhereInput | boolean;
    delete?: Prisma.PersonWhereInput | boolean;
    connect?: Prisma.PersonWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PersonUpdateToOneWithWhereWithoutPurchasesInput, Prisma.PersonUpdateWithoutPurchasesInput>, Prisma.PersonUncheckedUpdateWithoutPurchasesInput>;
};
export type PersonCreateNestedOneWithoutDonationsInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutDonationsInput, Prisma.PersonUncheckedCreateWithoutDonationsInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutDonationsInput;
    connect?: Prisma.PersonWhereUniqueInput;
};
export type PersonUpdateOneWithoutDonationsNestedInput = {
    create?: Prisma.XOR<Prisma.PersonCreateWithoutDonationsInput, Prisma.PersonUncheckedCreateWithoutDonationsInput>;
    connectOrCreate?: Prisma.PersonCreateOrConnectWithoutDonationsInput;
    upsert?: Prisma.PersonUpsertWithoutDonationsInput;
    disconnect?: Prisma.PersonWhereInput | boolean;
    delete?: Prisma.PersonWhereInput | boolean;
    connect?: Prisma.PersonWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PersonUpdateToOneWithWhereWithoutDonationsInput, Prisma.PersonUpdateWithoutDonationsInput>, Prisma.PersonUncheckedUpdateWithoutDonationsInput>;
};
export type PersonCreateWithoutVisitsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationCreateNestedManyWithoutDonorInput;
    loans?: Prisma.LoanCreateNestedManyWithoutPersonInput;
    purchases?: Prisma.PurchaseCreateNestedManyWithoutSupplierInput;
    sales?: Prisma.SaleCreateNestedManyWithoutPersonInput;
};
export type PersonUncheckedCreateWithoutVisitsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutDonorInput;
    loans?: Prisma.LoanUncheckedCreateNestedManyWithoutPersonInput;
    purchases?: Prisma.PurchaseUncheckedCreateNestedManyWithoutSupplierInput;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutPersonInput;
};
export type PersonCreateOrConnectWithoutVisitsInput = {
    where: Prisma.PersonWhereUniqueInput;
    create: Prisma.XOR<Prisma.PersonCreateWithoutVisitsInput, Prisma.PersonUncheckedCreateWithoutVisitsInput>;
};
export type PersonUpsertWithoutVisitsInput = {
    update: Prisma.XOR<Prisma.PersonUpdateWithoutVisitsInput, Prisma.PersonUncheckedUpdateWithoutVisitsInput>;
    create: Prisma.XOR<Prisma.PersonCreateWithoutVisitsInput, Prisma.PersonUncheckedCreateWithoutVisitsInput>;
    where?: Prisma.PersonWhereInput;
};
export type PersonUpdateToOneWithWhereWithoutVisitsInput = {
    where?: Prisma.PersonWhereInput;
    data: Prisma.XOR<Prisma.PersonUpdateWithoutVisitsInput, Prisma.PersonUncheckedUpdateWithoutVisitsInput>;
};
export type PersonUpdateWithoutVisitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUpdateManyWithoutDonorNestedInput;
    loans?: Prisma.LoanUpdateManyWithoutPersonNestedInput;
    purchases?: Prisma.PurchaseUpdateManyWithoutSupplierNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutPersonNestedInput;
};
export type PersonUncheckedUpdateWithoutVisitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutDonorNestedInput;
    loans?: Prisma.LoanUncheckedUpdateManyWithoutPersonNestedInput;
    purchases?: Prisma.PurchaseUncheckedUpdateManyWithoutSupplierNestedInput;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutPersonNestedInput;
};
export type PersonCreateWithoutLoansInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationCreateNestedManyWithoutDonorInput;
    purchases?: Prisma.PurchaseCreateNestedManyWithoutSupplierInput;
    sales?: Prisma.SaleCreateNestedManyWithoutPersonInput;
    visits?: Prisma.VisitorLogCreateNestedManyWithoutPersonInput;
};
export type PersonUncheckedCreateWithoutLoansInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutDonorInput;
    purchases?: Prisma.PurchaseUncheckedCreateNestedManyWithoutSupplierInput;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutPersonInput;
    visits?: Prisma.VisitorLogUncheckedCreateNestedManyWithoutPersonInput;
};
export type PersonCreateOrConnectWithoutLoansInput = {
    where: Prisma.PersonWhereUniqueInput;
    create: Prisma.XOR<Prisma.PersonCreateWithoutLoansInput, Prisma.PersonUncheckedCreateWithoutLoansInput>;
};
export type PersonUpsertWithoutLoansInput = {
    update: Prisma.XOR<Prisma.PersonUpdateWithoutLoansInput, Prisma.PersonUncheckedUpdateWithoutLoansInput>;
    create: Prisma.XOR<Prisma.PersonCreateWithoutLoansInput, Prisma.PersonUncheckedCreateWithoutLoansInput>;
    where?: Prisma.PersonWhereInput;
};
export type PersonUpdateToOneWithWhereWithoutLoansInput = {
    where?: Prisma.PersonWhereInput;
    data: Prisma.XOR<Prisma.PersonUpdateWithoutLoansInput, Prisma.PersonUncheckedUpdateWithoutLoansInput>;
};
export type PersonUpdateWithoutLoansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUpdateManyWithoutDonorNestedInput;
    purchases?: Prisma.PurchaseUpdateManyWithoutSupplierNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutPersonNestedInput;
    visits?: Prisma.VisitorLogUpdateManyWithoutPersonNestedInput;
};
export type PersonUncheckedUpdateWithoutLoansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutDonorNestedInput;
    purchases?: Prisma.PurchaseUncheckedUpdateManyWithoutSupplierNestedInput;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutPersonNestedInput;
    visits?: Prisma.VisitorLogUncheckedUpdateManyWithoutPersonNestedInput;
};
export type PersonCreateWithoutSalesInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationCreateNestedManyWithoutDonorInput;
    loans?: Prisma.LoanCreateNestedManyWithoutPersonInput;
    purchases?: Prisma.PurchaseCreateNestedManyWithoutSupplierInput;
    visits?: Prisma.VisitorLogCreateNestedManyWithoutPersonInput;
};
export type PersonUncheckedCreateWithoutSalesInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutDonorInput;
    loans?: Prisma.LoanUncheckedCreateNestedManyWithoutPersonInput;
    purchases?: Prisma.PurchaseUncheckedCreateNestedManyWithoutSupplierInput;
    visits?: Prisma.VisitorLogUncheckedCreateNestedManyWithoutPersonInput;
};
export type PersonCreateOrConnectWithoutSalesInput = {
    where: Prisma.PersonWhereUniqueInput;
    create: Prisma.XOR<Prisma.PersonCreateWithoutSalesInput, Prisma.PersonUncheckedCreateWithoutSalesInput>;
};
export type PersonUpsertWithoutSalesInput = {
    update: Prisma.XOR<Prisma.PersonUpdateWithoutSalesInput, Prisma.PersonUncheckedUpdateWithoutSalesInput>;
    create: Prisma.XOR<Prisma.PersonCreateWithoutSalesInput, Prisma.PersonUncheckedCreateWithoutSalesInput>;
    where?: Prisma.PersonWhereInput;
};
export type PersonUpdateToOneWithWhereWithoutSalesInput = {
    where?: Prisma.PersonWhereInput;
    data: Prisma.XOR<Prisma.PersonUpdateWithoutSalesInput, Prisma.PersonUncheckedUpdateWithoutSalesInput>;
};
export type PersonUpdateWithoutSalesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUpdateManyWithoutDonorNestedInput;
    loans?: Prisma.LoanUpdateManyWithoutPersonNestedInput;
    purchases?: Prisma.PurchaseUpdateManyWithoutSupplierNestedInput;
    visits?: Prisma.VisitorLogUpdateManyWithoutPersonNestedInput;
};
export type PersonUncheckedUpdateWithoutSalesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutDonorNestedInput;
    loans?: Prisma.LoanUncheckedUpdateManyWithoutPersonNestedInput;
    purchases?: Prisma.PurchaseUncheckedUpdateManyWithoutSupplierNestedInput;
    visits?: Prisma.VisitorLogUncheckedUpdateManyWithoutPersonNestedInput;
};
export type PersonCreateWithoutPurchasesInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationCreateNestedManyWithoutDonorInput;
    loans?: Prisma.LoanCreateNestedManyWithoutPersonInput;
    sales?: Prisma.SaleCreateNestedManyWithoutPersonInput;
    visits?: Prisma.VisitorLogCreateNestedManyWithoutPersonInput;
};
export type PersonUncheckedCreateWithoutPurchasesInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutDonorInput;
    loans?: Prisma.LoanUncheckedCreateNestedManyWithoutPersonInput;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutPersonInput;
    visits?: Prisma.VisitorLogUncheckedCreateNestedManyWithoutPersonInput;
};
export type PersonCreateOrConnectWithoutPurchasesInput = {
    where: Prisma.PersonWhereUniqueInput;
    create: Prisma.XOR<Prisma.PersonCreateWithoutPurchasesInput, Prisma.PersonUncheckedCreateWithoutPurchasesInput>;
};
export type PersonUpsertWithoutPurchasesInput = {
    update: Prisma.XOR<Prisma.PersonUpdateWithoutPurchasesInput, Prisma.PersonUncheckedUpdateWithoutPurchasesInput>;
    create: Prisma.XOR<Prisma.PersonCreateWithoutPurchasesInput, Prisma.PersonUncheckedCreateWithoutPurchasesInput>;
    where?: Prisma.PersonWhereInput;
};
export type PersonUpdateToOneWithWhereWithoutPurchasesInput = {
    where?: Prisma.PersonWhereInput;
    data: Prisma.XOR<Prisma.PersonUpdateWithoutPurchasesInput, Prisma.PersonUncheckedUpdateWithoutPurchasesInput>;
};
export type PersonUpdateWithoutPurchasesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUpdateManyWithoutDonorNestedInput;
    loans?: Prisma.LoanUpdateManyWithoutPersonNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutPersonNestedInput;
    visits?: Prisma.VisitorLogUpdateManyWithoutPersonNestedInput;
};
export type PersonUncheckedUpdateWithoutPurchasesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutDonorNestedInput;
    loans?: Prisma.LoanUncheckedUpdateManyWithoutPersonNestedInput;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutPersonNestedInput;
    visits?: Prisma.VisitorLogUncheckedUpdateManyWithoutPersonNestedInput;
};
export type PersonCreateWithoutDonationsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    loans?: Prisma.LoanCreateNestedManyWithoutPersonInput;
    purchases?: Prisma.PurchaseCreateNestedManyWithoutSupplierInput;
    sales?: Prisma.SaleCreateNestedManyWithoutPersonInput;
    visits?: Prisma.VisitorLogCreateNestedManyWithoutPersonInput;
};
export type PersonUncheckedCreateWithoutDonationsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    church?: string | null;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    loans?: Prisma.LoanUncheckedCreateNestedManyWithoutPersonInput;
    purchases?: Prisma.PurchaseUncheckedCreateNestedManyWithoutSupplierInput;
    sales?: Prisma.SaleUncheckedCreateNestedManyWithoutPersonInput;
    visits?: Prisma.VisitorLogUncheckedCreateNestedManyWithoutPersonInput;
};
export type PersonCreateOrConnectWithoutDonationsInput = {
    where: Prisma.PersonWhereUniqueInput;
    create: Prisma.XOR<Prisma.PersonCreateWithoutDonationsInput, Prisma.PersonUncheckedCreateWithoutDonationsInput>;
};
export type PersonUpsertWithoutDonationsInput = {
    update: Prisma.XOR<Prisma.PersonUpdateWithoutDonationsInput, Prisma.PersonUncheckedUpdateWithoutDonationsInput>;
    create: Prisma.XOR<Prisma.PersonCreateWithoutDonationsInput, Prisma.PersonUncheckedCreateWithoutDonationsInput>;
    where?: Prisma.PersonWhereInput;
};
export type PersonUpdateToOneWithWhereWithoutDonationsInput = {
    where?: Prisma.PersonWhereInput;
    data: Prisma.XOR<Prisma.PersonUpdateWithoutDonationsInput, Prisma.PersonUncheckedUpdateWithoutDonationsInput>;
};
export type PersonUpdateWithoutDonationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    loans?: Prisma.LoanUpdateManyWithoutPersonNestedInput;
    purchases?: Prisma.PurchaseUpdateManyWithoutSupplierNestedInput;
    sales?: Prisma.SaleUpdateManyWithoutPersonNestedInput;
    visits?: Prisma.VisitorLogUpdateManyWithoutPersonNestedInput;
};
export type PersonUncheckedUpdateWithoutDonationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    church?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isVisitor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBorrower?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isBuyer?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isDonor?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isSupplier?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    loans?: Prisma.LoanUncheckedUpdateManyWithoutPersonNestedInput;
    purchases?: Prisma.PurchaseUncheckedUpdateManyWithoutSupplierNestedInput;
    sales?: Prisma.SaleUncheckedUpdateManyWithoutPersonNestedInput;
    visits?: Prisma.VisitorLogUncheckedUpdateManyWithoutPersonNestedInput;
};
/**
 * Count Type PersonCountOutputType
 */
export type PersonCountOutputType = {
    donations: number;
    loans: number;
    purchases: number;
    sales: number;
    visits: number;
};
export type PersonCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    donations?: boolean | PersonCountOutputTypeCountDonationsArgs;
    loans?: boolean | PersonCountOutputTypeCountLoansArgs;
    purchases?: boolean | PersonCountOutputTypeCountPurchasesArgs;
    sales?: boolean | PersonCountOutputTypeCountSalesArgs;
    visits?: boolean | PersonCountOutputTypeCountVisitsArgs;
};
/**
 * PersonCountOutputType without action
 */
export type PersonCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonCountOutputType
     */
    select?: Prisma.PersonCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * PersonCountOutputType without action
 */
export type PersonCountOutputTypeCountDonationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DonationWhereInput;
};
/**
 * PersonCountOutputType without action
 */
export type PersonCountOutputTypeCountLoansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanWhereInput;
};
/**
 * PersonCountOutputType without action
 */
export type PersonCountOutputTypeCountPurchasesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseWhereInput;
};
/**
 * PersonCountOutputType without action
 */
export type PersonCountOutputTypeCountSalesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleWhereInput;
};
/**
 * PersonCountOutputType without action
 */
export type PersonCountOutputTypeCountVisitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VisitorLogWhereInput;
};
export type PersonSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    phone?: boolean;
    email?: boolean;
    address?: boolean;
    church?: boolean;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    donations?: boolean | Prisma.Person$donationsArgs<ExtArgs>;
    loans?: boolean | Prisma.Person$loansArgs<ExtArgs>;
    purchases?: boolean | Prisma.Person$purchasesArgs<ExtArgs>;
    sales?: boolean | Prisma.Person$salesArgs<ExtArgs>;
    visits?: boolean | Prisma.Person$visitsArgs<ExtArgs>;
    _count?: boolean | Prisma.PersonCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["person"]>;
export type PersonSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    phone?: boolean;
    email?: boolean;
    address?: boolean;
    church?: boolean;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["person"]>;
export type PersonSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    phone?: boolean;
    email?: boolean;
    address?: boolean;
    church?: boolean;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["person"]>;
export type PersonSelectScalar = {
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    phone?: boolean;
    email?: boolean;
    address?: boolean;
    church?: boolean;
    isVisitor?: boolean;
    isBorrower?: boolean;
    isBuyer?: boolean;
    isDonor?: boolean;
    isSupplier?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type PersonOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "firstName" | "lastName" | "phone" | "email" | "address" | "church" | "isVisitor" | "isBorrower" | "isBuyer" | "isDonor" | "isSupplier" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["person"]>;
export type PersonInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    donations?: boolean | Prisma.Person$donationsArgs<ExtArgs>;
    loans?: boolean | Prisma.Person$loansArgs<ExtArgs>;
    purchases?: boolean | Prisma.Person$purchasesArgs<ExtArgs>;
    sales?: boolean | Prisma.Person$salesArgs<ExtArgs>;
    visits?: boolean | Prisma.Person$visitsArgs<ExtArgs>;
    _count?: boolean | Prisma.PersonCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PersonIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PersonIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PersonPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Person";
    objects: {
        donations: Prisma.$DonationPayload<ExtArgs>[];
        loans: Prisma.$LoanPayload<ExtArgs>[];
        purchases: Prisma.$PurchasePayload<ExtArgs>[];
        sales: Prisma.$SalePayload<ExtArgs>[];
        visits: Prisma.$VisitorLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        email: string | null;
        address: string | null;
        church: string | null;
        isVisitor: boolean;
        isBorrower: boolean;
        isBuyer: boolean;
        isDonor: boolean;
        isSupplier: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["person"]>;
    composites: {};
};
export type PersonGetPayload<S extends boolean | null | undefined | PersonDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PersonPayload, S>;
export type PersonCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PersonCountAggregateInputType | true;
};
export interface PersonDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Person'];
        meta: {
            name: 'Person';
        };
    };
    /**
     * Find zero or one Person that matches the filter.
     * @param {PersonFindUniqueArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonFindUniqueArgs>(args: Prisma.SelectSubset<T, PersonFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PersonClient<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Person that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonFindUniqueOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PersonClient<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Person that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonFindFirstArgs>(args?: Prisma.SelectSubset<T, PersonFindFirstArgs<ExtArgs>>): Prisma.Prisma__PersonClient<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Person that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PersonFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PersonClient<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all People
     * const people = await prisma.person.findMany()
     *
     * // Get first 10 People
     * const people = await prisma.person.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const personWithIdOnly = await prisma.person.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PersonFindManyArgs>(args?: Prisma.SelectSubset<T, PersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Person.
     * @param {PersonCreateArgs} args - Arguments to create a Person.
     * @example
     * // Create one Person
     * const Person = await prisma.person.create({
     *   data: {
     *     // ... data to create a Person
     *   }
     * })
     *
     */
    create<T extends PersonCreateArgs>(args: Prisma.SelectSubset<T, PersonCreateArgs<ExtArgs>>): Prisma.Prisma__PersonClient<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many People.
     * @param {PersonCreateManyArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PersonCreateManyArgs>(args?: Prisma.SelectSubset<T, PersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many People and returns the data saved in the database.
     * @param {PersonCreateManyAndReturnArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many People and only return the `id`
     * const personWithIdOnly = await prisma.person.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PersonCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Person.
     * @param {PersonDeleteArgs} args - Arguments to delete one Person.
     * @example
     * // Delete one Person
     * const Person = await prisma.person.delete({
     *   where: {
     *     // ... filter to delete one Person
     *   }
     * })
     *
     */
    delete<T extends PersonDeleteArgs>(args: Prisma.SelectSubset<T, PersonDeleteArgs<ExtArgs>>): Prisma.Prisma__PersonClient<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Person.
     * @param {PersonUpdateArgs} args - Arguments to update one Person.
     * @example
     * // Update one Person
     * const person = await prisma.person.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PersonUpdateArgs>(args: Prisma.SelectSubset<T, PersonUpdateArgs<ExtArgs>>): Prisma.Prisma__PersonClient<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more People.
     * @param {PersonDeleteManyArgs} args - Arguments to filter People to delete.
     * @example
     * // Delete a few People
     * const { count } = await prisma.person.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PersonDeleteManyArgs>(args?: Prisma.SelectSubset<T, PersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many People
     * const person = await prisma.person.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PersonUpdateManyArgs>(args: Prisma.SelectSubset<T, PersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more People and returns the data updated in the database.
     * @param {PersonUpdateManyAndReturnArgs} args - Arguments to update many People.
     * @example
     * // Update many People
     * const person = await prisma.person.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more People and only return the `id`
     * const personWithIdOnly = await prisma.person.updateManyAndReturn({
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
    updateManyAndReturn<T extends PersonUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Person.
     * @param {PersonUpsertArgs} args - Arguments to update or create a Person.
     * @example
     * // Update or create a Person
     * const person = await prisma.person.upsert({
     *   create: {
     *     // ... data to create a Person
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Person we want to update
     *   }
     * })
     */
    upsert<T extends PersonUpsertArgs>(args: Prisma.SelectSubset<T, PersonUpsertArgs<ExtArgs>>): Prisma.Prisma__PersonClient<runtime.Types.Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonCountArgs} args - Arguments to filter People to count.
     * @example
     * // Count the number of People
     * const count = await prisma.person.count({
     *   where: {
     *     // ... the filter for the People we want to count
     *   }
     * })
    **/
    count<T extends PersonCountArgs>(args?: Prisma.Subset<T, PersonCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PersonCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PersonAggregateArgs>(args: Prisma.Subset<T, PersonAggregateArgs>): Prisma.PrismaPromise<GetPersonAggregateType<T>>;
    /**
     * Group by Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PersonGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PersonGroupByArgs['orderBy'];
    } : {
        orderBy?: PersonGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Person model
     */
    readonly fields: PersonFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Person.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PersonClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    donations<T extends Prisma.Person$donationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Person$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    loans<T extends Prisma.Person$loansArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Person$loansArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    purchases<T extends Prisma.Person$purchasesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Person$purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sales<T extends Prisma.Person$salesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Person$salesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    visits<T extends Prisma.Person$visitsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Person$visitsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisitorLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Person model
 */
export interface PersonFieldRefs {
    readonly id: Prisma.FieldRef<"Person", 'String'>;
    readonly firstName: Prisma.FieldRef<"Person", 'String'>;
    readonly lastName: Prisma.FieldRef<"Person", 'String'>;
    readonly phone: Prisma.FieldRef<"Person", 'String'>;
    readonly email: Prisma.FieldRef<"Person", 'String'>;
    readonly address: Prisma.FieldRef<"Person", 'String'>;
    readonly church: Prisma.FieldRef<"Person", 'String'>;
    readonly isVisitor: Prisma.FieldRef<"Person", 'Boolean'>;
    readonly isBorrower: Prisma.FieldRef<"Person", 'Boolean'>;
    readonly isBuyer: Prisma.FieldRef<"Person", 'Boolean'>;
    readonly isDonor: Prisma.FieldRef<"Person", 'Boolean'>;
    readonly isSupplier: Prisma.FieldRef<"Person", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Person", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Person", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Person", 'DateTime'>;
}
/**
 * Person findUnique
 */
export type PersonFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
    /**
     * Filter, which Person to fetch.
     */
    where: Prisma.PersonWhereUniqueInput;
};
/**
 * Person findUniqueOrThrow
 */
export type PersonFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
    /**
     * Filter, which Person to fetch.
     */
    where: Prisma.PersonWhereUniqueInput;
};
/**
 * Person findFirst
 */
export type PersonFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
    /**
     * Filter, which Person to fetch.
     */
    where?: Prisma.PersonWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of People to fetch.
     */
    orderBy?: Prisma.PersonOrderByWithRelationInput | Prisma.PersonOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for People.
     */
    cursor?: Prisma.PersonWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` People from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` People.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of People.
     */
    distinct?: Prisma.PersonScalarFieldEnum | Prisma.PersonScalarFieldEnum[];
};
/**
 * Person findFirstOrThrow
 */
export type PersonFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
    /**
     * Filter, which Person to fetch.
     */
    where?: Prisma.PersonWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of People to fetch.
     */
    orderBy?: Prisma.PersonOrderByWithRelationInput | Prisma.PersonOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for People.
     */
    cursor?: Prisma.PersonWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` People from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` People.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of People.
     */
    distinct?: Prisma.PersonScalarFieldEnum | Prisma.PersonScalarFieldEnum[];
};
/**
 * Person findMany
 */
export type PersonFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
    /**
     * Filter, which People to fetch.
     */
    where?: Prisma.PersonWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of People to fetch.
     */
    orderBy?: Prisma.PersonOrderByWithRelationInput | Prisma.PersonOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing People.
     */
    cursor?: Prisma.PersonWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` People from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` People.
     */
    skip?: number;
    distinct?: Prisma.PersonScalarFieldEnum | Prisma.PersonScalarFieldEnum[];
};
/**
 * Person create
 */
export type PersonCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
    /**
     * The data needed to create a Person.
     */
    data: Prisma.XOR<Prisma.PersonCreateInput, Prisma.PersonUncheckedCreateInput>;
};
/**
 * Person createMany
 */
export type PersonCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many People.
     */
    data: Prisma.PersonCreateManyInput | Prisma.PersonCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Person createManyAndReturn
 */
export type PersonCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * The data used to create many People.
     */
    data: Prisma.PersonCreateManyInput | Prisma.PersonCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Person update
 */
export type PersonUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
    /**
     * The data needed to update a Person.
     */
    data: Prisma.XOR<Prisma.PersonUpdateInput, Prisma.PersonUncheckedUpdateInput>;
    /**
     * Choose, which Person to update.
     */
    where: Prisma.PersonWhereUniqueInput;
};
/**
 * Person updateMany
 */
export type PersonUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update People.
     */
    data: Prisma.XOR<Prisma.PersonUpdateManyMutationInput, Prisma.PersonUncheckedUpdateManyInput>;
    /**
     * Filter which People to update
     */
    where?: Prisma.PersonWhereInput;
    /**
     * Limit how many People to update.
     */
    limit?: number;
};
/**
 * Person updateManyAndReturn
 */
export type PersonUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * The data used to update People.
     */
    data: Prisma.XOR<Prisma.PersonUpdateManyMutationInput, Prisma.PersonUncheckedUpdateManyInput>;
    /**
     * Filter which People to update
     */
    where?: Prisma.PersonWhereInput;
    /**
     * Limit how many People to update.
     */
    limit?: number;
};
/**
 * Person upsert
 */
export type PersonUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
    /**
     * The filter to search for the Person to update in case it exists.
     */
    where: Prisma.PersonWhereUniqueInput;
    /**
     * In case the Person found by the `where` argument doesn't exist, create a new Person with this data.
     */
    create: Prisma.XOR<Prisma.PersonCreateInput, Prisma.PersonUncheckedCreateInput>;
    /**
     * In case the Person was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PersonUpdateInput, Prisma.PersonUncheckedUpdateInput>;
};
/**
 * Person delete
 */
export type PersonDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
    /**
     * Filter which Person to delete.
     */
    where: Prisma.PersonWhereUniqueInput;
};
/**
 * Person deleteMany
 */
export type PersonDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which People to delete
     */
    where?: Prisma.PersonWhereInput;
    /**
     * Limit how many People to delete.
     */
    limit?: number;
};
/**
 * Person.donations
 */
export type Person$donationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: Prisma.DonationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Donation
     */
    omit?: Prisma.DonationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DonationInclude<ExtArgs> | null;
    where?: Prisma.DonationWhereInput;
    orderBy?: Prisma.DonationOrderByWithRelationInput | Prisma.DonationOrderByWithRelationInput[];
    cursor?: Prisma.DonationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DonationScalarFieldEnum | Prisma.DonationScalarFieldEnum[];
};
/**
 * Person.loans
 */
export type Person$loansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.LoanWhereInput;
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    cursor?: Prisma.LoanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Person.purchases
 */
export type Person$purchasesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: Prisma.PurchaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Purchase
     */
    omit?: Prisma.PurchaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PurchaseInclude<ExtArgs> | null;
    where?: Prisma.PurchaseWhereInput;
    orderBy?: Prisma.PurchaseOrderByWithRelationInput | Prisma.PurchaseOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseScalarFieldEnum | Prisma.PurchaseScalarFieldEnum[];
};
/**
 * Person.sales
 */
export type Person$salesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: Prisma.SaleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sale
     */
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithRelationInput | Prisma.SaleOrderByWithRelationInput[];
    cursor?: Prisma.SaleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleScalarFieldEnum | Prisma.SaleScalarFieldEnum[];
};
/**
 * Person.visits
 */
export type Person$visitsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitorLog
     */
    select?: Prisma.VisitorLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisitorLog
     */
    omit?: Prisma.VisitorLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisitorLogInclude<ExtArgs> | null;
    where?: Prisma.VisitorLogWhereInput;
    orderBy?: Prisma.VisitorLogOrderByWithRelationInput | Prisma.VisitorLogOrderByWithRelationInput[];
    cursor?: Prisma.VisitorLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VisitorLogScalarFieldEnum | Prisma.VisitorLogScalarFieldEnum[];
};
/**
 * Person without action
 */
export type PersonDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: Prisma.PersonSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Person
     */
    omit?: Prisma.PersonOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PersonInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Person.d.ts.map