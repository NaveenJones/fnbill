import { Router } from "express";
import { createAdvertisementInfo, getAdvertisementInfo, updateAdvertisementInfo } from "../controllers/advertisement.controller";

const router = Router();

router.get("/", getAdvertisementInfo);
router.post("/", createAdvertisementInfo);
router.put("/:id", updateAdvertisementInfo);

export default router;
