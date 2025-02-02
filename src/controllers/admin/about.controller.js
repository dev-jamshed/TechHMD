import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { AboutModel } from "../../models/about.model.js";
import uploadOnServer, { deleteImageFromServer } from "../../utils/cloudinary.js";
import sendResponse from "../../utils/responseHandler.js";
import { UPDATE_SUCCESS, DELETE_SUCCESS, CREATE_SUCCESS } from "../../utils/constants/message.js";
import checkNotFound from "../../utils/checkNotFound.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { pipeline } from "../../utils/global.js";

export const createAboutController = asyncHandler(async (req, res) => {
  const { heading, description, pageName, serviceId } = req.body;

  let media;
  if (req.file?.path) {
    const result = await uploadOnServer(req.file.path);
    media = result?.url;
  }

  const about = await AboutModel.create({ heading, description, media, pageName, serviceId });
  if (about.serviceId) {
    const { serviceId, ...otherData } = (await about.populate("serviceId", "_id name")).toObject()
    const updatedAbout = { service: serviceId, ...otherData }
    return sendResponse(res, STATUS_CODES.CREATED, updatedAbout, CREATE_SUCCESS("About section"));
  }

  sendResponse(res, STATUS_CODES.SUCCESS, about, CREATE_SUCCESS("About section"));
});


export const getAboutSectionsController = asyncHandler(async (req, res) => {
  const aboutSections = await AboutModel.aggregate(pipeline);

  if (aboutSections.length == 0) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "About sections not found");
  }

  res.status(STATUS_CODES.SUCCESS).json(
    new ApiResponse(STATUS_CODES.SUCCESS, aboutSections, "About sections fetched successfully")
  );
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
  const { id } = req.params
  const { heading, description, pageName, serviceId } = req.body;

  let media;
  if (req.file?.path) {
    if (existingAbout.media) {
      await deleteImageFromServer(existingAbout.media);
    }
    const result = await uploadOnServer(req.file.path);
    media = result?.url;
  }

  const updateData = {
    heading, description, media,
    ...(serviceId ? { serviceId } : { $unset: { serviceId: 1 } }),
    ...(pageName ? { pageName } : { $unset: { pageName: 1 } })
  };

  const updatedAbout = await AboutModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  checkNotFound("About", updatedAbout);

  if (updatedAbout.serviceId) {
    const { serviceId, ...otherData } = (await updatedAbout.populate("serviceId", "_id name")).toObject()
    const _updatedAbout = { service: serviceId, ...otherData }
    return sendResponse(res, STATUS_CODES.CREATED, _updatedAbout, UPDATE_SUCCESS("About section"));
  }
  sendResponse(res, STATUS_CODES.SUCCESS, updatedAbout, UPDATE_SUCCESS("About section"));
});

export const deleteAboutController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteAbout = await AboutModel.findByIdAndDelete(id);
  checkNotFound("About", deleteAbout);

  if (deleteAbout.media) {
    await deleteImageFromServer(deleteAbout.media);
  }

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("About"));
});