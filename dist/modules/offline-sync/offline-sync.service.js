"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineSyncService = void 0;
const http_1 = require("../../common/http");
const MAX_SKEW_MS = 5 * 60 * 1000;
class OfflineSyncService {
    constructor(repository, maxChangesLimit) {
        this.repository = repository;
        this.maxChangesLimit = Math.max(1, maxChangesLimit);
    }
    async init() {
        return;
    }
    start() {
        return;
    }
    async syncBatch(inputs) {
        const results = [];
        let applied = 0;
        let conflicts = 0;
        let invalid = 0;
        for (const input of inputs) {
            const result = await this.syncOne(input);
            results.push(result);
            if (result.status === "applied")
                applied += 1;
            if (result.status === "conflict")
                conflicts += 1;
            if (result.status === "invalid")
                invalid += 1;
        }
        return {
            processed: inputs.length,
            applied,
            conflicts,
            invalid,
            results,
            serverNow: new Date().toISOString(),
        };
    }
    async listChangesSince(sinceIso, limit) {
        const since = this.parseDate(sinceIso, "since");
        const effectiveLimit = Math.max(1, Math.min(this.maxChangesLimit, limit ?? this.maxChangesLimit));
        const items = await this.repository.listChangesSince(since, effectiveLimit);
        return {
            since: since.toISOString(),
            serverNow: new Date().toISOString(),
            count: items.length,
            items,
        };
    }
    async getTaskByClientId(clientId) {
        return this.repository.findByClientId(clientId.trim());
    }
    async syncOne(input) {
        const parsed = this.validateInput(input);
        if (!parsed.valid) {
            return {
                clientId: parsed.clientId,
                status: "invalid",
                message: parsed.message,
            };
        }
        const existing = await this.repository.findByClientId(parsed.clientId);
        if (!existing) {
            const created = await this.repository.create({
                clientId: parsed.clientId,
                title: parsed.title,
                payload: parsed.payload,
                clientUpdatedAt: parsed.clientUpdatedAt,
                deleted: parsed.deleted,
            });
            return {
                clientId: parsed.clientId,
                status: "applied",
                task: created,
            };
        }
        if (parsed.baseVersion === undefined || parsed.baseVersion !== existing.version) {
            return {
                clientId: parsed.clientId,
                status: "conflict",
                message: "Conflit de version",
                serverTask: existing,
            };
        }
        const serverClientUpdatedAt = new Date(existing.clientUpdatedAt);
        if (parsed.clientUpdatedAt.getTime() + MAX_SKEW_MS < serverClientUpdatedAt.getTime()) {
            return {
                clientId: parsed.clientId,
                status: "conflict",
                message: "Conflit de timestamp",
                serverTask: existing,
            };
        }
        const updated = await this.repository.updateWithVersion({
            clientId: parsed.clientId,
            expectedVersion: existing.version,
            title: parsed.title,
            payload: parsed.payload,
            clientUpdatedAt: parsed.clientUpdatedAt,
            deleted: parsed.deleted,
        });
        if (!updated) {
            const latest = await this.repository.findByClientId(parsed.clientId);
            return {
                clientId: parsed.clientId,
                status: "conflict",
                message: "Conflit de version concurrent",
                serverTask: latest ?? existing,
            };
        }
        return {
            clientId: parsed.clientId,
            status: "applied",
            task: updated,
        };
    }
    validateInput(input) {
        const clientId = (input.clientId ?? "").trim();
        if (!clientId) {
            return { valid: false, clientId: "unknown", message: "clientId est obligatoire" };
        }
        const title = (input.title ?? "").trim();
        if (!title) {
            return { valid: false, clientId, message: "title est obligatoire" };
        }
        let clientUpdatedAt;
        try {
            clientUpdatedAt = this.parseDate(input.clientUpdatedAt, "clientUpdatedAt");
        }
        catch (error) {
            return {
                valid: false,
                clientId,
                message: error instanceof Error ? error.message : "Date invalide",
            };
        }
        if (input.baseVersion !== undefined && (!Number.isInteger(input.baseVersion) || input.baseVersion < 1)) {
            return {
                valid: false,
                clientId,
                message: "baseVersion invalide",
            };
        }
        return {
            valid: true,
            clientId,
            title,
            payload: input.payload ?? {},
            clientUpdatedAt,
            baseVersion: input.baseVersion,
            deleted: Boolean(input.deleted),
        };
    }
    parseDate(value, fieldName) {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            throw new http_1.AppError(`${fieldName} invalide`, 400);
        }
        return parsed;
    }
}
exports.OfflineSyncService = OfflineSyncService;
//# sourceMappingURL=offline-sync.service.js.map