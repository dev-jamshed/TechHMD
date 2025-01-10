import express from "express";
import {
    createCoreValue,
    getCoreValues,
    getCoreValueById,
    updateCoreValue,
    deleteCoreValue
} from "../controllers/admin/coreValue.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"; // Multer for file upload
import { coreValueSchema } from "../schemas/coreValue.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

import { ValidMongoId, ZodWrapper } from '../utils/global.js'

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

export default router;
