import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createHeroSection,
  getHeroSections,
  updateHeroSection,
  deleteHeroSection,
  getHeroSectionByTitle,
  getHeroSectionByPageOrService,
} from "../controllers/admin/heroSection.controller.js";
import { heroSectionSchema } from "../schemas/heroSection.schema.js";
import { PARAM_AND_BODY } from "../utils/constants/global.js";

const router = express.Router();

router.post(
  "/create",
  verifyJwt,
  upload.single("media"),
  validateRequest(heroSectionSchema),
  createHeroSection
);

router.get("/", getHeroSections);

// router.get(
//   "/:title",
//   getHeroSectionByTitle
// );

router.get(
  "/by-page-or-service",
  getHeroSectionByPageOrService
);

router.put(
  "/:id",
  verifyJwt,
  upload.single("media"),
  validateRequest(heroSectionSchema, PARAM_AND_BODY),
  updateHeroSection
);

router.delete(
  "/:id",
  verifyJwt,
  deleteHeroSection
);

export default router;
