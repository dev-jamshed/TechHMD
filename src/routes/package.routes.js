import express from 'express';
import { validateRequest } from "../middlewares/validation.middleware.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { packageSchema } from "../schemas/package.schema.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

import {
    createPackageController,
    getAllPackagesController,
    getPackageByIdController,
    updatePackageController,
    deletePackageController,
    getPackagesByServiceIdController
} from "../controllers/admin/package.controller.js";

const router = express.Router();

router.post('/create', verifyJwt, validateRequest(packageSchema), createPackageController);
router.get('/', getAllPackagesController);
router.get('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getPackageByIdController);
router.get('/service/:serviceId', validateRequest(ZodWrapper({ serviceId: ValidMongoId }), PARAM), getPackagesByServiceIdController);
router.put('/:id', verifyJwt, validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...packageSchema }, PARAM_AND_BODY), updatePackageController);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deletePackageController);

export default router;
