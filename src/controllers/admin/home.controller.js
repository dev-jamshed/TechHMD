const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { HomeModel } = require("../../models/home.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const sendResponse = require("../../utils/responseHandler.js");
const { UPDATE_SUCCESS } = require("../../utils/constants/message.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const createOrUpdateHomeController = asyncHandler(async (req, res) => {
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

const getHomeController = asyncHandler(async (req, res) => {
  const home = await HomeModel.findOne();

  if (!home) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Home section not found");
  }

  res.status(STATUS_CODES.SUCCESS).json(
    new ApiResponse(STATUS_CODES.SUCCESS, home, "Home section fetched successfully")
  );
});

module.exports = {
  createOrUpdateHomeController,
  getHomeController
};