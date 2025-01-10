import asyncHandler from "../../utils/asyncHandler.js";
import { OurWorkProcess } from "../../models/ourWorkProcess.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import ApiError from "../../utils/ApiError.js";
import { Types } from "mongoose";

// POST: Create Our Work Process
export const createOurWorkProcess = asyncHandler(async (req, res) => {
    const { serviceId, title, description } = req.body;

    let icon;
    if (req.file?.path) {
        const result = await uploadOnCloudinary(req.file.path);
        icon = result?.url;
    }

    const ourWorkProcess = await OurWorkProcess.create({ serviceId, icon, title, description });
    sendResponse(res, STATUS_CODES.CREATED, ourWorkProcess, CREATE_SUCCESS("Our Work Process"));
});

// GET: Fetch all Our Work Processes
export const getOurWorkProcesses = asyncHandler(async (req, res) => {
    const ourWorkProcesses = await OurWorkProcess.find()
    checkNotFound("Our Work Process", ourWorkProcesses);
    sendResponse(res, STATUS_CODES.SUCCESS, ourWorkProcesses, "Our Work Processes fetched successfully");
});

// GET: Fetch single Our Work Process by serviceId
export const getOurWorkProcessByServiceId = asyncHandler(async (req, res) => {
    const { serviceId } = req.params;
    const ourWorkProcess = await OurWorkProcess.aggregate([
        {
            $match: { serviceId }
        },
        {
            $lookup: {
                from: "services",
                localField: "serviceId",
                foreignField: "_id",
                as: "serviceId"
            }
        }
    ]);
    checkNotFound("Our Work Process", ourWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, ourWorkProcess, "Our Work Process fetched successfully");
});

// PUT: Update Our Work Process by ID
export const updateOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { serviceId, title, description } = req.body;

    let icon;
    if (req.file?.path) {
        const result = await uploadOnCloudinary(req.file.path);
        icon = result?.url;
    }

    const ourWorkProcess = await OurWorkProcess.findById(id);
    checkNotFound("Our Work Process", ourWorkProcess);
    Object.assign(ourWorkProcess, { serviceId, ...(icon && { icon }), title, description });
    await ourWorkProcess.save();
    sendResponse(res, STATUS_CODES.SUCCESS, ourWorkProcess, UPDATE_SUCCESS("Our Work Process"));
});

// DELETE: Delete Our Work Process by ID
export const deleteOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ourWorkProcess = await OurWorkProcess.findByIdAndDelete(id);
    checkNotFound("Our Work Process", ourWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, ourWorkProcess, DELETE_SUCCESS("Our Work Process"));
});
