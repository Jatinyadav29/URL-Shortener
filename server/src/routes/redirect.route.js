import express from "express";
import {
  deleteUrlController,
  redirectController,
} from "../controllers/url.controller.js";
const redirectRouter = express.Router();

redirectRouter.get("/:code", redirectController);
redirectRouter.delete("/:code", deleteUrlController);

export default redirectRouter;
