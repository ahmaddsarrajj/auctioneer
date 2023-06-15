/*
  Warnings:

  - The primary key for the `WishList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WishList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "WishList_pkey" PRIMARY KEY ("itemId", "userId");
