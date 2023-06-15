/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `voucherId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Voucher` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cartId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storeId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `ProductColor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `ShippingAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `ShippingPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Size` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_voucherId_fkey";

-- DropIndex
DROP INDEX "Order_paymentId_key";

-- DropIndex
DROP INDEX "Payment_voucherId_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Currency" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentId",
ADD COLUMN     "cartId" INTEGER NOT NULL,
ADD COLUMN     "orderedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "orderId",
ADD COLUMN     "cartId" INTEGER NOT NULL,
ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "voucherId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "storeId" INTEGER NOT NULL,
ALTER COLUMN "totalPrice" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductColor" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ShippingAddress" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ShippingPrice" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Voucher";

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "pourcentageType" BOOLEAN NOT NULL,
    "useTime" INTEGER NOT NULL DEFAULT 0,
    "expireDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeId" INTEGER NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_cartId_key" ON "Order"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductColor" ADD CONSTRAINT "ProductColor_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingAddress" ADD CONSTRAINT "ShippingAddress_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingPrice" ADD CONSTRAINT "ShippingPrice_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
