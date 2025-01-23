const express = require("express");
const { getProjectController, createProjectController, updateProjectController, deleteProjectController, getAllProjectsController } = require("../controllers/admin/project.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { projectSchema } = require("../schemas/project.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM_AND_BODY } = require("../utils/constants/global.js");

const router = express.Router();

router.get("/", getAllProjectsController);

router.get("/:id", getProjectController);

router.post(
  "/create",
  verifyJwt,
  upload.single("image"),
  validateRequest(projectSchema),
  createProjectController
);

router.put(
  "/:id",
  verifyJwt,
  upload.single("image"),
  validateRequest(projectSchema, PARAM_AND_BODY),
  updateProjectController
);

router.delete("/:id", verifyJwt, deleteProjectController);

module.exports = router;
