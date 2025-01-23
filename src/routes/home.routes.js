const express = require("express");
const { createOrUpdateHomeController, getHomeController } = require("../controllers/admin/home.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { homeSchema } = require("../schemas/home.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM_AND_BODY } = require("../utils/constants/global.js");

const router = express.Router();

router.get("/", getHomeController);

router.post(
  "/create-or-update",
  verifyJwt,
  upload.single("media"),
  validateRequest(homeSchema, PARAM_AND_BODY),
  createOrUpdateHomeController
);

module.exports = router;
