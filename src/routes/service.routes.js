const express = require('express');
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { serviceSchema, slugSchema } = require("../schemas/service.schema.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");
const {
  createServiceController,
  getAllServicesController,
  getServiceBySlugController,
  updateServiceController,
  deleteServiceController,
  getSubServices,
  getParentServices
} = require('../controllers/admin/service.controller.js');

const router = express.Router();

router.post('/create', upload.single('logo'), validateRequest(serviceSchema), createServiceController);
router.get('/', getAllServicesController);
router.get('/parent-services', getParentServices);
router.get('/sub-services/:parentServiceId', getSubServices);
router.get('/:slug', validateRequest(slugSchema, PARAM), getServiceBySlugController);
router.put('/:slug', verifyJwt, upload.single('logo'), validateRequest({ ...slugSchema, ...serviceSchema }, PARAM_AND_BODY), updateServiceController);
router.delete('/:slug', verifyJwt, validateRequest(slugSchema, PARAM), deleteServiceController);

module.exports = router;
