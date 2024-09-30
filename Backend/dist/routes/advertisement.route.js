"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const advertisement_controller_1 = require("../controllers/advertisement.controller");
const router = (0, express_1.Router)();
router.get("/", advertisement_controller_1.getAdvertisementInfo);
router.post("/", advertisement_controller_1.createAdvertisementInfo);
router.put("/:id", advertisement_controller_1.updateAdvertisementInfo);
exports.default = router;
