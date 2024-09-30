-- CreateTable
CREATE TABLE "CustomInvoice" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "invoice_data" JSONB,
    "state" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomInvoice_invoice_id_key" ON "CustomInvoice"("invoice_id");
