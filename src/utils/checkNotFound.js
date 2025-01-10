import ApiError from './ApiError.js';
import { STATUS_CODES } from './constants/statusCodes.js';

const checkNotFound = (resource, data) => {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, `${resource} not found`);
  }
};

export default checkNotFound;
