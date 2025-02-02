import asyncHandler from "../../utils/asyncHandler.js";
import { AboutOurWorkProcess } from "../../models/aboutOurWorkProcess.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import uploadOnServer, { deleteImageFromServer } from "../../utils/cloudinary.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";

export const createAboutOurWorkProcess = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    let icon;
    if (req.file?.path) {
        const result = await uploadOnServer(req.file.path);
        icon = result?.url;
    }

    const aboutOurWorkProcess = await AboutOurWorkProcess.create({ icon, title, description });
    sendResponse(res, STATUS_CODES.CREATED, aboutOurWorkProcess, CREATE_SUCCESS("About Our Work Process"));
});

export const getAboutOurWorkProcesses = asyncHandler(async (req, res) => {
    const aboutOurWorkProcesses = await AboutOurWorkProcess.find();
    checkNotFound("About Our Work Process", aboutOurWorkProcesses);
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcesses, "About Our Work Processes fetched successfully");
});

export const getAboutOurWorkProcessById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const aboutOurWorkProcess = await AboutOurWorkProcess.findById(id);
    checkNotFound("About Our Work Process", aboutOurWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcess, "About Our Work Process fetched successfully");
});

export const updateAboutOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const aboutOurWorkProcess = await AboutOurWorkProcess.findById(id);
    let icon;
    if (req.file?.path) {
        if (aboutOurWorkProcess.icon) {
            await deleteImageFromServer(aboutOurWorkProcess.icon);
        }
        const result = await uploadOnServer(req.file.path);
        icon = result?.url;
    }

    checkNotFound("About Our Work Process", aboutOurWorkProcess);
    Object.assign(aboutOurWorkProcess, { icon, title, description });
    await aboutOurWorkProcess.save();
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcess, UPDATE_SUCCESS("About Our Work Process"));
});

export const deleteAboutOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const aboutOurWorkProcess = await AboutOurWorkProcess.findByIdAndDelete(id);
    if (aboutOurWorkProcess.icon) {
        await deleteImageFromServer(aboutOurWorkProcess.icon);
    }
    checkNotFound("About Our Work Process", aboutOurWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcess, DELETE_SUCCESS("About Our Work Process"));
});
