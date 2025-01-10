import express from "express";
import {
    createOurWorkProcess,
    getOurWorkProcesses,
    getOurWorkProcessByServiceId,
    updateOurWorkProcess,
    deleteOurWorkProcess
} from "../controllers/admin/ourWorkProcess.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"; // Multer for file upload
import { ourWorkProcessSchema } from "../schemas/ourWorkProcess.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

import { ValidMongoId, ZodWrapper } from '../utils/global.js'

const router = express.Router();

router.get("/", getOurWorkProcesses);

router.post(
    "/create",
    verifyJwt,
    upload.single("icon"),
    validateRequest(ourWorkProcessSchema, PARAM_AND_BODY),
    createOurWorkProcess
);

router.get("/:serviceId",validateRequest(ZodWrapper({ serviceId: ValidMongoId }), PARAM), getOurWorkProcessByServiceId);

router.put(
    "/:id",
    verifyJwt,
    upload.single("icon"),
    validateRequest(ourWorkProcessSchema, PARAM_AND_BODY),
    updateOurWorkProcess
);

router.delete("/:id", verifyJwt,validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteOurWorkProcess);

export default router;
