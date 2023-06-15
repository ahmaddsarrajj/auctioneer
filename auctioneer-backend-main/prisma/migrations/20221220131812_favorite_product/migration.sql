/*
  Warnings:

  - You are about to drop the `PPColor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `ProductColor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PPColor" DROP CONSTRAINT "PPColor_colorId_fkey";

-- DropForeignKey
ALTER TABLE "PPColor" DROP CONSTRAINT "PPColor_productId_fkey";

-- AlterTable
ALTER TABLE "ProductColor" ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PPColor";

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductColor" ADD CONSTRAINT "ProductColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
