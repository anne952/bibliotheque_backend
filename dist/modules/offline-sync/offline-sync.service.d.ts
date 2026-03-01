import { SyncTaskRepository } from "./offline-sync.repository";
import { SyncBatchResult, SyncChangesResult, SyncTaskDto, SyncTaskInput } from "./offline-sync.types";
export declare class OfflineSyncService {
    private readonly repository;
    private readonly maxChangesLimit;
    constructor(repository: SyncTaskRepository, maxChangesLimit: number);
    init(): Promise<void>;
    start(): void;
    syncBatch(inputs: SyncTaskInput[]): Promise<SyncBatchResult>;
    listChangesSince(sinceIso: string, limit?: number): Promise<SyncChangesResult>;
    getTaskByClientId(clientId: string): Promise<SyncTaskDto | null>;
    private syncOne;
    private validateInput;
    private parseDate;
}
//# sourceMappingURL=offline-sync.service.d.ts.map