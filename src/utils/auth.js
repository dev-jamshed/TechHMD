const jwt = require('jsonwebtoken');
const ApiError = require("./ApiError.js");

const generateJwtToken = (id, email) => {
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};

const verifyJwtToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired token");
    }
};

module.exports = {
  generateJwtToken,
  verifyJwtToken
};