/*
  Warnings:

  - You are about to drop the column `shippingPriceId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_shippingPriceId_fkey";

-- DropIndex
DROP INDEX "Payment_shippingPriceId_key";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "shippingPriceId";
