import express from "express";
import { createOrUpdateHomeController, getHomeController } from "../controllers/admin/home.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { homeSchema } from "../schemas/home.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM_AND_BODY } from "../utils/constants/global.js";

const router = express.Router();

router.get("/", getHomeController);

router.post(
  "/create-or-update",
  verifyJwt,
  upload.single("media"),
  validateRequest(homeSchema, PARAM_AND_BODY),
  createOrUpdateHomeController
);

export default router;
