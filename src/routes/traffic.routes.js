const express = require('express');
const { getDailyTraffic, getWeeklyTraffic, getMonthlyTraffic } = require('../controllers/admin/traffic.controller.js');

const router = express.Router();

router.get('/daily', getDailyTraffic);
router.get('/weekly', getWeeklyTraffic);
router.get('/monthly', getMonthlyTraffic);

module.exports = router;
