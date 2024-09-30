/*
  Warnings:

  - Added the required column `uid` to the `AdvertisementInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `CompanyInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `CustomInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdvertisementInfo" ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CompanyInfo" ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CustomInvoice" ADD COLUMN     "uid" TEXT NOT NULL;
