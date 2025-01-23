const express = require("express");
const { createJob, deleteJob, getJobById, getJobs, updateJob } = require("../controllers/admin/job.controller.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { jobSchema } = require("../schemas/job/job.schema.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM, PARAM_AND_BODY } = require('../utils/constants/global.js');

const router = express.Router();

router.post('/create', verifyJwt, validateRequest(jobSchema), createJob);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getJobById);
router.get('/', getJobs);
router.put('/:id', verifyJwt, validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...jobSchema }, PARAM_AND_BODY), updateJob);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteJob);

module.exports = router;
