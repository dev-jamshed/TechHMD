const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const asyncHandler = require("../../utils/asyncHandler.js");
const { AboutModel } = require("../../models/about.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const sendResponse = require("../../utils/responseHandler.js");
const { UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const checkNotFound = require("../../utils/checkNotFound.js");

const createAboutController = asyncHandler(async (req, res) => {
  const { heading, description, pageName, serviceId } = req.body;

  let media;
  if (req.file?.path) {
    const result = await uploadOnServer(req.file.path);
    media = result?.url;
  }

  const about = await AboutModel.create({ heading, description, media, pageName, serviceId });

  sendResponse(res, STATUS_CODES.SUCCESS, about, UPDATE_SUCCESS("About section"));
});


const getAboutController = asyncHandler(async (req, res) => {
  const { pageName, serviceId } = req.query;

  let query = {}

  if (pageName) query.pageName = pageName
  if (serviceId) query.serviceId = serviceId
  const about = await AboutModel.findOne(query);

  checkNotFound("About", about);

 sendResponse(res, STATUS_CODES.SUCCESS, about, "About fetched successfully");
});

const updateAboutController = asyncHandler(async (req, res) => {
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

const deleteAboutController = asyncHandler(async (req, res) => {
  const { pageName, serviceId } = req.query;

  const deleteAbout = await AboutModel.findOneAndDelete({ pageName, serviceId });
  checkNotFound("About", deleteAbout);

  // Delete associated media
  if (deleteAbout.media) {
    await deleteImageFromServer(deleteAbout.media);
  }

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("About"));
});

module.exports = {
  createAboutController,
  getAboutController,
  updateAboutController,
  deleteAboutController
};