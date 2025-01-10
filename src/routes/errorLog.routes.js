import express from 'express';
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { getErrorLogs, markErrorLogAsRead } from '../controllers/errorLog.controller.js';

const router = express.Router();

// Endpoint to get all error logs
router.get('/',verifyJwt, getErrorLogs);

// Endpoint to mark an error as read
router.put('/:id/read',verifyJwt,markErrorLogAsRead);

export default router;
