"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const custom_invoice_route_1 = __importDefault(require("./custom_invoice.route"));
const company_route_1 = __importDefault(require("./company.route"));
const advertisement_route_1 = __importDefault(require("./advertisement.route"));
const file_handling_route_1 = __importDefault(require("./file_handling.route"));
const user_route_1 = __importDefault(require("./user.route"));
const router = (0, express_1.Router)();
router.use("/custom-invoices", custom_invoice_route_1.default);
router.use("/companies", company_route_1.default);
router.use("/advertisements", advertisement_route_1.default);
router.use("/files", file_handling_route_1.default);
router.use("/users", user_route_1.default);
exports.default = router;
