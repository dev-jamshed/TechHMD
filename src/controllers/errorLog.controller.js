import ErrorLog from '../models/errorLog.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import checkNotFound from '../utils/checkNotFound.js';
import { STATUS_CODES } from '../utils/constants/statusCodes.js';
import sendResponse from '../utils/responseHandler.js';

// Get all error logs
export const getErrorLogs = asyncHandler(async (req, res) => {
    const errorLogs = await ErrorLog.find();
    checkNotFound('Error logs', errorLogs);
    sendResponse(res, STATUS_CODES.SUCCESS, errorLogs, 'Error logs fetched successfully');
});

// Mark an error log as read
export const markErrorLogAsRead = asyncHandler(async (req, res) => {
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
