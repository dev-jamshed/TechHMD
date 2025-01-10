import express from "express";
import { createJob, deleteJob, getJobById, getJobs, updateJob } from "../controllers/admin/job.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { jobSchema } from "../schemas/job/job.schema.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM, PARAM_AND_BODY } from '../utils/constants/global.js';

const router = express.Router();

router.post('/create', verifyJwt, validateRequest(jobSchema), createJob);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getJobById);
router.get('/', getJobs);
router.put('/:id', verifyJwt, validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...jobSchema }, PARAM_AND_BODY), updateJob);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteJob);

export default router;
