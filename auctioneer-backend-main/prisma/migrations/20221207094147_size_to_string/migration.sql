/*
  Warnings:

  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "size" TEXT NOT NULL;

-- DropTable
DROP TABLE "Size";
