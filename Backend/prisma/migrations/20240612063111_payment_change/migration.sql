/*
  Warnings:

  - Added the required column `due_amount` to the `CustomInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `CustomInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomInvoice" ADD COLUMN     "due_amount" INTEGER NOT NULL,
ADD COLUMN     "paid_by" TEXT,
ADD COLUMN     "payment_details" JSONB,
ADD COLUMN     "total_amount" INTEGER NOT NULL;
