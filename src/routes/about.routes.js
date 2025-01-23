const express = require("express");
const { getAboutController, createAboutController, updateAboutController, deleteAboutController } = require("../controllers/admin/about.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { aboutSchema } = require("../schemas/about.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM_AND_BODY } = require("../utils/constants/global.js");

const router = express.Router();

router.get("/:type", getAboutController);

router.post(
  "/create",
  verifyJwt,
  upload.single("media"),
  validateRequest(aboutSchema, PARAM_AND_BODY),
  createAboutController
);

router.put(
  "/",
  verifyJwt,
  upload.single("media"),
  validateRequest(aboutSchema, PARAM_AND_BODY),
  updateAboutController
);

router.delete("/:type", verifyJwt, deleteAboutController);

module.exports = router;
