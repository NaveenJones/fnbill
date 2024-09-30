import { Router } from "express";
import customInvoiceRouter from "./custom_invoice.route";
import companyRouter from "./company.route";
import advertisementRouter from "./advertisement.route";

import fileHandlingRouter from "./file_handling.route";
import userRouter from "./user.route";

const router: Router = Router();

router.use("/custom-invoices", customInvoiceRouter);
router.use("/companies", companyRouter);
router.use("/advertisements", advertisementRouter);
router.use("/files", fileHandlingRouter);
router.use("/users", userRouter);

export default router;
