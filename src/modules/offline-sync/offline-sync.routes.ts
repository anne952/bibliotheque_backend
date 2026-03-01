import { Router } from "express";
import { asyncHandler, AppError } from "../../common/http";
import { offlineSyncService } from "./offline-sync.runtime";
import { SyncTaskInput } from "./offline-sync.types";

export const offlineSyncRoutes = Router();

offlineSyncRoutes.post(
  "/sync",
  asyncHandler(async (req, res) => {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const itemsRaw = Array.isArray(body.items) ? body.items : [];

    const items: SyncTaskInput[] = itemsRaw.map((itemValue) => {
      const item = (typeof itemValue === "object" && itemValue !== null && !Array.isArray(itemValue)
        ? itemValue
        : {}) as Record<string, unknown>;

      return {
        clientId:
          typeof item.clientId === "string"
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

    const result = await offlineSyncService.syncBatch(items);
    const hasConflict = result.conflicts > 0;
    res.status(hasConflict ? 409 : 200).json(result);
  }),
);

offlineSyncRoutes.post(
  "/task/sync",
  asyncHandler(async (req, res) => {
    const body = (req.body ?? {}) as Record<string, unknown>;

    const input: SyncTaskInput = {
      clientId:
        typeof body.clientId === "string"
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

    const result = await offlineSyncService.syncBatch([input]);
    const item = result.results[0];

    if (!item) {
      throw new AppError("Aucun resultat de synchronisation", 500);
    }

    if (item.status === "invalid") {
      throw new AppError(item.message ?? "Payload invalide", 400);
    }

    if (item.status === "conflict") {
      res.status(409).json(item);
      return;
    }

    res.status(200).json(item.task);
  }),
);

offlineSyncRoutes.get(
  "/task/:clientId",
  asyncHandler(async (req, res) => {
    const clientId = String(req.params.clientId).trim();
    if (!clientId) throw new AppError("clientId invalide", 400);

    const task = await offlineSyncService.getTaskByClientId(clientId);
    if (!task) throw new AppError("Tache introuvable", 404);

    res.status(200).json(task);
  }),
);

offlineSyncRoutes.get(
  "/changes",
  asyncHandler(async (req, res) => {
    const since = typeof req.query.since === "string" ? req.query.since : "";
    if (!since) {
      throw new AppError("Le parametre since est obligatoire (ISO timestamp)", 400);
    }

    const limitRaw = req.query.limit ? Number(req.query.limit) : undefined;
    const limit = limitRaw !== undefined && Number.isFinite(limitRaw)
      ? Math.max(1, Math.min(1000, Math.trunc(limitRaw)))
      : undefined;

    const result = await offlineSyncService.listChangesSince(since, limit);
    res.status(200).json(result);
  }),
);
