import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DeletedItem
 *
 */
export type DeletedItemModel = runtime.Types.Result.DefaultSelection<Prisma.$DeletedItemPayload>;
export type AggregateDeletedItem = {
    _count: DeletedItemCountAggregateOutputType | null;
    _min: DeletedItemMinAggregateOutputType | null;
    _max: DeletedItemMaxAggregateOutputType | null;
};
export type DeletedItemMinAggregateOutputType = {
    id: string | null;
    originalTable: string | null;
    originalId: string | null;
    deletedAt: Date | null;
    expiresAt: Date | null;
    restoredAt: Date | null;
    restoredById: string | null;
};
export type DeletedItemMaxAggregateOutputType = {
    id: string | null;
    originalTable: string | null;
    originalId: string | null;
    deletedAt: Date | null;
    expiresAt: Date | null;
    restoredAt: Date | null;
    restoredById: string | null;
};
export type DeletedItemCountAggregateOutputType = {
    id: number;
    originalTable: number;
    originalId: number;
    data: number;
    deletedAt: number;
    expiresAt: number;
    restoredAt: number;
    restoredById: number;
    _all: number;
};
export type DeletedItemMinAggregateInputType = {
    id?: true;
    originalTable?: true;
    originalId?: true;
    deletedAt?: true;
    expiresAt?: true;
    restoredAt?: true;
    restoredById?: true;
};
export type DeletedItemMaxAggregateInputType = {
    id?: true;
    originalTable?: true;
    originalId?: true;
    deletedAt?: true;
    expiresAt?: true;
    restoredAt?: true;
    restoredById?: true;
};
export type DeletedItemCountAggregateInputType = {
    id?: true;
    originalTable?: true;
    originalId?: true;
    data?: true;
    deletedAt?: true;
    expiresAt?: true;
    restoredAt?: true;
    restoredById?: true;
    _all?: true;
};
export type DeletedItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DeletedItem to aggregate.
     */
    where?: Prisma.DeletedItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeletedItems to fetch.
     */
    orderBy?: Prisma.DeletedItemOrderByWithRelationInput | Prisma.DeletedItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DeletedItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeletedItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeletedItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DeletedItems
    **/
    _count?: true | DeletedItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DeletedItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DeletedItemMaxAggregateInputType;
};
export type GetDeletedItemAggregateType<T extends DeletedItemAggregateArgs> = {
    [P in keyof T & keyof AggregateDeletedItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeletedItem[P]> : Prisma.GetScalarType<T[P], AggregateDeletedItem[P]>;
};
export type DeletedItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeletedItemWhereInput;
    orderBy?: Prisma.DeletedItemOrderByWithAggregationInput | Prisma.DeletedItemOrderByWithAggregationInput[];
    by: Prisma.DeletedItemScalarFieldEnum[] | Prisma.DeletedItemScalarFieldEnum;
    having?: Prisma.DeletedItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeletedItemCountAggregateInputType | true;
    _min?: DeletedItemMinAggregateInputType;
    _max?: DeletedItemMaxAggregateInputType;
};
export type DeletedItemGroupByOutputType = {
    id: string;
    originalTable: string;
    originalId: string;
    data: runtime.JsonValue;
    deletedAt: Date;
    expiresAt: Date;
    restoredAt: Date | null;
    restoredById: string | null;
    _count: DeletedItemCountAggregateOutputType | null;
    _min: DeletedItemMinAggregateOutputType | null;
    _max: DeletedItemMaxAggregateOutputType | null;
};
type GetDeletedItemGroupByPayload<T extends DeletedItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeletedItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeletedItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeletedItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeletedItemGroupByOutputType[P]>;
}>>;
export type DeletedItemWhereInput = {
    AND?: Prisma.DeletedItemWhereInput | Prisma.DeletedItemWhereInput[];
    OR?: Prisma.DeletedItemWhereInput[];
    NOT?: Prisma.DeletedItemWhereInput | Prisma.DeletedItemWhereInput[];
    id?: Prisma.StringFilter<"DeletedItem"> | string;
    originalTable?: Prisma.StringFilter<"DeletedItem"> | string;
    originalId?: Prisma.StringFilter<"DeletedItem"> | string;
    data?: Prisma.JsonFilter<"DeletedItem">;
    deletedAt?: Prisma.DateTimeFilter<"DeletedItem"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"DeletedItem"> | Date | string;
    restoredAt?: Prisma.DateTimeNullableFilter<"DeletedItem"> | Date | string | null;
    restoredById?: Prisma.StringNullableFilter<"DeletedItem"> | string | null;
};
export type DeletedItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    originalTable?: Prisma.SortOrder;
    originalId?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    restoredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    restoredById?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type DeletedItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DeletedItemWhereInput | Prisma.DeletedItemWhereInput[];
    OR?: Prisma.DeletedItemWhereInput[];
    NOT?: Prisma.DeletedItemWhereInput | Prisma.DeletedItemWhereInput[];
    originalTable?: Prisma.StringFilter<"DeletedItem"> | string;
    originalId?: Prisma.StringFilter<"DeletedItem"> | string;
    data?: Prisma.JsonFilter<"DeletedItem">;
    deletedAt?: Prisma.DateTimeFilter<"DeletedItem"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"DeletedItem"> | Date | string;
    restoredAt?: Prisma.DateTimeNullableFilter<"DeletedItem"> | Date | string | null;
    restoredById?: Prisma.StringNullableFilter<"DeletedItem"> | string | null;
}, "id">;
export type DeletedItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    originalTable?: Prisma.SortOrder;
    originalId?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    restoredAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    restoredById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.DeletedItemCountOrderByAggregateInput;
    _max?: Prisma.DeletedItemMaxOrderByAggregateInput;
    _min?: Prisma.DeletedItemMinOrderByAggregateInput;
};
export type DeletedItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeletedItemScalarWhereWithAggregatesInput | Prisma.DeletedItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeletedItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeletedItemScalarWhereWithAggregatesInput | Prisma.DeletedItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DeletedItem"> | string;
    originalTable?: Prisma.StringWithAggregatesFilter<"DeletedItem"> | string;
    originalId?: Prisma.StringWithAggregatesFilter<"DeletedItem"> | string;
    data?: Prisma.JsonWithAggregatesFilter<"DeletedItem">;
    deletedAt?: Prisma.DateTimeWithAggregatesFilter<"DeletedItem"> | Date | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"DeletedItem"> | Date | string;
    restoredAt?: Prisma.DateTimeNullableWithAggregatesFilter<"DeletedItem"> | Date | string | null;
    restoredById?: Prisma.StringNullableWithAggregatesFilter<"DeletedItem"> | string | null;
};
export type DeletedItemCreateInput = {
    id?: string;
    originalTable: string;
    originalId: string;
    data: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    deletedAt?: Date | string;
    expiresAt: Date | string;
    restoredAt?: Date | string | null;
    restoredById?: string | null;
};
export type DeletedItemUncheckedCreateInput = {
    id?: string;
    originalTable: string;
    originalId: string;
    data: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    deletedAt?: Date | string;
    expiresAt: Date | string;
    restoredAt?: Date | string | null;
    restoredById?: string | null;
};
export type DeletedItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalTable?: Prisma.StringFieldUpdateOperationsInput | string;
    originalId?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restoredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    restoredById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DeletedItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalTable?: Prisma.StringFieldUpdateOperationsInput | string;
    originalId?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restoredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    restoredById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DeletedItemCreateManyInput = {
    id?: string;
    originalTable: string;
    originalId: string;
    data: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    deletedAt?: Date | string;
    expiresAt: Date | string;
    restoredAt?: Date | string | null;
    restoredById?: string | null;
};
export type DeletedItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalTable?: Prisma.StringFieldUpdateOperationsInput | string;
    originalId?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restoredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    restoredById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DeletedItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalTable?: Prisma.StringFieldUpdateOperationsInput | string;
    originalId?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    deletedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restoredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    restoredById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type DeletedItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    originalTable?: Prisma.SortOrder;
    originalId?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    restoredAt?: Prisma.SortOrder;
    restoredById?: Prisma.SortOrder;
};
export type DeletedItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    originalTable?: Prisma.SortOrder;
    originalId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    restoredAt?: Prisma.SortOrder;
    restoredById?: Prisma.SortOrder;
};
export type DeletedItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    originalTable?: Prisma.SortOrder;
    originalId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    restoredAt?: Prisma.SortOrder;
    restoredById?: Prisma.SortOrder;
};
export type DeletedItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    originalTable?: boolean;
    originalId?: boolean;
    data?: boolean;
    deletedAt?: boolean;
    expiresAt?: boolean;
    restoredAt?: boolean;
    restoredById?: boolean;
}, ExtArgs["result"]["deletedItem"]>;
export type DeletedItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    originalTable?: boolean;
    originalId?: boolean;
    data?: boolean;
    deletedAt?: boolean;
    expiresAt?: boolean;
    restoredAt?: boolean;
    restoredById?: boolean;
}, ExtArgs["result"]["deletedItem"]>;
export type DeletedItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    originalTable?: boolean;
    originalId?: boolean;
    data?: boolean;
    deletedAt?: boolean;
    expiresAt?: boolean;
    restoredAt?: boolean;
    restoredById?: boolean;
}, ExtArgs["result"]["deletedItem"]>;
export type DeletedItemSelectScalar = {
    id?: boolean;
    originalTable?: boolean;
    originalId?: boolean;
    data?: boolean;
    deletedAt?: boolean;
    expiresAt?: boolean;
    restoredAt?: boolean;
    restoredById?: boolean;
};
export type DeletedItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "originalTable" | "originalId" | "data" | "deletedAt" | "expiresAt" | "restoredAt" | "restoredById", ExtArgs["result"]["deletedItem"]>;
export type $DeletedItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeletedItem";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        originalTable: string;
        originalId: string;
        data: runtime.JsonValue;
        deletedAt: Date;
        expiresAt: Date;
        restoredAt: Date | null;
        restoredById: string | null;
    }, ExtArgs["result"]["deletedItem"]>;
    composites: {};
};
export type DeletedItemGetPayload<S extends boolean | null | undefined | DeletedItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload, S>;
export type DeletedItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeletedItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeletedItemCountAggregateInputType | true;
};
export interface DeletedItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeletedItem'];
        meta: {
            name: 'DeletedItem';
        };
    };
    /**
     * Find zero or one DeletedItem that matches the filter.
     * @param {DeletedItemFindUniqueArgs} args - Arguments to find a DeletedItem
     * @example
     * // Get one DeletedItem
     * const deletedItem = await prisma.deletedItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeletedItemFindUniqueArgs>(args: Prisma.SelectSubset<T, DeletedItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeletedItemClient<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DeletedItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeletedItemFindUniqueOrThrowArgs} args - Arguments to find a DeletedItem
     * @example
     * // Get one DeletedItem
     * const deletedItem = await prisma.deletedItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeletedItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeletedItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeletedItemClient<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DeletedItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeletedItemFindFirstArgs} args - Arguments to find a DeletedItem
     * @example
     * // Get one DeletedItem
     * const deletedItem = await prisma.deletedItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeletedItemFindFirstArgs>(args?: Prisma.SelectSubset<T, DeletedItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeletedItemClient<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DeletedItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeletedItemFindFirstOrThrowArgs} args - Arguments to find a DeletedItem
     * @example
     * // Get one DeletedItem
     * const deletedItem = await prisma.deletedItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeletedItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeletedItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeletedItemClient<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DeletedItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeletedItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeletedItems
     * const deletedItems = await prisma.deletedItem.findMany()
     *
     * // Get first 10 DeletedItems
     * const deletedItems = await prisma.deletedItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const deletedItemWithIdOnly = await prisma.deletedItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DeletedItemFindManyArgs>(args?: Prisma.SelectSubset<T, DeletedItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DeletedItem.
     * @param {DeletedItemCreateArgs} args - Arguments to create a DeletedItem.
     * @example
     * // Create one DeletedItem
     * const DeletedItem = await prisma.deletedItem.create({
     *   data: {
     *     // ... data to create a DeletedItem
     *   }
     * })
     *
     */
    create<T extends DeletedItemCreateArgs>(args: Prisma.SelectSubset<T, DeletedItemCreateArgs<ExtArgs>>): Prisma.Prisma__DeletedItemClient<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DeletedItems.
     * @param {DeletedItemCreateManyArgs} args - Arguments to create many DeletedItems.
     * @example
     * // Create many DeletedItems
     * const deletedItem = await prisma.deletedItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DeletedItemCreateManyArgs>(args?: Prisma.SelectSubset<T, DeletedItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DeletedItems and returns the data saved in the database.
     * @param {DeletedItemCreateManyAndReturnArgs} args - Arguments to create many DeletedItems.
     * @example
     * // Create many DeletedItems
     * const deletedItem = await prisma.deletedItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DeletedItems and only return the `id`
     * const deletedItemWithIdOnly = await prisma.deletedItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DeletedItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeletedItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DeletedItem.
     * @param {DeletedItemDeleteArgs} args - Arguments to delete one DeletedItem.
     * @example
     * // Delete one DeletedItem
     * const DeletedItem = await prisma.deletedItem.delete({
     *   where: {
     *     // ... filter to delete one DeletedItem
     *   }
     * })
     *
     */
    delete<T extends DeletedItemDeleteArgs>(args: Prisma.SelectSubset<T, DeletedItemDeleteArgs<ExtArgs>>): Prisma.Prisma__DeletedItemClient<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DeletedItem.
     * @param {DeletedItemUpdateArgs} args - Arguments to update one DeletedItem.
     * @example
     * // Update one DeletedItem
     * const deletedItem = await prisma.deletedItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DeletedItemUpdateArgs>(args: Prisma.SelectSubset<T, DeletedItemUpdateArgs<ExtArgs>>): Prisma.Prisma__DeletedItemClient<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DeletedItems.
     * @param {DeletedItemDeleteManyArgs} args - Arguments to filter DeletedItems to delete.
     * @example
     * // Delete a few DeletedItems
     * const { count } = await prisma.deletedItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DeletedItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeletedItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DeletedItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeletedItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeletedItems
     * const deletedItem = await prisma.deletedItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DeletedItemUpdateManyArgs>(args: Prisma.SelectSubset<T, DeletedItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DeletedItems and returns the data updated in the database.
     * @param {DeletedItemUpdateManyAndReturnArgs} args - Arguments to update many DeletedItems.
     * @example
     * // Update many DeletedItems
     * const deletedItem = await prisma.deletedItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DeletedItems and only return the `id`
     * const deletedItemWithIdOnly = await prisma.deletedItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends DeletedItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeletedItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DeletedItem.
     * @param {DeletedItemUpsertArgs} args - Arguments to update or create a DeletedItem.
     * @example
     * // Update or create a DeletedItem
     * const deletedItem = await prisma.deletedItem.upsert({
     *   create: {
     *     // ... data to create a DeletedItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeletedItem we want to update
     *   }
     * })
     */
    upsert<T extends DeletedItemUpsertArgs>(args: Prisma.SelectSubset<T, DeletedItemUpsertArgs<ExtArgs>>): Prisma.Prisma__DeletedItemClient<runtime.Types.Result.GetResult<Prisma.$DeletedItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DeletedItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeletedItemCountArgs} args - Arguments to filter DeletedItems to count.
     * @example
     * // Count the number of DeletedItems
     * const count = await prisma.deletedItem.count({
     *   where: {
     *     // ... the filter for the DeletedItems we want to count
     *   }
     * })
    **/
    count<T extends DeletedItemCountArgs>(args?: Prisma.Subset<T, DeletedItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeletedItemCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DeletedItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeletedItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeletedItemAggregateArgs>(args: Prisma.Subset<T, DeletedItemAggregateArgs>): Prisma.PrismaPromise<GetDeletedItemAggregateType<T>>;
    /**
     * Group by DeletedItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeletedItemGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DeletedItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeletedItemGroupByArgs['orderBy'];
    } : {
        orderBy?: DeletedItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeletedItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeletedItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DeletedItem model
     */
    readonly fields: DeletedItemFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DeletedItem.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DeletedItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the DeletedItem model
 */
export interface DeletedItemFieldRefs {
    readonly id: Prisma.FieldRef<"DeletedItem", 'String'>;
    readonly originalTable: Prisma.FieldRef<"DeletedItem", 'String'>;
    readonly originalId: Prisma.FieldRef<"DeletedItem", 'String'>;
    readonly data: Prisma.FieldRef<"DeletedItem", 'Json'>;
    readonly deletedAt: Prisma.FieldRef<"DeletedItem", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"DeletedItem", 'DateTime'>;
    readonly restoredAt: Prisma.FieldRef<"DeletedItem", 'DateTime'>;
    readonly restoredById: Prisma.FieldRef<"DeletedItem", 'String'>;
}
/**
 * DeletedItem findUnique
 */
export type DeletedItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * Filter, which DeletedItem to fetch.
     */
    where: Prisma.DeletedItemWhereUniqueInput;
};
/**
 * DeletedItem findUniqueOrThrow
 */
export type DeletedItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * Filter, which DeletedItem to fetch.
     */
    where: Prisma.DeletedItemWhereUniqueInput;
};
/**
 * DeletedItem findFirst
 */
export type DeletedItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * Filter, which DeletedItem to fetch.
     */
    where?: Prisma.DeletedItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeletedItems to fetch.
     */
    orderBy?: Prisma.DeletedItemOrderByWithRelationInput | Prisma.DeletedItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DeletedItems.
     */
    cursor?: Prisma.DeletedItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeletedItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeletedItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DeletedItems.
     */
    distinct?: Prisma.DeletedItemScalarFieldEnum | Prisma.DeletedItemScalarFieldEnum[];
};
/**
 * DeletedItem findFirstOrThrow
 */
export type DeletedItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * Filter, which DeletedItem to fetch.
     */
    where?: Prisma.DeletedItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeletedItems to fetch.
     */
    orderBy?: Prisma.DeletedItemOrderByWithRelationInput | Prisma.DeletedItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DeletedItems.
     */
    cursor?: Prisma.DeletedItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeletedItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeletedItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DeletedItems.
     */
    distinct?: Prisma.DeletedItemScalarFieldEnum | Prisma.DeletedItemScalarFieldEnum[];
};
/**
 * DeletedItem findMany
 */
export type DeletedItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * Filter, which DeletedItems to fetch.
     */
    where?: Prisma.DeletedItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DeletedItems to fetch.
     */
    orderBy?: Prisma.DeletedItemOrderByWithRelationInput | Prisma.DeletedItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DeletedItems.
     */
    cursor?: Prisma.DeletedItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DeletedItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DeletedItems.
     */
    skip?: number;
    distinct?: Prisma.DeletedItemScalarFieldEnum | Prisma.DeletedItemScalarFieldEnum[];
};
/**
 * DeletedItem create
 */
export type DeletedItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * The data needed to create a DeletedItem.
     */
    data: Prisma.XOR<Prisma.DeletedItemCreateInput, Prisma.DeletedItemUncheckedCreateInput>;
};
/**
 * DeletedItem createMany
 */
export type DeletedItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeletedItems.
     */
    data: Prisma.DeletedItemCreateManyInput | Prisma.DeletedItemCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DeletedItem createManyAndReturn
 */
export type DeletedItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * The data used to create many DeletedItems.
     */
    data: Prisma.DeletedItemCreateManyInput | Prisma.DeletedItemCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DeletedItem update
 */
export type DeletedItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * The data needed to update a DeletedItem.
     */
    data: Prisma.XOR<Prisma.DeletedItemUpdateInput, Prisma.DeletedItemUncheckedUpdateInput>;
    /**
     * Choose, which DeletedItem to update.
     */
    where: Prisma.DeletedItemWhereUniqueInput;
};
/**
 * DeletedItem updateMany
 */
export type DeletedItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DeletedItems.
     */
    data: Prisma.XOR<Prisma.DeletedItemUpdateManyMutationInput, Prisma.DeletedItemUncheckedUpdateManyInput>;
    /**
     * Filter which DeletedItems to update
     */
    where?: Prisma.DeletedItemWhereInput;
    /**
     * Limit how many DeletedItems to update.
     */
    limit?: number;
};
/**
 * DeletedItem updateManyAndReturn
 */
export type DeletedItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * The data used to update DeletedItems.
     */
    data: Prisma.XOR<Prisma.DeletedItemUpdateManyMutationInput, Prisma.DeletedItemUncheckedUpdateManyInput>;
    /**
     * Filter which DeletedItems to update
     */
    where?: Prisma.DeletedItemWhereInput;
    /**
     * Limit how many DeletedItems to update.
     */
    limit?: number;
};
/**
 * DeletedItem upsert
 */
export type DeletedItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * The filter to search for the DeletedItem to update in case it exists.
     */
    where: Prisma.DeletedItemWhereUniqueInput;
    /**
     * In case the DeletedItem found by the `where` argument doesn't exist, create a new DeletedItem with this data.
     */
    create: Prisma.XOR<Prisma.DeletedItemCreateInput, Prisma.DeletedItemUncheckedCreateInput>;
    /**
     * In case the DeletedItem was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DeletedItemUpdateInput, Prisma.DeletedItemUncheckedUpdateInput>;
};
/**
 * DeletedItem delete
 */
export type DeletedItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
    /**
     * Filter which DeletedItem to delete.
     */
    where: Prisma.DeletedItemWhereUniqueInput;
};
/**
 * DeletedItem deleteMany
 */
export type DeletedItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DeletedItems to delete
     */
    where?: Prisma.DeletedItemWhereInput;
    /**
     * Limit how many DeletedItems to delete.
     */
    limit?: number;
};
/**
 * DeletedItem without action
 */
export type DeletedItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeletedItem
     */
    select?: Prisma.DeletedItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DeletedItem
     */
    omit?: Prisma.DeletedItemOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DeletedItem.d.ts.map