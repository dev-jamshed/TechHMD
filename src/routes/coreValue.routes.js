const express = require("express");
const {
    createCoreValue,
    getCoreValues,
    getCoreValueById,
    updateCoreValue,
    deleteCoreValue
} = require("../controllers/admin/coreValue.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { coreValueSchema } = require("../schemas/coreValue.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');

const router = express.Router();

router.get("/", getCoreValues);

router.post(
    "/create",
    verifyJwt,
    upload.single("image"),
    validateRequest(coreValueSchema, PARAM_AND_BODY),
    createCoreValue
);

router.get("/:id", validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getCoreValueById);

router.put(
    "/:id",
    verifyJwt,
    upload.single("image"),
    validateRequest(coreValueSchema, PARAM_AND_BODY),
    updateCoreValue
);

router.delete("/:id", verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteCoreValue);

module.exports = router;
