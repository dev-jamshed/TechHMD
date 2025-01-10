import express from "express";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { inquirySchema } from "../schemas/inquiry.schema.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM } from "../utils/constants/global.js";

import {
  createInquiryController,
  getAllInquiriesController,
  getInquiryByIdController,
  deleteInquiryController,
} from "../controllers/admin/inquiry.controller.js";

const router = express.Router();

router.post("/create", verifyJwt, validateRequest(inquirySchema), createInquiryController);

router.get("/", verifyJwt, getAllInquiriesController);
router.get("/:id", verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getInquiryByIdController);
router.delete("/:id", verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteInquiryController);

export default router;
