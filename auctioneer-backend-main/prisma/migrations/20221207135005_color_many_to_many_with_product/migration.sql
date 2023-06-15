/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductColor` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductColor" DROP CONSTRAINT "ProductColor_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- AlterTable
ALTER TABLE "ProductColor" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "PPColor" (
    "colorId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PPColor_pkey" PRIMARY KEY ("colorId","productId")
);

-- CreateTable
CREATE TABLE "_ProductToProductImage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductImage_AB_unique" ON "_ProductToProductImage"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductImage_B_index" ON "_ProductToProductImage"("B");

-- AddForeignKey
ALTER TABLE "PPColor" ADD CONSTRAINT "PPColor_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "ProductColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPColor" ADD CONSTRAINT "PPColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductImage" ADD CONSTRAINT "_ProductToProductImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductImage" ADD CONSTRAINT "_ProductToProductImage_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
