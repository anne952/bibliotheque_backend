import { env } from "../../config/env";
import { SyncTaskRepository } from "./offline-sync.repository";
import { OfflineSyncService } from "./offline-sync.service";

const repository = new SyncTaskRepository();

export const offlineSyncService = new OfflineSyncService(repository, env.syncChangesMaxLimit);
