import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { AboutModel } from "../../models/about.model.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import sendResponse from "../../utils/responseHandler.js";
import { UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import ApiResponse from "../../utils/ApiResponse.js";
import checkNotFound from "../../utils/checkNotFound.js";

export const createAboutController = asyncHandler(async (req, res) => {
  const { heading, description, type } = req.body;

  let media;
  if (req.file?.path) {
    const result = await uploadOnCloudinary(req.file.path);
    media = result?.url;
  }

  const about = await AboutModel.create({ heading, description, media, type });

  sendResponse(res, STATUS_CODES.SUCCESS, about, UPDATE_SUCCESS("About section"));
});


export const getAboutController = asyncHandler(async (req, res) => {
  const about = await AboutModel.findOne({ type: req.params.type });

  if (!about) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "About section not found");
  }

  res.status(STATUS_CODES.SUCCESS).json(
    new ApiResponse(STATUS_CODES.SUCCESS, about, "About section fetched successfully")
  );
});

export const updateAboutController = asyncHandler(async (req, res) => {
  const { heading, description, type } = req.body;

  let media;
  if (req.file?.path) {
    const result = await uploadOnCloudinary(req.file.path);
    media = result?.url;
  }

  const about = await AboutModel.findOneAndUpdate({ type }, { heading, description, media, type });

  sendResponse(res, STATUS_CODES.SUCCESS, about, UPDATE_SUCCESS("About section"));
});

export const deleteAboutController = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const deleteAbout = await AboutModel.deleteMany();

  checkNotFound("About", deleteAbout);
  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("About"));
});