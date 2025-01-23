class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message); // Parent class (Error) ka constructor call karna zaruri hai

        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;
        
        // if (stack) {
        //     return this.stack = stack; // Custom stack agar diya gaya ho
        // } else {
        //     Error.captureStackTrace(this, this.constructor); // Yeh sahi hai
        // }
    }
}

module.exports = ApiError;
