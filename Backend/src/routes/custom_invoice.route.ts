import { Router } from "express";

import {
  getCustomInvoices,
  createCustomInvoice,
  getCustomInvoiceById,
  updateCustomInvoice,
  deleteCustomInvoice,
  updateStateCustomInvoice,
  updatePaymentCustomInvoice,
} from "../controllers/custom_invoice.controller";

const router = Router();

router.get("/", getCustomInvoices);
router.get("/:id", getCustomInvoiceById);
router.post("/", createCustomInvoice);
router.put("/:id", updateCustomInvoice);
router.patch("/:id", updateStateCustomInvoice);
router.delete("/:id", deleteCustomInvoice);

router.patch("/payment/:id", updatePaymentCustomInvoice);

export default router;
