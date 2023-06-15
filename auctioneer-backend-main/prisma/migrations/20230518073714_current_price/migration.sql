/*
  Warnings:

  - Added the required column `currentPrice` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "currentPrice" DECIMAL(65,30) NOT NULL;
