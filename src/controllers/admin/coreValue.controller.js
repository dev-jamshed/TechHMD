import asyncHandler from "../../utils/asyncHandler.js";
import { CoreValue } from "../../models/coreValue.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import ApiError from "../../utils/ApiError.js";

export const createCoreValue = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    let image;
    if (req.file?.path) {
        const result = await uploadOnCloudinary(req.file.path);
        image = result?.url;
    } else {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
            message: "Image is required",
            path: ["image"],
        }]);
    }

    const coreValue = await CoreValue.create({ image, title, description });
    sendResponse(res, STATUS_CODES.CREATED, coreValue, CREATE_SUCCESS("Core Value"));
});

export const getCoreValues = asyncHandler(async (req, res) => {
    const coreValues = await CoreValue.find();
    checkNotFound("Core Value", coreValues);
    sendResponse(res, STATUS_CODES.SUCCESS, coreValues, "Core Values fetched successfully");
});

export const getCoreValueById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const coreValue = await CoreValue.findById(id);
    checkNotFound("Core Value", coreValue);
    sendResponse(res, STATUS_CODES.SUCCESS, coreValue, "Core Value fetched successfully");
});

export const updateCoreValue = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    let image;
    if (req.file?.path) {
        const result = await uploadOnCloudinary(req.file.path);
        image = result?.url;
    }

    const coreValue = await CoreValue.findById(id);
    checkNotFound("Core Value", coreValue);
    Object.assign(coreValue, { ...(image && { image }), title, description });
    await coreValue.save();
    sendResponse(res, STATUS_CODES.SUCCESS, coreValue, UPDATE_SUCCESS("Core Value"));
});

export const deleteCoreValue = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const coreValue = await CoreValue.findByIdAndDelete(id);
    checkNotFound("Core Value", coreValue);
    sendResponse(res, STATUS_CODES.SUCCESS, coreValue, DELETE_SUCCESS("Core Value"));
});
