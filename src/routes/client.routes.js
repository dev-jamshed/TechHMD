import express from "express";
import { createClient, deleteClient, getClientById, getClients, updateClient } from "../controllers/admin/client.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { clientSchema } from "../schemas/client/client.schema.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM, PARAM_AND_BODY } from '../utils/constants/global.js';

const router = express.Router();

router.post('/create', verifyJwt, upload.single('logo'), validateRequest(clientSchema), createClient);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getClientById);
router.get('/', getClients);
router.put('/:id', verifyJwt, upload.single('logo'), validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...clientSchema }, PARAM_AND_BODY), updateClient);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteClient);

export default router;
