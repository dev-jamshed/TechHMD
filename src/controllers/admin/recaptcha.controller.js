const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const asyncHandler = require("../../utils/asyncHandler.js");
const sendResponse = require("../../utils/responseHandler.js");

const verifyRecaptchaToken = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`, { method: "POST" })
  const isValidToken = await response.json()

  if (isValidToken.success) {
    return sendResponse(res, STATUS_CODES.SUCCESS, null, "Valid token");
  }

  sendResponse(res, STATUS_CODES.BAD_REQUEST, null, "Not a valid token");

});

module.exports = {
  verifyRecaptchaToken
};
