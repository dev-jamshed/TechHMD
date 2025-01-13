import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { Innovation } from "../../models/innovation.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";

const createInnovation = asyncHandler(async (req, res) => {
    const existingInnovation = await Innovation.findOne();
    if (existingInnovation) {
        throw new ApiError(STATUS_CODES.CONFLICT, "An innovation already exists. Only one innovation can be created.");
    }

    const { title_1, title_2, description, innovations } = req.body;

    const innovation = await Innovation.create({
        title_1,
        title_2,
        description,
        innovations
    });

    if (!innovation) {
        throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong while creating the Innovation");
    }

    sendResponse(res, STATUS_CODES.CREATED, innovation, "Innovation created successfully");
});

const getInnovations = asyncHandler(async (req, res) => {
    const innovations = await Innovation.find();
    checkNotFound("Innovations", innovations);
    sendResponse(res, STATUS_CODES.SUCCESS, innovations, "Innovations fetched successfully");
});

const getInnovationById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const innovation = await Innovation.findById(id);
    checkNotFound("Innovation", innovation);
    sendResponse(res, STATUS_CODES.SUCCESS, innovation, "Innovation fetched successfully");
});

const updateInnovation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title_1, title_2, description, innovations } = req.body;

    const innovation = await Innovation.findByIdAndUpdate(id, {
        title_1,
        title_2,
        description,
        innovations
    }, { new: true });

    checkNotFound("Innovation", innovation);
    sendResponse(res, STATUS_CODES.SUCCESS, innovation, "Innovation updated successfully");
});

const deleteInnovation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const innovation = await Innovation.findByIdAndDelete(id);
    checkNotFound("Innovation", innovation);
    sendResponse(res, STATUS_CODES.SUCCESS, null, "Innovation deleted successfully");
});

export { createInnovation, getInnovations, getInnovationById, updateInnovation, deleteInnovation };
