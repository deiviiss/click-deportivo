/*
  Warnings:

  - You are about to drop the column `gamaId` on the `photos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_gamaId_fkey";

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "gamaId",
ADD COLUMN     "ramaId" TEXT;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_ramaId_fkey" FOREIGN KEY ("ramaId") REFERENCES "ramas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
