"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncTaskRepository = void 0;
const prisma_1 = require("../../config/prisma");
function toDto(task) {
    return {
        id: task.id,
        clientId: task.clientId,
        title: task.title,
        payload: task.payload,
        version: task.version,
        clientUpdatedAt: task.clientUpdatedAt.toISOString(),
        serverUpdatedAt: task.serverUpdatedAt.toISOString(),
        createdAt: task.createdAt.toISOString(),
        deletedAt: task.deletedAt ? task.deletedAt.toISOString() : null,
    };
}
class SyncTaskRepository {
    async findByClientId(clientId) {
        const task = await prisma_1.prisma.syncTask.findUnique({
            where: { clientId },
        });
        return task ? toDto(task) : null;
    }
    async create(data) {
        const task = await prisma_1.prisma.syncTask.create({
            data: {
                clientId: data.clientId,
                title: data.title,
                payload: data.payload,
                version: 1,
                clientUpdatedAt: data.clientUpdatedAt,
                deletedAt: data.deleted ? new Date() : null,
            },
        });
        return toDto(task);
    }
    async updateWithVersion(data) {
        const updated = await prisma_1.prisma.syncTask.updateMany({
            where: {
                clientId: data.clientId,
                version: data.expectedVersion,
            },
            data: {
                title: data.title,
                payload: data.payload,
                clientUpdatedAt: data.clientUpdatedAt,
                deletedAt: data.deleted ? new Date() : null,
                version: {
                    increment: 1,
                },
            },
        });
        if (updated.count === 0) {
            return null;
        }
        const task = await prisma_1.prisma.syncTask.findUnique({
            where: { clientId: data.clientId },
        });
        return task ? toDto(task) : null;
    }
    async listChangesSince(since, limit) {
        const tasks = await prisma_1.prisma.syncTask.findMany({
            where: {
                serverUpdatedAt: {
                    gt: since,
                },
            },
            orderBy: [
                { serverUpdatedAt: "asc" },
                { id: "asc" },
            ],
            take: limit,
        });
        return tasks.map((task) => toDto(task));
    }
}
exports.SyncTaskRepository = SyncTaskRepository;
//# sourceMappingURL=offline-sync.repository.js.map