const express = require("express");
const {
    createOurWorkProcess,
    getOurWorkProcesses,
    getOurWorkProcessByServiceId,
    updateOurWorkProcess,
    deleteOurWorkProcess
} = require("../controllers/admin/ourWorkProcess.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { ourWorkProcessSchema } = require("../schemas/ourWorkProcess.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');

const router = express.Router();

router.get("/", getOurWorkProcesses);

router.post(
    "/create",
    verifyJwt,
    upload.single("icon"),
    validateRequest(ourWorkProcessSchema, PARAM_AND_BODY),
    createOurWorkProcess
);

router.get("/:serviceId", validateRequest(ZodWrapper({ serviceId: ValidMongoId }), PARAM), getOurWorkProcessByServiceId);

router.put(
    "/:id",
    verifyJwt,
    upload.single("icon"),
    validateRequest(ourWorkProcessSchema, PARAM_AND_BODY),
    updateOurWorkProcess
);

router.delete("/:id", verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteOurWorkProcess);

module.exports = router;
