import { verifyJwtToken } from "../utils/auth.js";
import ApiError from "../utils/ApiError.js";
import { PRODUCTION } from '../utils/constants/global.js'; // Assuming PRODUCTION is defined

export const verifyJwt = (req, res, next) => {
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
  