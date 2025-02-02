import express from "express";
import { getAboutController, createAboutController, updateAboutController, deleteAboutController, getAboutSectionsController } from "../controllers/admin/about.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { aboutSchema } from "../schemas/about.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM_AND_BODY } from "../utils/constants/global.js";

const router = express.Router();

router.get("/", getAboutSectionsController);

router.get("/by-page-or-service", getAboutController);

router.post(
  "/create",
  verifyJwt,
  upload.single("media"),
  validateRequest(aboutSchema, PARAM_AND_BODY),
  createAboutController
);


router.put(
  "/:id",
  verifyJwt,
  upload.single("media"),
  validateRequest(aboutSchema, PARAM_AND_BODY),
  updateAboutController
);

router.delete("/:id", verifyJwt, deleteAboutController);



export default router;