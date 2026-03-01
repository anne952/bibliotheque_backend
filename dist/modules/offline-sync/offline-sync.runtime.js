"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offlineSyncService = void 0;
const env_1 = require("../../config/env");
const offline_sync_repository_1 = require("./offline-sync.repository");
const offline_sync_service_1 = require("./offline-sync.service");
const repository = new offline_sync_repository_1.SyncTaskRepository();
exports.offlineSyncService = new offline_sync_service_1.OfflineSyncService(repository, env_1.env.syncChangesMaxLimit);
//# sourceMappingURL=offline-sync.runtime.js.map