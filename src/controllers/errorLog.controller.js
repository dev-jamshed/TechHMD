const ErrorLog = require('../models/errorLog.model.js');
const asyncHandler = require('../utils/asyncHandler.js');
const checkNotFound = require('../utils/checkNotFound.js');
const { STATUS_CODES } = require('../utils/constants/statusCodes.js');
const sendResponse = require('../utils/responseHandler.js');

// Get all error logs
const getErrorLogs = asyncHandler(async (req, res) => {
    const errorLogs = await ErrorLog.find();
    checkNotFound('Error logs', errorLogs);
    sendResponse(res, STATUS_CODES.SUCCESS, errorLogs, 'Error logs fetched successfully');
});

// Mark an error log as read
const markErrorLogAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const errorLog = await ErrorLog.findById(id);
    checkNotFound('Error log', errorLog);

    if (errorLog.read) {
        return sendResponse(res, STATUS_CODES.SUCCESS, null, 'Error log was already marked as read');
    }

    errorLog.read = true;
    await errorLog.save();
    sendResponse(res, STATUS_CODES.SUCCESS, null, 'Error log marked as read');
});

module.exports = {
    getErrorLogs,
    markErrorLogAsRead
};
