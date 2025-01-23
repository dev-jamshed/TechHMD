const express = require("express");
const {
  createWhatWeDo,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/admin/whatWeDo.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { serviceSchema } = require("../schemas/whatWeDo.schema.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");

const router = express.Router();

router.post(
  "/create",
  verifyJwt,
  upload.single("image"),
  validateRequest(serviceSchema),
  createWhatWeDo
);
router.get("/", getAllServices);
router.get("/:serviceId", validateRequest(ZodWrapper({ serviceId: ValidMongoId }), PARAM), getServiceById);
router.put(
  "/:id",
  verifyJwt,
  upload.single("image"),
  validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...serviceSchema }, PARAM_AND_BODY),
  updateService
);
router.delete(
  "/:id",
  verifyJwt,
  validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM),
  deleteService
);

module.exports = router;
