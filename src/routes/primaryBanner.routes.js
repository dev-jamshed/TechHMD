const express = require("express");
const {
    createPrimaryBanner,
    getPrimaryBanners,
    getPrimaryBannerById,
    updatePrimaryBanner,
    deletePrimaryBanner
} = require("../controllers/admin/primaryBanner.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { primaryBannerSchema } = require("../schemas/primaryBanner.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");
const { upload } = require("../middlewares/multer.middleware.js");

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

module.exports = router;
