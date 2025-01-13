import express from "express";
import {
    createInnovation,
    getInnovations,
    getInnovationById,
    updateInnovation,
    deleteInnovation
} from "../controllers/admin/innovation.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { innovationSchema } from "../schemas/innovation.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

const router = express.Router();

router.get("/", getInnovations);

router.post(
    "/create",
    verifyJwt,
    validateRequest(innovationSchema, PARAM_AND_BODY),
    createInnovation
);

router.get("/:id", validateRequest(innovationSchema.pick({ id: true }), PARAM), getInnovationById);

router.put(
    "/:id",
    verifyJwt,
    validateRequest(innovationSchema, PARAM_AND_BODY),
    updateInnovation
);

router.delete("/:id", verifyJwt, validateRequest(innovationSchema.pick({ id: true }), PARAM), deleteInnovation);

export default router;
