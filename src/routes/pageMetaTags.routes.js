const express = require("express");
const {
    createPageMetaTags,
    getPageMetaTags,
    getPageMetaTagsByPageName,
    updatePageMetaTags,
    deletePageMetaTags
} = require("../controllers/admin/pageMetaTags.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { pageMetaTagsSchema } = require("../schemas/pageMetaTags.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");

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

module.exports = router;
