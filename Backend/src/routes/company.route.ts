import { Router } from "express";
import { createCompanyInfo, getCompanyInfo, updateCompanyInfo } from "../controllers/company.controller";

const router = Router();

router.get("/", getCompanyInfo);
router.post("/", createCompanyInfo);
router.put("/:id", updateCompanyInfo);

export default router;
