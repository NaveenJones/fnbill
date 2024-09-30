/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AdvertisementInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CompanyInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdvertisementInfo_name_key" ON "AdvertisementInfo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyInfo_name_key" ON "CompanyInfo"("name");
