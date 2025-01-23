const ApiResponse = require("./ApiResponse.js");

const sendResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json(new ApiResponse(statusCode, data, message));
};

module.exports = sendResponse;
