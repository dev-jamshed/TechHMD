import express from "express";
import {
    createPageMetaTags,
    getPageMetaTags,
    getPageMetaTagsByPageName,
    updatePageMetaTags,
    deletePageMetaTags
} from "../controllers/admin/pageMetaTags.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { pageMetaTagsSchema } from "../schemas/pageMetaTags.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

const router = express.Router();

router.get("/", getPageMetaTags);

router.post(
    "/create",
    verifyJwt,
    validateRequest(pageMetaTagsSchema),
    createPageMetaTags
);

router.get("/:pageName", validateRequest(pageMetaTagsSchema.pick({ pageName: true }), PARAM), getPageMetaTagsByPageName);

router.put(
    "/:pageName",
    verifyJwt,
    validateRequest(pageMetaTagsSchema),
    updatePageMetaTags
);

router.delete("/:pageName", verifyJwt, validateRequest(pageMetaTagsSchema.pick({ pageName: true }), PARAM), deletePageMetaTags);

export default router;
