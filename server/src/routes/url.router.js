import express from "express";
import {
  createUrlController,
  demo,
  getAllUrlController,
} from "../controllers/url.controller.js";

const router = express.Router();

router.get("/demo", demo);

router.post("/create", createUrlController);
router.get("/all", getAllUrlController);

export default router;
