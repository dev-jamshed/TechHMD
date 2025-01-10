import express from "express";
import {
    createAboutOurWorkProcess,
    getAboutOurWorkProcesses,
    getAboutOurWorkProcessById,
    updateAboutOurWorkProcess,
    deleteAboutOurWorkProcess
} from "../controllers/admin/aboutOurWorkProcess.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"; // Multer for file upload
import { aboutOurWorkProcessSchema } from "../schemas/aboutOurWorkProcess.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

import { ValidMongoId, ZodWrapper } from '../utils/global.js'

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

export default router;
