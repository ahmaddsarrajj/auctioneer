/*
  Warnings:

  - The primary key for the `WishList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemId` on the `WishList` table. All the data in the column will be lost.
  - Added the required column `auctionId` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_itemId_fkey";

-- AlterTable
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_pkey",
DROP COLUMN "itemId",
ADD COLUMN     "auctionId" INTEGER NOT NULL,
ADD CONSTRAINT "WishList_pkey" PRIMARY KEY ("auctionId", "userId");

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
