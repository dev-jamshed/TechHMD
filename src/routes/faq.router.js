import express from "express";
import { 
  createFAQController, 
  getAllFAQsController, 
  getFAQByIdController, 
  deleteFAQController, 
  updateFAQController 
} from "../controllers/admin/faq.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { continueRequest } from "../middlewares/continueRequest.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { faqValidationSchema } from "../schemas/faq.schema.js";
import { PARAM, PARAM_AND_BODY, PRODUCTION } from '../utils/constants/global.js';

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

export default router;
