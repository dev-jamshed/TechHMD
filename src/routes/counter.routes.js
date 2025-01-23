const express = require("express");
const {
    createCounter,
    getCounters,
    getCounterById,
    updateCounter,
    deleteCounter
} = require("../controllers/admin/counter.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { counterSchema } = require("../schemas/counter.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");

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

module.exports = router;