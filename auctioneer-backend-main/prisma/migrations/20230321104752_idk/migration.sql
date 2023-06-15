/*
  Warnings:

  - You are about to drop the column `code` on the `ProductColor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ShippingAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `ProductColor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ShippingAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_shippingAddressId_key";

-- AlterTable
ALTER TABLE "ProductColor" DROP COLUMN "code",
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ShippingAddress" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShippingAddress_userId_key" ON "ShippingAddress"("userId");

-- AddForeignKey
ALTER TABLE "ShippingAddress" ADD CONSTRAINT "ShippingAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
