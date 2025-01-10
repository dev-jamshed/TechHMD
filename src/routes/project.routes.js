import express from "express";
import { getProjectController, createProjectController, updateProjectController, deleteProjectController, getAllProjectsController } from "../controllers/admin/project.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { projectSchema } from "../schemas/project.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM_AND_BODY } from "../utils/constants/global.js";

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

export default router;
