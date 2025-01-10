import express from "express";
import {
    createPrivacyPolicy,
    getPrivacyPolicies,
    getPrivacyPolicyById,
    updatePrivacyPolicy,
    deletePrivacyPolicy,
    getDefaultPrivacyPolicy
} from "../controllers/admin/privacyPolicy.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { privacyPolicySchema } from "../schemas/privacyPolicy.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js'

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

export default router;
