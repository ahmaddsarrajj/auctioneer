/*
  Warnings:

  - You are about to drop the column `pourcentageType` on the `Coupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "pourcentageType",
ADD COLUMN     "percentageType" BOOLEAN NOT NULL DEFAULT false;
