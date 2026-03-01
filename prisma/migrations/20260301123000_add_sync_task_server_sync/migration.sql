CREATE TABLE "SyncTask" (
  "id" TEXT NOT NULL,
  "clientId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  "clientUpdatedAt" TIMESTAMP(3) NOT NULL,
  "serverUpdatedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deletedAt" TIMESTAMP(3),

  CONSTRAINT "SyncTask_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SyncTask_clientId_key" ON "SyncTask"("clientId");
CREATE INDEX "SyncTask_serverUpdatedAt_idx" ON "SyncTask"("serverUpdatedAt");
CREATE INDEX "SyncTask_deletedAt_idx" ON "SyncTask"("deletedAt");
