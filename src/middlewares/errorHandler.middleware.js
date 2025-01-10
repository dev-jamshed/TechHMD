import ErrorLog from '../models/errorLog.model.js';

export const ApiErrorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const errors = err.errors || [];

    // Log error to database
    await ErrorLog.create({
        message,
        statusCode,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        read: false,
    });

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
