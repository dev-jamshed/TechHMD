import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { PackageModel } from "../../models/package.model.js";
import { Service } from "../../models/service.model.js"; // Import the Service model
import ApiResponse from "../../utils/ApiResponse.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import sendResponse from "../../utils/responseHandler.js";
import mongoose from 'mongoose';

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

export {
  createPackageController,
  getAllPackagesController,
  getPackageByIdController,
  updatePackageController,
  deletePackageController,
  getPackagesByServiceIdController
};