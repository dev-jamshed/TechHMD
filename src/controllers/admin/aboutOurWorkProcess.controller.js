import asyncHandler from "../../utils/asyncHandler.js";
import { AboutOurWorkProcess } from "../../models/aboutOurWorkProcess.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import ApiError from "../../utils/ApiError.js";

// POST: Create About Our Work Process
export const createAboutOurWorkProcess = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    let icon;
    if (req.file?.path) {
        const result = await uploadOnCloudinary(req.file.path);
        icon = result?.url;
    } else {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
            message: "Icon is required",
            path: ["icon"],
        }]);
    }

    const aboutOurWorkProcess = await AboutOurWorkProcess.create({ icon, title, description });
    sendResponse(res, STATUS_CODES.CREATED, aboutOurWorkProcess, CREATE_SUCCESS("About Our Work Process"));
});

// GET: Fetch all About Our Work Processes
export const getAboutOurWorkProcesses = asyncHandler(async (req, res) => {
    const aboutOurWorkProcesses = await AboutOurWorkProcess.find();
    checkNotFound("About Our Work Process", aboutOurWorkProcesses);
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcesses, "About Our Work Processes fetched successfully");
});

// GET: Fetch single About Our Work Process by ID
export const getAboutOurWorkProcessById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const aboutOurWorkProcess = await AboutOurWorkProcess.findById(id);
    checkNotFound("About Our Work Process", aboutOurWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcess, "About Our Work Process fetched successfully");
});

// PUT: Update About Our Work Process by ID
export const updateAboutOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    let icon;
    if (req.file?.path) {
        const result = await uploadOnCloudinary(req.file.path);
        icon = result?.url;
    } else {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
            message: "Icon is required",
            path: ["icon"],
        }]);
    }

    const aboutOurWorkProcess = await AboutOurWorkProcess.findById(id);
    checkNotFound("About Our Work Process", aboutOurWorkProcess);
    Object.assign(aboutOurWorkProcess, { icon, title, description });
    await aboutOurWorkProcess.save();
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcess, UPDATE_SUCCESS("About Our Work Process"));
});

// DELETE: Delete About Our Work Process by ID
export const deleteAboutOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const aboutOurWorkProcess = await AboutOurWorkProcess.findByIdAndDelete(id);
    checkNotFound("About Our Work Process", aboutOurWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcess, DELETE_SUCCESS("About Our Work Process"));
});
