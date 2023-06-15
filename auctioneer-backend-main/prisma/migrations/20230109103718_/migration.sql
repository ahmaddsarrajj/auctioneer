/*
  Warnings:

  - You are about to drop the column `orderId` on the `ShippingAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shippingAddressId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shippingAddressId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShippingAddress" DROP CONSTRAINT "ShippingAddress_orderId_fkey";

-- DropIndex
DROP INDEX "ShippingAddress_orderId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingAddressId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ShippingAddress" DROP COLUMN "orderId";

-- CreateIndex
CREATE UNIQUE INDEX "Order_shippingAddressId_key" ON "Order"("shippingAddressId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "ShippingAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
