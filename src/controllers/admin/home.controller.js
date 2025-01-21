import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { HomeModel } from "../../models/home.model.js";
import uploadOnServer, { deleteImageFromServer } from "../../utils/cloudinary.js";
import sendResponse from "../../utils/responseHandler.js";
import { UPDATE_SUCCESS } from "../../utils/constants/message.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const createOrUpdateHomeController = asyncHandler(async (req, res) => {
  const { heading, description } = req.body;

  // Check if the home section exists
  const existingHome = await HomeModel.findOne();

  let media;
  if (req.file?.path) {
    // Delete old media if updating
    if (existingHome && existingHome.media) {
      await deleteImageFromServer(existingHome.media);
    }
    const result = await uploadOnServer(req.file.path);
    media = result?.url;
  }

  const home = await HomeModel.findOneAndUpdate(
    {},
    { heading, description, media },
    { new: true, upsert: true, runValidators: true }
  );

  sendResponse(res, STATUS_CODES.SUCCESS, home, UPDATE_SUCCESS("Home section"));
});

export const getHomeController = asyncHandler(async (req, res) => {
  const home = await HomeModel.findOne();

  if (!home) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Home section not found");
  }

  res.status(STATUS_CODES.SUCCESS).json(
    new ApiResponse(STATUS_CODES.SUCCESS, home, "Home section fetched successfully")
  );
});