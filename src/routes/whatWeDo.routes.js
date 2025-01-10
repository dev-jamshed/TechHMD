import express from "express";
import {
  createWhatWeDo,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/admin/whatWeDo.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { serviceSchema } from "../schemas/whatWeDo.schema.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

const router = express.Router();

router.post(
  "/create",
  verifyJwt,
  upload.single("image"),
  validateRequest(serviceSchema),
  createWhatWeDo
);
router.get("/", getAllServices);
router.get("/:serviceId", validateRequest(ZodWrapper({ serviceId: ValidMongoId }), PARAM), getServiceById);
router.put(
  "/:id",
  verifyJwt,
  upload.single("image"),
  validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...serviceSchema }, PARAM_AND_BODY),
  updateService
);
router.delete(
  "/:id",
  verifyJwt,
  validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM),
  deleteService
);

export default router;
