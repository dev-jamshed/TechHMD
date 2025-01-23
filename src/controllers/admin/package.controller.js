const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { PackageModel } = require("../../models/package.model.js");
const { Service } = require("../../models/service.model.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const sendResponse = require("../../utils/responseHandler.js");
const mongoose = require('mongoose');

const createPackageController = asyncHandler(async (req, res) => {
  const { name, price, description, features, serviceId } = req.body;

  // Check if the serviceId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid service ID format");
  }

  // Check if the serviceId is valid
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid service ID");
  }

  const _package = await PackageModel.create({
    name,
    price,
    description,
    features,
    serviceId
  });

  if (!_package) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong while registering the package");
  }

  sendResponse(res, STATUS_CODES.CREATED, _package, CREATE_SUCCESS("Package"));
});

const getAllPackagesController = asyncHandler(async (req, res) => {
  const packages = await PackageModel.find().populate("serviceId");

  checkNotFound("packages", packages);

  res.status(STATUS_CODES.SUCCESS).json(
    new ApiResponse(STATUS_CODES.SUCCESS, packages, "Packages fetched successfully")
  );
});

const getPackageByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const _package = await PackageModel.findById(id).populate('serviceId');
  checkNotFound("package", _package);

  res.status(STATUS_CODES.SUCCESS).json(
    new ApiResponse(STATUS_CODES.SUCCESS, _package, "Package fetched successfully")
  );
});

const getPackagesByServiceIdController = asyncHandler(async (req, res) => {
    const { serviceId } = req.params;

    // Check if the serviceId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid service ID format");
    }

    const packages = await PackageModel.find({ serviceId }).populate('serviceId');
    checkNotFound("packages", packages);
    sendResponse(res, STATUS_CODES.SUCCESS, packages, "Packages fetched successfully");
});

const updatePackageController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, features, serviceId } = req.body;

  // Check if the serviceId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid service ID format");
  }

  // Check if the serviceId is valid
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid service ID");
  }

  const packageDetails = { name, price, description, features, serviceId };

  const updatedPackage = await PackageModel.findByIdAndUpdate(id, packageDetails, { new: true }).populate('serviceId');

  checkNotFound("package", updatedPackage);

  sendResponse(res, STATUS_CODES.SUCCESS, updatedPackage, UPDATE_SUCCESS("Package"));
});

const deletePackageController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedPackage = await PackageModel.findByIdAndDelete(id);

  checkNotFound("package", deletedPackage);

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Package"));
});

module.exports = {
  createPackageController,
  getAllPackagesController,
  getPackageByIdController,
  updatePackageController,
  deletePackageController,
  getPackagesByServiceIdController
};