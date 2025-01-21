import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { AboutModel } from "../../models/about.model.js";
import uploadOnServer, { deleteImageFromServer } from "../../utils/cloudinary.js";
import sendResponse from "../../utils/responseHandler.js";
import { UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import checkNotFound from "../../utils/checkNotFound.js";

export const createAboutController = asyncHandler(async (req, res) => {
  const { heading, description, pageName, serviceId } = req.body;

  let media;
  if (req.file?.path) {
    const result = await uploadOnServer(req.file.path);
    media = result?.url;
  }

  const about = await AboutModel.create({ heading, description, media, pageName, serviceId });

  sendResponse(res, STATUS_CODES.SUCCESS, about, UPDATE_SUCCESS("About section"));
});


export const getAboutController = asyncHandler(async (req, res) => {
  const { pageName, serviceId } = req.query;

  let query = {}

  if (pageName) query.pageName = pageName
  if (serviceId) query.serviceId = serviceId
  const about = await AboutModel.findOne(query);

  checkNotFound("About", about);

 sendResponse(res, STATUS_CODES.SUCCESS, about, "About fetched successfully");
});

export const updateAboutController = asyncHandler(async (req, res) => {
  const { heading, description, pageName, serviceId } = req.body;

  // Check if the about section exists
  const existingAbout = await AboutModel.findOne({ pageName, serviceId });
  checkNotFound("About", existingAbout);

  let media;
  if (req.file?.path) {
    // Delete old media
    if (existingAbout.media) {
      await deleteImageFromServer(existingAbout.media);
    }
    const result = await uploadOnServer(req.file.path);
    media = result?.url;
  }

  const updatedAbout = await AboutModel.findOneAndUpdate(
    { pageName, serviceId },
    { heading, description, media, pageName, serviceId },
    { new: true }
  );

  checkNotFound("About", updatedAbout);
  sendResponse(res, STATUS_CODES.SUCCESS, updatedAbout, UPDATE_SUCCESS("About section"));
});

export const deleteAboutController = asyncHandler(async (req, res) => {
  const { pageName, serviceId } = req.query;

  const deleteAbout = await AboutModel.findOneAndDelete({ pageName, serviceId });
  checkNotFound("About", deleteAbout);

  // Delete associated media
  if (deleteAbout.media) {
    await deleteImageFromServer(deleteAbout.media);
  }

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("About"));
});