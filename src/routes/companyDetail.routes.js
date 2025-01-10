import express from "express";
import {
  getCompanyDetailController,
  createCompanyDetailController,
  updateCompanyDetailController,
} from "../controllers/admin/companyDetail.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { companyDetailSchema } from "../schemas/companyDetail.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/create", upload.fields([
  { name: 'headerLogo', maxCount: 1 },
  { name: 'footerLogo', maxCount: 1 },
  { name: 'ogImage', maxCount: 1 }
]), validateRequest(companyDetailSchema), createCompanyDetailController);

router.get("/", getCompanyDetailController);

router.put("/", upload.fields([
  { name: 'headerLogo', maxCount: 1 },
  { name: 'footerLogo', maxCount: 1 },
  { name: 'ogImage', maxCount: 1 }
]), validateRequest(companyDetailSchema, null, ["seo", "socialMedia"]), updateCompanyDetailController);

export default router;
