const express = require('express');
const { AVATAR, PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");
const { ourCoreTeamSchema } = require("../schemas/ourCoreTem.schema.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { createOurCoreTeam, getOurCoreTeam, updateOurCoreTeam, deleteOurCoreTeam, getFeaturedOurCoreTeam } = require('../controllers/admin/ourCoreTeam.controller.js');
const { verifyJwt } = require('../middlewares/verifyJwt.middleware.js');
const { upload } = require("../middlewares/multer.middleware.js");
const { validateRequest } = require('../middlewares/validation.middleware.js');

const router = express.Router();

router.get("/", getOurCoreTeam);
router.get("/featured", getFeaturedOurCoreTeam);
router.post(
    "/create",
    verifyJwt,
    upload.single(AVATAR),
    validateRequest(ourCoreTeamSchema),
    createOurCoreTeam
);

router.put(
    "/:id",
    verifyJwt,
    upload.single(AVATAR),
    validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM_AND_BODY),
    updateOurCoreTeam
);

router.delete(
    "/:id",
    verifyJwt,
    validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM),
    deleteOurCoreTeam
);

module.exports = router;