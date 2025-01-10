import express from 'express';
import { AVATAR, PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";
import { ourCoreTeamSchema } from "../schemas/ourCoreTem.schema.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { createOurCoreTeam, getOurCoreTeam, updateOurCoreTeam, deleteOurCoreTeam ,getFeaturedOurCoreTeam} from '../controllers/admin/ourCoreTeam.controller.js';
import { verifyJwt } from '../middlewares/verifyJwt.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";
import { validateRequest } from '../middlewares/validation.middleware.js';

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

export default router;