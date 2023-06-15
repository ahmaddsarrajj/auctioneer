/*
  Warnings:

  - You are about to drop the column `priceId` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `ShippingPrice` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Voucher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voucherId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shippingPriceId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[currencyId]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbole` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPriceId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyId` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eImage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_priceId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ShippingPrice" DROP CONSTRAINT "ShippingPrice_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_paymentId_fkey";

-- DropIndex
DROP INDEX "Currency_priceId_key";

-- DropIndex
DROP INDEX "Payment_orderId_key";

-- DropIndex
DROP INDEX "ShippingPrice_paymentId_key";

-- DropIndex
DROP INDEX "Voucher_paymentId_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "priceId",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "symbole" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "orderId",
ADD COLUMN     "shippingPriceId" INTEGER NOT NULL,
ADD COLUMN     "voucherId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "currencyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "eImage" TEXT NOT NULL,
ADD COLUMN     "weight" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "ShippingPrice" DROP COLUMN "paymentId";

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "paymentId";

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_voucherId_key" ON "Payment"("voucherId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_shippingPriceId_key" ON "Payment"("shippingPriceId");

-- CreateIndex
CREATE UNIQUE INDEX "Price_currencyId_key" ON "Price"("currencyId");

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_shippingPriceId_fkey" FOREIGN KEY ("shippingPriceId") REFERENCES "ShippingPrice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
