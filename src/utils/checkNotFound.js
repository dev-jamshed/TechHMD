const ApiError = require('./ApiError.js');
const { STATUS_CODES } = require('./constants/statusCodes.js');

const checkNotFound = (resource, data) => {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, `${resource} not found`);
  }
};

module.exports = checkNotFound;
