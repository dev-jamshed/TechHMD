const express = require("express");
const { 
  createFAQController, 
  getAllFAQsController, 
  getFAQByIdController, 
  deleteFAQController, 
  updateFAQController 
} = require("../controllers/admin/faq.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { faqValidationSchema } = require("../schemas/faq.schema.js");
const { PARAM, PARAM_AND_BODY } = require('../utils/constants/global.js');

const router = express.Router();

router.post(
  '/create', 
  verifyJwt, 
  validateRequest(faqValidationSchema), 
  createFAQController
);

router.get(
  '/:id', 
  validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), 
  getFAQByIdController
);

router.get(
  '/', 
  getAllFAQsController
);

router.put(
  '/:id', 
  verifyJwt, 
  validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...faqValidationSchema }, PARAM_AND_BODY), 
  updateFAQController
);

router.delete(
  '/:id', 
  verifyJwt, 
  validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), 
  deleteFAQController
);

module.exports = router;
