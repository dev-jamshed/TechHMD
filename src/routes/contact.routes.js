const express = require('express');
const {
    createContactController,
    getAllContactsController,
    getContactByIdController,
    deleteContactController,
} = require('../controllers/admin/contact.controller.js');
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");  
const { contactValidationSchema } = require("../schemas/contact.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");

const router = express.Router();

router.post('/create', validateRequest(contactValidationSchema), createContactController);

router.get('/', verifyJwt, getAllContactsController);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getContactByIdController);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteContactController);

module.exports = router;
