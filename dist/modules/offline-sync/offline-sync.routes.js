"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offlineSyncRoutes = void 0;
const express_1 = require("express");
const http_1 = require("../../common/http");
const offline_sync_runtime_1 = require("./offline-sync.runtime");
exports.offlineSyncRoutes = (0, express_1.Router)();
exports.offlineSyncRoutes.post("/sync", (0, http_1.asyncHandler)(async (req, res) => {
    const body = (req.body ?? {});
    const itemsRaw = Array.isArray(body.items) ? body.items : [];
    const items = itemsRaw.map((itemValue) => {
        const item = (typeof itemValue === "object" && itemValue !== null && !Array.isArray(itemValue)
            ? itemValue
            : {});
        return {
            clientId: typeof item.clientId === "string"
                ? item.clientId
                : typeof item.id === "string"
                    ? item.id
                    : "",
            title: typeof item.title === "string" ? item.title : "",
            payload: "payload" in item ? item.payload : {},
            clientUpdatedAt: typeof item.clientUpdatedAt === "string" ? item.clientUpdatedAt : "",
            baseVersion: typeof item.baseVersion === "number" ? item.baseVersion : undefined,
            deleted: typeof item.deleted === "boolean" ? item.deleted : false,
        };
    });
    const result = await offline_sync_runtime_1.offlineSyncService.syncBatch(items);
    const hasConflict = result.conflicts > 0;
    res.status(hasConflict ? 409 : 200).json(result);
}));
exports.offlineSyncRoutes.post("/task/sync", (0, http_1.asyncHandler)(async (req, res) => {
    const body = (req.body ?? {});
    const input = {
        clientId: typeof body.clientId === "string"
            ? body.clientId
            : typeof body.id === "string"
                ? body.id
                : "",
        title: typeof body.title === "string" ? body.title : "",
        payload: "payload" in body ? body.payload : {},
        clientUpdatedAt: typeof body.clientUpdatedAt === "string" ? body.clientUpdatedAt : "",
        baseVersion: typeof body.baseVersion === "number" ? body.baseVersion : undefined,
        deleted: typeof body.deleted === "boolean" ? body.deleted : false,
    };
    const result = await offline_sync_runtime_1.offlineSyncService.syncBatch([input]);
    const item = result.results[0];
    if (!item) {
        throw new http_1.AppError("Aucun resultat de synchronisation", 500);
    }
    if (item.status === "invalid") {
        throw new http_1.AppError(item.message ?? "Payload invalide", 400);
    }
    if (item.status === "conflict") {
        res.status(409).json(item);
        return;
    }
    res.status(200).json(item.task);
}));
exports.offlineSyncRoutes.get("/task/:clientId", (0, http_1.asyncHandler)(async (req, res) => {
    const clientId = String(req.params.clientId).trim();
    if (!clientId)
        throw new http_1.AppError("clientId invalide", 400);
    const task = await offline_sync_runtime_1.offlineSyncService.getTaskByClientId(clientId);
    if (!task)
        throw new http_1.AppError("Tache introuvable", 404);
    res.status(200).json(task);
}));
exports.offlineSyncRoutes.get("/changes", (0, http_1.asyncHandler)(async (req, res) => {
    const since = typeof req.query.since === "string" ? req.query.since : "";
    if (!since) {
        throw new http_1.AppError("Le parametre since est obligatoire (ISO timestamp)", 400);
    }
    const limitRaw = req.query.limit ? Number(req.query.limit) : undefined;
    const limit = limitRaw !== undefined && Number.isFinite(limitRaw)
        ? Math.max(1, Math.min(1000, Math.trunc(limitRaw)))
        : undefined;
    const result = await offline_sync_runtime_1.offlineSyncService.listChangesSince(since, limit);
    res.status(200).json(result);
}));
//# sourceMappingURL=offline-sync.routes.js.map