/*
  Warnings:

  - You are about to drop the column `materialId` on the `PurchaseItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_materialId_fkey";

-- DropIndex
DROP INDEX "PurchaseItem_materialId_idx";

-- AlterTable
ALTER TABLE "PurchaseItem" DROP COLUMN "materialId";
