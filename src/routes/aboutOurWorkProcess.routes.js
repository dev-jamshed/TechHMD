const express = require("express");
const {
    createAboutOurWorkProcess,
    getAboutOurWorkProcesses,
    getAboutOurWorkProcessById,
    updateAboutOurWorkProcess,
    deleteAboutOurWorkProcess
} = require("../controllers/admin/aboutOurWorkProcess.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { aboutOurWorkProcessSchema } = require("../schemas/aboutOurWorkProcess.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');

const router = express.Router();

router.get("/", getAboutOurWorkProcesses);

router.post(
    "/create",
    verifyJwt,
    upload.single("icon"),
    validateRequest(aboutOurWorkProcessSchema, PARAM_AND_BODY),
    createAboutOurWorkProcess
);

router.get("/:id", validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getAboutOurWorkProcessById);

router.put(
    "/:id",
    verifyJwt,
    upload.single("icon"),
    validateRequest(aboutOurWorkProcessSchema, PARAM_AND_BODY),
    updateAboutOurWorkProcess
);

router.delete("/:id", verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteAboutOurWorkProcess);

module.exports = router;
