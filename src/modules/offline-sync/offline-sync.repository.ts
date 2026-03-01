import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../config/prisma";
import { SyncTaskDto } from "./offline-sync.types";

interface UpsertTaskData {
  clientId: string;
  title: string;
  payload: unknown;
  clientUpdatedAt: Date;
  deleted: boolean;
}

function toDto(task: {
  id: string;
  clientId: string;
  title: string;
  payload: Prisma.JsonValue;
  version: number;
  clientUpdatedAt: Date;
  serverUpdatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
}): SyncTaskDto {
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

export class SyncTaskRepository {
  public async findByClientId(clientId: string): Promise<SyncTaskDto | null> {
    const task = await prisma.syncTask.findUnique({
      where: { clientId },
    });

    return task ? toDto(task) : null;
  }

  public async create(data: UpsertTaskData): Promise<SyncTaskDto> {
    const task = await prisma.syncTask.create({
      data: {
        clientId: data.clientId,
        title: data.title,
        payload: data.payload as Prisma.InputJsonValue,
        version: 1,
        clientUpdatedAt: data.clientUpdatedAt,
        deletedAt: data.deleted ? new Date() : null,
      },
    });

    return toDto(task);
  }

  public async updateWithVersion(data: {
    clientId: string;
    expectedVersion: number;
    title: string;
    payload: unknown;
    clientUpdatedAt: Date;
    deleted: boolean;
  }): Promise<SyncTaskDto | null> {
    const updated = await prisma.syncTask.updateMany({
      where: {
        clientId: data.clientId,
        version: data.expectedVersion,
      },
      data: {
        title: data.title,
        payload: data.payload as Prisma.InputJsonValue,
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

    const task = await prisma.syncTask.findUnique({
      where: { clientId: data.clientId },
    });

    return task ? toDto(task) : null;
  }

  public async listChangesSince(since: Date, limit: number): Promise<SyncTaskDto[]> {
    const tasks = await prisma.syncTask.findMany({
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
