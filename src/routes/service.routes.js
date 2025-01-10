import express from 'express';
import { validateRequest } from "../middlewares/validation.middleware.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { serviceSchema, slugSchema } from "../schemas/service.schema.js";
import { upload } from "../middlewares/multer.middleware.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";
import {
  createServiceController,
  getAllServicesController,
  getServiceBySlugController,
  updateServiceController,
  deleteServiceController,
  getSubServices,
  getParentServices
} from '../controllers/admin/service.controller.js';

const router = express.Router();

router.post('/create', upload.single('logo'), validateRequest(serviceSchema), createServiceController);
router.get('/', getAllServicesController);
router.get('/parent-services', getParentServices);
router.get('/sub-services/:parentServiceId', getSubServices);
router.get('/:slug', validateRequest(slugSchema, PARAM), getServiceBySlugController);
router.put('/:slug', verifyJwt, upload.single('logo'), validateRequest({ ...slugSchema, ...serviceSchema }, PARAM_AND_BODY), updateServiceController);
router.delete('/:slug', verifyJwt, validateRequest(slugSchema, PARAM), deleteServiceController);

export default router;
