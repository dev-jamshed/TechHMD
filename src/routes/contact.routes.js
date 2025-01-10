import express from 'express';
import {
    createContactController,
    getAllContactsController,
    getContactByIdController,
    deleteContactController,
} from '../controllers/admin/contact.controller.js';
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";  
import { contactValidationSchema } from "../schemas/contact.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

const router = express.Router();

router.post('/create', validateRequest(contactValidationSchema), createContactController);

router.get('/', verifyJwt, getAllContactsController);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getContactByIdController);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteContactController);

export default router;
