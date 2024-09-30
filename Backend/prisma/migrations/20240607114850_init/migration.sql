/*
  Warnings:

  - You are about to drop the column `invoice_data` on the `CompanyInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompanyInfo" DROP COLUMN "invoice_data",
ADD COLUMN     "info" JSONB;
