const express = require("express");
const { createClient, deleteClient, getClientById, getClients, updateClient } = require("../controllers/admin/client.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { clientSchema } = require("../schemas/client/client.schema.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM, PARAM_AND_BODY } = require('../utils/constants/global.js');

const router = express.Router();

router.post('/create', verifyJwt, upload.single('logo'), validateRequest(clientSchema), createClient);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getClientById);
router.get('/', getClients);
router.put('/:id', verifyJwt, upload.single('logo'), validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...clientSchema }, PARAM_AND_BODY), updateClient);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteClient);

module.exports = router;
