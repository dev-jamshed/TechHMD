import express from "express";
import {
    createPrimaryBanner,
    getPrimaryBanners,
    getPrimaryBannerById,
    updatePrimaryBanner,
    deletePrimaryBanner
} from "../controllers/admin/primaryBanner.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { primaryBannerSchema } from "../schemas/primaryBanner.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getPrimaryBanners);

router.post(
    "/create",
    verifyJwt,
    upload.fields([{ name: 'primaryImage', maxCount: 1 }, { name: 'secondaryImage', maxCount: 1 }]),
    validateRequest(primaryBannerSchema, PARAM_AND_BODY),
    createPrimaryBanner
);

router.get("/:id", validateRequest(primaryBannerSchema.pick({ id: true }), PARAM), getPrimaryBannerById);

router.put(
    "/:id",
    verifyJwt,
    upload.fields([{ name: 'primaryImage', maxCount: 1 }, { name: 'secondaryImage', maxCount: 1 }]),
    validateRequest(primaryBannerSchema, PARAM_AND_BODY),
    updatePrimaryBanner
);

router.delete("/:id", verifyJwt, validateRequest(primaryBannerSchema.pick({ id: true }), PARAM), deletePrimaryBanner);

export default router;
