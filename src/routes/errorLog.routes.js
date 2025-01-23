const express = require('express');
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { getErrorLogs, markErrorLogAsRead } = require('../controllers/errorLog.controller.js');

const router = express.Router();

// Endpoint to get all error logs
router.get('/', verifyJwt, getErrorLogs);

// Endpoint to mark an error as read
router.put('/:id/read', verifyJwt, markErrorLogAsRead);

module.exports = router;
