const express = require('express');
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { packageSchema } = require("../schemas/package.schema.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");

const {
    createPackageController,
    getAllPackagesController,
    getPackageByIdController,
    updatePackageController,
    deletePackageController,
    getPackagesByServiceIdController
} = require("../controllers/admin/package.controller.js");

const router = express.Router();

router.post('/create', validateRequest(packageSchema), createPackageController);
router.get('/', verifyJwt, getAllPackagesController);
router.get('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getPackageByIdController);
router.get('/service/:serviceId', validateRequest(ZodWrapper({ serviceId: ValidMongoId }), PARAM), getPackagesByServiceIdController);
router.put('/:id', verifyJwt, validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...packageSchema }, PARAM_AND_BODY), updatePackageController);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deletePackageController);

module.exports = router;
