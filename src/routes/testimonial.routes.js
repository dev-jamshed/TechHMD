const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");

const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
} = require("../controllers/admin/testimonial.controller.js");

const { testimonialSchema } = require("../schemas/testimonial.schema.js");

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

module.exports = router;
