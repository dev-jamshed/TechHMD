import ApiError from "../utils/ApiError.js"
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";
import { STATUS_CODES } from "../utils/constants/statusCodes.js";


export const validateRequest = (schema, type, parse) => (req, res, next) => {
  try {
    if (parse) {
      parse.forEach(key => req.body[key] = JSON.parse(req.body[key]));
    }

    if (type == PARAM) {
      schema.parse(req.params)
      return next()
    }

    if (type == PARAM_AND_BODY) {
      schema.parse({ ...req.params, ...req.body })
      return next()
    }

    schema.parse(req.body)
    next();
  } catch (error) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", error.errors)
  }
};
