"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const custom_invoice_controller_1 = require("../controllers/custom_invoice.controller");
const router = (0, express_1.Router)();
router.get("/", custom_invoice_controller_1.getCustomInvoices);
router.get("/:id", custom_invoice_controller_1.getCustomInvoiceById);
router.post("/", custom_invoice_controller_1.createCustomInvoice);
router.put("/:id", custom_invoice_controller_1.updateCustomInvoice);
router.patch("/:id", custom_invoice_controller_1.updateStateCustomInvoice);
router.delete("/:id", custom_invoice_controller_1.deleteCustomInvoice);
router.patch("/payment/:id", custom_invoice_controller_1.updatePaymentCustomInvoice);
exports.default = router;
