import asyncHandler from "../../utils/asyncHandler.js";
import { OurWorkProcess } from "../../models/ourWorkProcess.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import uploadOnServer, { deleteImageFromServer } from "../../utils/cloudinary.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import { pipeline } from "../../utils/global.js";

export const createOurWorkProcess = asyncHandler(async (req, res) => {
    const { serviceId, title, description } = req.body;

    let icon;
    if (req.file?.path) {
        const result = await uploadOnServer(req.file.path);
        icon = result?.url;
    }

    const ourWorkProcess = await OurWorkProcess.create({ serviceId, icon, title, description });
    if (ourWorkProcess.serviceId) {
        const { serviceId, ...otherData } = (await ourWorkProcess.populate("serviceId", "_id name")).toObject()
        const updatedOurWorkProcess = { service: serviceId, ...otherData }
        return sendResponse(res, STATUS_CODES.CREATED, updatedOurWorkProcess, CREATE_SUCCESS("Our Work Process"));
    }

    sendResponse(res, STATUS_CODES.CREATED, ourWorkProcess, CREATE_SUCCESS("Our Work Process"));
});

export const getOurWorkProcesses = asyncHandler(async (req, res) => {
    const ourWorkProcesses = await OurWorkProcess.aggregate(pipeline)
    checkNotFound("Our Work Process", ourWorkProcesses);
    sendResponse(res, STATUS_CODES.SUCCESS, ourWorkProcesses, "Our Work Processes fetched successfully");
});

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

export const updateOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { serviceId, title, description } = req.body;

    const existingWorkProcess = await OurWorkProcess.findById(id);
    checkNotFound("Our Work Process", existingWorkProcess);

    let icon;
    if (req.file?.path) {
        if (existingWorkProcess.icon) {
            await deleteImageFromServer(existingWorkProcess.icon);
        }
        const result = await uploadOnServer(req.file.path);
        icon = result?.url;
    }

    const updatedData = { serviceId, title, description };
    if (icon) {
        updatedData.icon = icon;
    }

    Object.assign(existingWorkProcess, updatedData);
    await existingWorkProcess.save();

    if (existingWorkProcess.serviceId) {
        const { serviceId, ...otherData } = (await existingWorkProcess.populate("serviceId", "_id name")).toObject()
        const _updatedOurWorkProcess = { service: serviceId, ...otherData }
        return sendResponse(res, STATUS_CODES.CREATED, _updatedOurWorkProcess, UPDATE_SUCCESS("Our Work Process"));
    }
    sendResponse(res, STATUS_CODES.SUCCESS, existingWorkProcess, UPDATE_SUCCESS("Our Work Process"));
});

export const deleteOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ourWorkProcess = await OurWorkProcess.findByIdAndDelete(id);
    checkNotFound("Our Work Process", ourWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, ourWorkProcess, DELETE_SUCCESS("Our Work Process"));
});
