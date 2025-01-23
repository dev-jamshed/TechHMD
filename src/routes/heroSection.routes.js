const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const {
  createHeroSection,
  getHeroSections,
  updateHeroSection,
  deleteHeroSection,
  getHeroSectionByTitle,
  getHeroSectionByPageOrService,
} = require("../controllers/admin/heroSection.controller.js");
const { heroSectionSchema } = require("../schemas/heroSection.schema.js");
const { PARAM_AND_BODY } = require("../utils/constants/global.js");

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

module.exports = router;
