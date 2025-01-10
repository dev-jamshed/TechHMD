import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
} from "../controllers/admin/testimonial.controller.js";

import { testimonialSchema } from "../schemas/testimonial.schema.js";

const router = express.Router();

router.post(
  "/create",
  verifyJwt,
  upload.single("image"), 
  validateRequest(testimonialSchema),
  createTestimonial
);

router.get("/", getAllTestimonials);
router.get("/:id", validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getTestimonialById);

router.put("/:id", verifyJwt, upload.single("image"), validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...testimonialSchema }, PARAM_AND_BODY), updateTestimonial);
router.delete("/:id", verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteTestimonial);

export default router;
