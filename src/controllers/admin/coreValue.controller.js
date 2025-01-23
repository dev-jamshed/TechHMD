const asyncHandler = require("../../utils/asyncHandler.js");
const { CoreValue } = require("../../models/coreValue.model.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const ApiError = require("../../utils/ApiError.js");

const createCoreValue = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    let image;
    if (req.file?.path) {
        const result = await uploadOnServer(req.file.path);
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

const getCoreValues = asyncHandler(async (req, res) => {
    const coreValues = await CoreValue.find();
    checkNotFound("Core Value", coreValues);
    sendResponse(res, STATUS_CODES.SUCCESS, coreValues, "Core Values fetched successfully");
});

const getCoreValueById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const coreValue = await CoreValue.findById(id);
    checkNotFound("Core Value", coreValue);
    sendResponse(res, STATUS_CODES.SUCCESS, coreValue, "Core Value fetched successfully");
});

const updateCoreValue = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    // Check if the core value exists
    const existingCoreValue = await CoreValue.findById(id);
    checkNotFound("Core Value", existingCoreValue);

    let image;
    if (req.file?.path) {
        // Delete old image
        if (existingCoreValue.image) {
            await deleteImageFromServer(existingCoreValue.image);
        }
        const result = await uploadOnServer(req.file.path);
        image = result?.url;
    }

    Object.assign(existingCoreValue, { ...(image && { image }), title, description });
    await existingCoreValue.save();
    sendResponse(res, STATUS_CODES.SUCCESS, existingCoreValue, UPDATE_SUCCESS("Core Value"));
});

const deleteCoreValue = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const coreValue = await CoreValue.findByIdAndDelete(id);
    checkNotFound("Core Value", coreValue);

    // Delete associated image
    if (coreValue.image) {
        await deleteImageFromServer(coreValue.image);
    }

    sendResponse(res, STATUS_CODES.SUCCESS, coreValue, DELETE_SUCCESS("Core Value"));
});

module.exports = {
    createCoreValue,
    getCoreValues,
    getCoreValueById,
    updateCoreValue,
    deleteCoreValue
};
