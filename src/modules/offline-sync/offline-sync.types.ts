export interface SyncTaskInput {
  clientId: string;
  title: string;
  payload: unknown;
  clientUpdatedAt: string;
  baseVersion?: number;
  deleted?: boolean;
}

export interface SyncTaskDto {
  id: string;
  clientId: string;
  title: string;
  payload: unknown;
  version: number;
  clientUpdatedAt: string;
  serverUpdatedAt: string;
  createdAt: string;
  deletedAt: string | null;
}

export type SyncItemStatus = "applied" | "conflict" | "invalid";

export interface SyncItemResult {
  clientId: string;
  status: SyncItemStatus;
  task?: SyncTaskDto;
  serverTask?: SyncTaskDto;
  message?: string;
}

export interface SyncBatchResult {
  processed: number;
  applied: number;
  conflicts: number;
  invalid: number;
  results: SyncItemResult[];
  serverNow: string;
}

export interface SyncChangesResult {
  since: string;
  serverNow: string;
  count: number;
  items: SyncTaskDto[];
}
