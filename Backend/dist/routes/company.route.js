"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = require("../controllers/company.controller");
const router = (0, express_1.Router)();
router.get("/", company_controller_1.getCompanyInfo);
router.post("/", company_controller_1.createCompanyInfo);
router.put("/:id", company_controller_1.updateCompanyInfo);
exports.default = router;
