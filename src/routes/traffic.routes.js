import express from 'express';
import { getDailyTraffic, getWeeklyTraffic, getMonthlyTraffic } from '../controllers/admin/traffic.controller.js';

const router = express.Router();

router.get('/daily', getDailyTraffic);
router.get('/weekly', getWeeklyTraffic);
router.get('/monthly', getMonthlyTraffic);

export default router;
