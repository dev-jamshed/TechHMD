const express = require("express");
const {
    createPrivacyPolicy,
    getPrivacyPolicies,
    getPrivacyPolicyById,
    updatePrivacyPolicy,
    deletePrivacyPolicy,
    getDefaultPrivacyPolicy
} = require("../controllers/admin/privacyPolicy.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { privacyPolicySchema } = require("../schemas/privacyPolicy.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');

const router = express.Router();

router.get("/", getPrivacyPolicies);

router.post(
    "/create",
    verifyJwt,
    upload.single('image'),
    validateRequest(privacyPolicySchema),
    createPrivacyPolicy
);

router.get("/default", getDefaultPrivacyPolicy);

router.get("/:id", validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getPrivacyPolicyById);

router.put(
    "/:id",
    verifyJwt,
    upload.single('image'),
    validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...privacyPolicySchema }, PARAM_AND_BODY),
    updatePrivacyPolicy
);

router.delete("/:id", verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deletePrivacyPolicy);

module.exports = router;
