const express = require("express");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { inquirySchema } = require("../schemas/inquiry.schema.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM } = require("../utils/constants/global.js");

const {
  createInquiryController,
  getAllInquiriesController,
  getInquiryByIdController,
  deleteInquiryController,
} = require("../controllers/admin/inquiry.controller.js");

const router = express.Router();

router.post("/create", verifyJwt, validateRequest(inquirySchema), createInquiryController);

router.get("/", verifyJwt, getAllInquiriesController);
router.get("/:id", verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getInquiryByIdController);
router.delete("/:id", verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteInquiryController);

module.exports = router;
