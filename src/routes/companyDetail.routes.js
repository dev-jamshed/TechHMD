const express = require("express");
const {
  getCompanyDetailController,
  createCompanyDetailController,
  updateCompanyDetailController,
} = require("../controllers/admin/companyDetail.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { companyDetailSchema } = require("../schemas/companyDetail.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");

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

module.exports = router;
