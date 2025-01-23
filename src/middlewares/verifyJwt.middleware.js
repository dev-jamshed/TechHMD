const { verifyJwtToken } = require("../utils/auth.js");
const ApiError = require("../utils/ApiError.js");
const { PRODUCTION } = require('../utils/constants/global.js');

const verifyJwt = (req, res, next) => {
  if (process.env.ENV !== PRODUCTION) {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = verifyJwtToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyJwt };
