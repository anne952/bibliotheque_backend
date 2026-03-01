import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model SyncTask
 *
 */
export type SyncTaskModel = runtime.Types.Result.DefaultSelection<Prisma.$SyncTaskPayload>;
export type AggregateSyncTask = {
    _count: SyncTaskCountAggregateOutputType | null;
    _avg: SyncTaskAvgAggregateOutputType | null;
    _sum: SyncTaskSumAggregateOutputType | null;
    _min: SyncTaskMinAggregateOutputType | null;
    _max: SyncTaskMaxAggregateOutputType | null;
};
export type SyncTaskAvgAggregateOutputType = {
    version: number | null;
};
export type SyncTaskSumAggregateOutputType = {
    version: number | null;
};
export type SyncTaskMinAggregateOutputType = {
    id: string | null;
    clientId: string | null;
    title: string | null;
    version: number | null;
    clientUpdatedAt: Date | null;
    serverUpdatedAt: Date | null;
    createdAt: Date | null;
    deletedAt: Date | null;
};
export type SyncTaskMaxAggregateOutputType = {
    id: string | null;
    clientId: string | null;
    title: string | null;
    version: number | null;
    clientUpdatedAt: Date | null;
    serverUpdatedAt: Date | null;
    createdAt: Date | null;
    deletedAt: Date | null;
};
export type SyncTaskCountAggregateOutputType = {
    id: number;
    clientId: number;
    title: number;
    payload: number;
    version: number;
    clientUpdatedAt: number;
    serverUpdatedAt: number;
    createdAt: number;
    deletedAt: number;
    _all: number;
};
export type SyncTaskAvgAggregateInputType = {
    version?: true;
};
export type SyncTaskSumAggregateInputType = {
    version?: true;
};
export type SyncTaskMinAggregateInputType = {
    id?: true;
    clientId?: true;
    title?: true;
    version?: true;
    clientUpdatedAt?: true;
    serverUpdatedAt?: true;
    createdAt?: true;
    deletedAt?: true;
};
export type SyncTaskMaxAggregateInputType = {
    id?: true;
    clientId?: true;
    title?: true;
    version?: true;
    clientUpdatedAt?: true;
    serverUpdatedAt?: true;
    createdAt?: true;
    deletedAt?: true;
};
export type SyncTaskCountAggregateInputType = {
    id?: true;
    clientId?: true;
    title?: true;
    payload?: true;
    version?: true;
    clientUpdatedAt?: true;
    serverUpdatedAt?: true;
    createdAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type SyncTaskAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SyncTask to aggregate.
     */
    where?: Prisma.SyncTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SyncTasks to fetch.
     */
    orderBy?: Prisma.SyncTaskOrderByWithRelationInput | Prisma.SyncTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SyncTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SyncTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SyncTasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SyncTasks
    **/
    _count?: true | SyncTaskCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SyncTaskAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SyncTaskSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SyncTaskMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SyncTaskMaxAggregateInputType;
};
export type GetSyncTaskAggregateType<T extends SyncTaskAggregateArgs> = {
    [P in keyof T & keyof AggregateSyncTask]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSyncTask[P]> : Prisma.GetScalarType<T[P], AggregateSyncTask[P]>;
};
export type SyncTaskGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SyncTaskWhereInput;
    orderBy?: Prisma.SyncTaskOrderByWithAggregationInput | Prisma.SyncTaskOrderByWithAggregationInput[];
    by: Prisma.SyncTaskScalarFieldEnum[] | Prisma.SyncTaskScalarFieldEnum;
    having?: Prisma.SyncTaskScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SyncTaskCountAggregateInputType | true;
    _avg?: SyncTaskAvgAggregateInputType;
    _sum?: SyncTaskSumAggregateInputType;
    _min?: SyncTaskMinAggregateInputType;
    _max?: SyncTaskMaxAggregateInputType;
};
export type SyncTaskGroupByOutputType = {
    id: string;
    clientId: string;
    title: string;
    payload: runtime.JsonValue;
    version: number;
    clientUpdatedAt: Date;
    serverUpdatedAt: Date;
    createdAt: Date;
    deletedAt: Date | null;
    _count: SyncTaskCountAggregateOutputType | null;
    _avg: SyncTaskAvgAggregateOutputType | null;
    _sum: SyncTaskSumAggregateOutputType | null;
    _min: SyncTaskMinAggregateOutputType | null;
    _max: SyncTaskMaxAggregateOutputType | null;
};
type GetSyncTaskGroupByPayload<T extends SyncTaskGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SyncTaskGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SyncTaskGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SyncTaskGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SyncTaskGroupByOutputType[P]>;
}>>;
export type SyncTaskWhereInput = {
    AND?: Prisma.SyncTaskWhereInput | Prisma.SyncTaskWhereInput[];
    OR?: Prisma.SyncTaskWhereInput[];
    NOT?: Prisma.SyncTaskWhereInput | Prisma.SyncTaskWhereInput[];
    id?: Prisma.StringFilter<"SyncTask"> | string;
    clientId?: Prisma.StringFilter<"SyncTask"> | string;
    title?: Prisma.StringFilter<"SyncTask"> | string;
    payload?: Prisma.JsonFilter<"SyncTask">;
    version?: Prisma.IntFilter<"SyncTask"> | number;
    clientUpdatedAt?: Prisma.DateTimeFilter<"SyncTask"> | Date | string;
    serverUpdatedAt?: Prisma.DateTimeFilter<"SyncTask"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"SyncTask"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"SyncTask"> | Date | string | null;
};
export type SyncTaskOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    clientUpdatedAt?: Prisma.SortOrder;
    serverUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type SyncTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    clientId?: string;
    AND?: Prisma.SyncTaskWhereInput | Prisma.SyncTaskWhereInput[];
    OR?: Prisma.SyncTaskWhereInput[];
    NOT?: Prisma.SyncTaskWhereInput | Prisma.SyncTaskWhereInput[];
    title?: Prisma.StringFilter<"SyncTask"> | string;
    payload?: Prisma.JsonFilter<"SyncTask">;
    version?: Prisma.IntFilter<"SyncTask"> | number;
    clientUpdatedAt?: Prisma.DateTimeFilter<"SyncTask"> | Date | string;
    serverUpdatedAt?: Prisma.DateTimeFilter<"SyncTask"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"SyncTask"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"SyncTask"> | Date | string | null;
}, "id" | "clientId">;
export type SyncTaskOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    clientUpdatedAt?: Prisma.SortOrder;
    serverUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.SyncTaskCountOrderByAggregateInput;
    _avg?: Prisma.SyncTaskAvgOrderByAggregateInput;
    _max?: Prisma.SyncTaskMaxOrderByAggregateInput;
    _min?: Prisma.SyncTaskMinOrderByAggregateInput;
    _sum?: Prisma.SyncTaskSumOrderByAggregateInput;
};
export type SyncTaskScalarWhereWithAggregatesInput = {
    AND?: Prisma.SyncTaskScalarWhereWithAggregatesInput | Prisma.SyncTaskScalarWhereWithAggregatesInput[];
    OR?: Prisma.SyncTaskScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SyncTaskScalarWhereWithAggregatesInput | Prisma.SyncTaskScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SyncTask"> | string;
    clientId?: Prisma.StringWithAggregatesFilter<"SyncTask"> | string;
    title?: Prisma.StringWithAggregatesFilter<"SyncTask"> | string;
    payload?: Prisma.JsonWithAggregatesFilter<"SyncTask">;
    version?: Prisma.IntWithAggregatesFilter<"SyncTask"> | number;
    clientUpdatedAt?: Prisma.DateTimeWithAggregatesFilter<"SyncTask"> | Date | string;
    serverUpdatedAt?: Prisma.DateTimeWithAggregatesFilter<"SyncTask"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SyncTask"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"SyncTask"> | Date | string | null;
};
export type SyncTaskCreateInput = {
    id?: string;
    clientId: string;
    title: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: number;
    clientUpdatedAt: Date | string;
    serverUpdatedAt?: Date | string;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type SyncTaskUncheckedCreateInput = {
    id?: string;
    clientId: string;
    title: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: number;
    clientUpdatedAt: Date | string;
    serverUpdatedAt?: Date | string;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type SyncTaskUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    clientUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serverUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SyncTaskUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    clientUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serverUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SyncTaskCreateManyInput = {
    id?: string;
    clientId: string;
    title: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: number;
    clientUpdatedAt: Date | string;
    serverUpdatedAt?: Date | string;
    createdAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type SyncTaskUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    clientUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serverUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SyncTaskUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    clientUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serverUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SyncTaskCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    clientUpdatedAt?: Prisma.SortOrder;
    serverUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type SyncTaskAvgOrderByAggregateInput = {
    version?: Prisma.SortOrder;
};
export type SyncTaskMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    clientUpdatedAt?: Prisma.SortOrder;
    serverUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type SyncTaskMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    clientUpdatedAt?: Prisma.SortOrder;
    serverUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type SyncTaskSumOrderByAggregateInput = {
    version?: Prisma.SortOrder;
};
export type SyncTaskSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    title?: boolean;
    payload?: boolean;
    version?: boolean;
    clientUpdatedAt?: boolean;
    serverUpdatedAt?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["syncTask"]>;
export type SyncTaskSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    title?: boolean;
    payload?: boolean;
    version?: boolean;
    clientUpdatedAt?: boolean;
    serverUpdatedAt?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["syncTask"]>;
export type SyncTaskSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    title?: boolean;
    payload?: boolean;
    version?: boolean;
    clientUpdatedAt?: boolean;
    serverUpdatedAt?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
}, ExtArgs["result"]["syncTask"]>;
export type SyncTaskSelectScalar = {
    id?: boolean;
    clientId?: boolean;
    title?: boolean;
    payload?: boolean;
    version?: boolean;
    clientUpdatedAt?: boolean;
    serverUpdatedAt?: boolean;
    createdAt?: boolean;
    deletedAt?: boolean;
};
export type SyncTaskOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "clientId" | "title" | "payload" | "version" | "clientUpdatedAt" | "serverUpdatedAt" | "createdAt" | "deletedAt", ExtArgs["result"]["syncTask"]>;
export type $SyncTaskPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SyncTask";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        clientId: string;
        title: string;
        payload: runtime.JsonValue;
        version: number;
        clientUpdatedAt: Date;
        serverUpdatedAt: Date;
        createdAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["syncTask"]>;
    composites: {};
};
export type SyncTaskGetPayload<S extends boolean | null | undefined | SyncTaskDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload, S>;
export type SyncTaskCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SyncTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SyncTaskCountAggregateInputType | true;
};
export interface SyncTaskDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SyncTask'];
        meta: {
            name: 'SyncTask';
        };
    };
    /**
     * Find zero or one SyncTask that matches the filter.
     * @param {SyncTaskFindUniqueArgs} args - Arguments to find a SyncTask
     * @example
     * // Get one SyncTask
     * const syncTask = await prisma.syncTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncTaskFindUniqueArgs>(args: Prisma.SelectSubset<T, SyncTaskFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SyncTaskClient<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SyncTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncTaskFindUniqueOrThrowArgs} args - Arguments to find a SyncTask
     * @example
     * // Get one SyncTask
     * const syncTask = await prisma.syncTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncTaskFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SyncTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SyncTaskClient<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SyncTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncTaskFindFirstArgs} args - Arguments to find a SyncTask
     * @example
     * // Get one SyncTask
     * const syncTask = await prisma.syncTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncTaskFindFirstArgs>(args?: Prisma.SelectSubset<T, SyncTaskFindFirstArgs<ExtArgs>>): Prisma.Prisma__SyncTaskClient<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SyncTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncTaskFindFirstOrThrowArgs} args - Arguments to find a SyncTask
     * @example
     * // Get one SyncTask
     * const syncTask = await prisma.syncTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncTaskFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SyncTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SyncTaskClient<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SyncTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncTasks
     * const syncTasks = await prisma.syncTask.findMany()
     *
     * // Get first 10 SyncTasks
     * const syncTasks = await prisma.syncTask.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const syncTaskWithIdOnly = await prisma.syncTask.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SyncTaskFindManyArgs>(args?: Prisma.SelectSubset<T, SyncTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SyncTask.
     * @param {SyncTaskCreateArgs} args - Arguments to create a SyncTask.
     * @example
     * // Create one SyncTask
     * const SyncTask = await prisma.syncTask.create({
     *   data: {
     *     // ... data to create a SyncTask
     *   }
     * })
     *
     */
    create<T extends SyncTaskCreateArgs>(args: Prisma.SelectSubset<T, SyncTaskCreateArgs<ExtArgs>>): Prisma.Prisma__SyncTaskClient<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SyncTasks.
     * @param {SyncTaskCreateManyArgs} args - Arguments to create many SyncTasks.
     * @example
     * // Create many SyncTasks
     * const syncTask = await prisma.syncTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SyncTaskCreateManyArgs>(args?: Prisma.SelectSubset<T, SyncTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SyncTasks and returns the data saved in the database.
     * @param {SyncTaskCreateManyAndReturnArgs} args - Arguments to create many SyncTasks.
     * @example
     * // Create many SyncTasks
     * const syncTask = await prisma.syncTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SyncTasks and only return the `id`
     * const syncTaskWithIdOnly = await prisma.syncTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SyncTaskCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SyncTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SyncTask.
     * @param {SyncTaskDeleteArgs} args - Arguments to delete one SyncTask.
     * @example
     * // Delete one SyncTask
     * const SyncTask = await prisma.syncTask.delete({
     *   where: {
     *     // ... filter to delete one SyncTask
     *   }
     * })
     *
     */
    delete<T extends SyncTaskDeleteArgs>(args: Prisma.SelectSubset<T, SyncTaskDeleteArgs<ExtArgs>>): Prisma.Prisma__SyncTaskClient<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SyncTask.
     * @param {SyncTaskUpdateArgs} args - Arguments to update one SyncTask.
     * @example
     * // Update one SyncTask
     * const syncTask = await prisma.syncTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SyncTaskUpdateArgs>(args: Prisma.SelectSubset<T, SyncTaskUpdateArgs<ExtArgs>>): Prisma.Prisma__SyncTaskClient<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SyncTasks.
     * @param {SyncTaskDeleteManyArgs} args - Arguments to filter SyncTasks to delete.
     * @example
     * // Delete a few SyncTasks
     * const { count } = await prisma.syncTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SyncTaskDeleteManyArgs>(args?: Prisma.SelectSubset<T, SyncTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SyncTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncTasks
     * const syncTask = await prisma.syncTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SyncTaskUpdateManyArgs>(args: Prisma.SelectSubset<T, SyncTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SyncTasks and returns the data updated in the database.
     * @param {SyncTaskUpdateManyAndReturnArgs} args - Arguments to update many SyncTasks.
     * @example
     * // Update many SyncTasks
     * const syncTask = await prisma.syncTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SyncTasks and only return the `id`
     * const syncTaskWithIdOnly = await prisma.syncTask.updateManyAndReturn({
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
    updateManyAndReturn<T extends SyncTaskUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SyncTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SyncTask.
     * @param {SyncTaskUpsertArgs} args - Arguments to update or create a SyncTask.
     * @example
     * // Update or create a SyncTask
     * const syncTask = await prisma.syncTask.upsert({
     *   create: {
     *     // ... data to create a SyncTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncTask we want to update
     *   }
     * })
     */
    upsert<T extends SyncTaskUpsertArgs>(args: Prisma.SelectSubset<T, SyncTaskUpsertArgs<ExtArgs>>): Prisma.Prisma__SyncTaskClient<runtime.Types.Result.GetResult<Prisma.$SyncTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SyncTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncTaskCountArgs} args - Arguments to filter SyncTasks to count.
     * @example
     * // Count the number of SyncTasks
     * const count = await prisma.syncTask.count({
     *   where: {
     *     // ... the filter for the SyncTasks we want to count
     *   }
     * })
    **/
    count<T extends SyncTaskCountArgs>(args?: Prisma.Subset<T, SyncTaskCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SyncTaskCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SyncTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SyncTaskAggregateArgs>(args: Prisma.Subset<T, SyncTaskAggregateArgs>): Prisma.PrismaPromise<GetSyncTaskAggregateType<T>>;
    /**
     * Group by SyncTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncTaskGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SyncTaskGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SyncTaskGroupByArgs['orderBy'];
    } : {
        orderBy?: SyncTaskGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SyncTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SyncTask model
     */
    readonly fields: SyncTaskFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SyncTask.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SyncTaskClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the SyncTask model
 */
export interface SyncTaskFieldRefs {
    readonly id: Prisma.FieldRef<"SyncTask", 'String'>;
    readonly clientId: Prisma.FieldRef<"SyncTask", 'String'>;
    readonly title: Prisma.FieldRef<"SyncTask", 'String'>;
    readonly payload: Prisma.FieldRef<"SyncTask", 'Json'>;
    readonly version: Prisma.FieldRef<"SyncTask", 'Int'>;
    readonly clientUpdatedAt: Prisma.FieldRef<"SyncTask", 'DateTime'>;
    readonly serverUpdatedAt: Prisma.FieldRef<"SyncTask", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"SyncTask", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"SyncTask", 'DateTime'>;
}
/**
 * SyncTask findUnique
 */
export type SyncTaskFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * Filter, which SyncTask to fetch.
     */
    where: Prisma.SyncTaskWhereUniqueInput;
};
/**
 * SyncTask findUniqueOrThrow
 */
export type SyncTaskFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * Filter, which SyncTask to fetch.
     */
    where: Prisma.SyncTaskWhereUniqueInput;
};
/**
 * SyncTask findFirst
 */
export type SyncTaskFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * Filter, which SyncTask to fetch.
     */
    where?: Prisma.SyncTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SyncTasks to fetch.
     */
    orderBy?: Prisma.SyncTaskOrderByWithRelationInput | Prisma.SyncTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SyncTasks.
     */
    cursor?: Prisma.SyncTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SyncTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SyncTasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SyncTasks.
     */
    distinct?: Prisma.SyncTaskScalarFieldEnum | Prisma.SyncTaskScalarFieldEnum[];
};
/**
 * SyncTask findFirstOrThrow
 */
export type SyncTaskFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * Filter, which SyncTask to fetch.
     */
    where?: Prisma.SyncTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SyncTasks to fetch.
     */
    orderBy?: Prisma.SyncTaskOrderByWithRelationInput | Prisma.SyncTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SyncTasks.
     */
    cursor?: Prisma.SyncTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SyncTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SyncTasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SyncTasks.
     */
    distinct?: Prisma.SyncTaskScalarFieldEnum | Prisma.SyncTaskScalarFieldEnum[];
};
/**
 * SyncTask findMany
 */
export type SyncTaskFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * Filter, which SyncTasks to fetch.
     */
    where?: Prisma.SyncTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SyncTasks to fetch.
     */
    orderBy?: Prisma.SyncTaskOrderByWithRelationInput | Prisma.SyncTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SyncTasks.
     */
    cursor?: Prisma.SyncTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SyncTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SyncTasks.
     */
    skip?: number;
    distinct?: Prisma.SyncTaskScalarFieldEnum | Prisma.SyncTaskScalarFieldEnum[];
};
/**
 * SyncTask create
 */
export type SyncTaskCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * The data needed to create a SyncTask.
     */
    data: Prisma.XOR<Prisma.SyncTaskCreateInput, Prisma.SyncTaskUncheckedCreateInput>;
};
/**
 * SyncTask createMany
 */
export type SyncTaskCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncTasks.
     */
    data: Prisma.SyncTaskCreateManyInput | Prisma.SyncTaskCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SyncTask createManyAndReturn
 */
export type SyncTaskCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * The data used to create many SyncTasks.
     */
    data: Prisma.SyncTaskCreateManyInput | Prisma.SyncTaskCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SyncTask update
 */
export type SyncTaskUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * The data needed to update a SyncTask.
     */
    data: Prisma.XOR<Prisma.SyncTaskUpdateInput, Prisma.SyncTaskUncheckedUpdateInput>;
    /**
     * Choose, which SyncTask to update.
     */
    where: Prisma.SyncTaskWhereUniqueInput;
};
/**
 * SyncTask updateMany
 */
export type SyncTaskUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncTasks.
     */
    data: Prisma.XOR<Prisma.SyncTaskUpdateManyMutationInput, Prisma.SyncTaskUncheckedUpdateManyInput>;
    /**
     * Filter which SyncTasks to update
     */
    where?: Prisma.SyncTaskWhereInput;
    /**
     * Limit how many SyncTasks to update.
     */
    limit?: number;
};
/**
 * SyncTask updateManyAndReturn
 */
export type SyncTaskUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * The data used to update SyncTasks.
     */
    data: Prisma.XOR<Prisma.SyncTaskUpdateManyMutationInput, Prisma.SyncTaskUncheckedUpdateManyInput>;
    /**
     * Filter which SyncTasks to update
     */
    where?: Prisma.SyncTaskWhereInput;
    /**
     * Limit how many SyncTasks to update.
     */
    limit?: number;
};
/**
 * SyncTask upsert
 */
export type SyncTaskUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * The filter to search for the SyncTask to update in case it exists.
     */
    where: Prisma.SyncTaskWhereUniqueInput;
    /**
     * In case the SyncTask found by the `where` argument doesn't exist, create a new SyncTask with this data.
     */
    create: Prisma.XOR<Prisma.SyncTaskCreateInput, Prisma.SyncTaskUncheckedCreateInput>;
    /**
     * In case the SyncTask was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SyncTaskUpdateInput, Prisma.SyncTaskUncheckedUpdateInput>;
};
/**
 * SyncTask delete
 */
export type SyncTaskDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
    /**
     * Filter which SyncTask to delete.
     */
    where: Prisma.SyncTaskWhereUniqueInput;
};
/**
 * SyncTask deleteMany
 */
export type SyncTaskDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SyncTasks to delete
     */
    where?: Prisma.SyncTaskWhereInput;
    /**
     * Limit how many SyncTasks to delete.
     */
    limit?: number;
};
/**
 * SyncTask without action
 */
export type SyncTaskDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncTask
     */
    select?: Prisma.SyncTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SyncTask
     */
    omit?: Prisma.SyncTaskOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=SyncTask.d.ts.map