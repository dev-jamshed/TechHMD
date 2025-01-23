const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { WhatWeDo } = require("../../models/WhatWeDo.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");

// Create new service
const createWhatWeDo = asyncHandler(async (req, res) => {
  const { serviceId, title, description } = req.body;

  if (!serviceId) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Service ID is required");
  }

  let image;

  // Handle image upload if exists
  const imageLocalPath = req.file?.path;
  if (imageLocalPath) {
    image = await uploadOnServer(imageLocalPath);
  }

  // Create new service
  const newService = await WhatWeDo.create({
    serviceId,
    title,
    description,
    image: image?.url,
  });

  if (!newService) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong while creating the service");
  }

  sendResponse(res, STATUS_CODES.CREATED, newService, CREATE_SUCCESS("Service"));
});

// Get all services
const getAllServices = asyncHandler(async (req, res) => {
  const services = await WhatWeDo.find();
  checkNotFound("services",services)

  sendResponse(res, STATUS_CODES.SUCCESS, services, "Services fetched successfully");
});

// Get service by serviceId (only fetch single record using serviceId)
const getServiceById = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;

  if (!serviceId) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Service ID is required");
  }

  const service = await WhatWeDo.find({ serviceId });
  
  checkNotFound("service",service)

  sendResponse(res, STATUS_CODES.SUCCESS, service, "Service fetched successfully");
});

// Update service by _id
const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description ,serviceId} = req.body;
  let image;

  // Check if the service exists
  const existingService = await WhatWeDo.findById(id);
  checkNotFound("service", existingService);

  // Handle image upload if exists
  const imageLocalPath = req.file?.path;
  if (imageLocalPath) {
    // Delete old image
    if (existingService.image) {
      await deleteImageFromServer(existingService.image);
    }
    const uploadResponse = await uploadOnServer(imageLocalPath);
    image = uploadResponse?.url;
  }

  // Find and update the service by _id
  const updatedService = await WhatWeDo.findOneAndUpdate(
    { _id: id },
    { title,serviceId,description, image: image?.url || '' },
    { new: true }
  );

  checkNotFound("service",updatedService)

  sendResponse(res, STATUS_CODES.SUCCESS, updatedService, UPDATE_SUCCESS("Service"));
});

// Delete service by _id
const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;  // id ko hi use karna hai
  // Delete the service by _id (not by serviceId)
  const deletedService = await WhatWeDo.findOneAndDelete({ _id: id });

  checkNotFound("service",deletedService)

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Service"));
});

module.exports = { createWhatWeDo, getAllServices, getServiceById, updateService, deleteService };
