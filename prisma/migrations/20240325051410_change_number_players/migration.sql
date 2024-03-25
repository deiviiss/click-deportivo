/*
  Warnings:

  - You are about to drop the column `number_players` on the `photos` table. All the data in the column will be lost.
  - Added the required column `numberPlayer` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photos" DROP COLUMN "number_players",
ADD COLUMN     "numberPlayer" INTEGER NOT NULL;
