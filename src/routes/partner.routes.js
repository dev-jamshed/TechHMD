import express from "express";
import { createPartner, deletePartner, getPartnerById, getPartners, updatePartner } from "../controllers/admin/partner.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { partnerSchema } from "../schemas/partner/partner.schema.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM, PARAM_AND_BODY } from '../utils/constants/global.js';

const router = express.Router();

router.post('/create', verifyJwt, upload.single('logo'), validateRequest(partnerSchema), createPartner);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getPartnerById);
router.get('/', getPartners);
router.put('/:id', verifyJwt, upload.single('logo'), validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...partnerSchema }, PARAM_AND_BODY), updatePartner);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deletePartner);

export default router;
