import ApiResponse from "./ApiResponse.js";

const sendResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json(new ApiResponse(statusCode, data, message));
};

export default sendResponse;
