/*
  Warnings:

  - You are about to drop the column `storeId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_storeId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "storeId";
