import express from "express";
import {
    createCounter,
    getCounters,
    getCounterById,
    updateCounter,
    deleteCounter
} from "../controllers/admin/counter.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { counterSchema } from "../schemas/counter.schema.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

const router = express.Router();

router.get("/", getCounters);

router.post(
    "/create",
    verifyJwt,
    validateRequest(counterSchema, PARAM_AND_BODY),
    createCounter
);

router.get("/:id", validateRequest(counterSchema.pick({ id: true }), PARAM), getCounterById);

router.put(
    "/:id",
    verifyJwt,
    validateRequest(counterSchema, PARAM_AND_BODY),
    updateCounter
);

router.delete("/:id", verifyJwt, validateRequest(counterSchema.pick({ id: true }), PARAM), deleteCounter);

export default router;