import { SyncTaskDto } from "./offline-sync.types";
interface UpsertTaskData {
    clientId: string;
    title: string;
    payload: unknown;
    clientUpdatedAt: Date;
    deleted: boolean;
}
export declare class SyncTaskRepository {
    findByClientId(clientId: string): Promise<SyncTaskDto | null>;
    create(data: UpsertTaskData): Promise<SyncTaskDto>;
    updateWithVersion(data: {
        clientId: string;
        expectedVersion: number;
        title: string;
        payload: unknown;
        clientUpdatedAt: Date;
        deleted: boolean;
    }): Promise<SyncTaskDto | null>;
    listChangesSince(since: Date, limit: number): Promise<SyncTaskDto[]>;
}
export {};
//# sourceMappingURL=offline-sync.repository.d.ts.map