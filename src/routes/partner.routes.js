const express = require("express");
const { createPartner, deletePartner, getPartnerById, getPartners, updatePartner } = require("../controllers/admin/partner.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { partnerSchema } = require("../schemas/partner/partner.schema.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM, PARAM_AND_BODY } = require('../utils/constants/global.js');

const router = express.Router();

router.post('/create', verifyJwt, upload.single('logo'), validateRequest(partnerSchema), createPartner);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getPartnerById);
router.get('/', getPartners);
router.put('/:id', verifyJwt, upload.single('logo'), validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...partnerSchema }, PARAM_AND_BODY), updatePartner);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deletePartner);

module.exports = router;
