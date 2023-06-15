/*
  Warnings:

  - A unique constraint covering the columns `[country]` on the table `ShippingPrice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShippingPrice_country_key" ON "ShippingPrice"("country");

-- AddForeignKey
ALTER TABLE "ShippingAddress" ADD CONSTRAINT "ShippingAddress_country_fkey" FOREIGN KEY ("country") REFERENCES "ShippingPrice"("country") ON DELETE RESTRICT ON UPDATE CASCADE;
