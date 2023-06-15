/*
  Warnings:

  - You are about to drop the `_ProductToProductImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToProductImage" DROP CONSTRAINT "_ProductToProductImage_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductImage" DROP CONSTRAINT "_ProductToProductImage_B_fkey";

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProductToProductImage";

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
