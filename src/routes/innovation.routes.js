const express = require("express");
const {
    createInnovation,
    getInnovations,
    getInnovationById,
    updateInnovation,
    deleteInnovation
} = require("../controllers/admin/innovation.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { innovationSchema } = require("../schemas/innovation.schema.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");

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

module.exports = router;
