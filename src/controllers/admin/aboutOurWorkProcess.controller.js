const asyncHandler = require("../../utils/asyncHandler.js");
const { AboutOurWorkProcess } = require("../../models/aboutOurWorkProcess.model.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const ApiError = require("../../utils/ApiError.js");

// POST: Create About Our Work Process
const createAboutOurWorkProcess = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    let icon;
    if (req.file?.path) {
        const result = await uploadOnServer(req.file.path);
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
const getAboutOurWorkProcesses = asyncHandler(async (req, res) => {
    const aboutOurWorkProcesses = await AboutOurWorkProcess.find();
    checkNotFound("About Our Work Process", aboutOurWorkProcesses);
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcesses, "About Our Work Processes fetched successfully");
});

// GET: Fetch single About Our Work Process by ID
const getAboutOurWorkProcessById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const aboutOurWorkProcess = await AboutOurWorkProcess.findById(id);
    checkNotFound("About Our Work Process", aboutOurWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcess, "About Our Work Process fetched successfully");
});

// PUT: Update About Our Work Process by ID
const updateAboutOurWorkProcess = asyncHandler(async (req, res) => {
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
    } else {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
            message: "Icon is required",
            path: ["icon"],
        }]);
    }
    checkNotFound("About Our Work Process", aboutOurWorkProcess);
    Object.assign(aboutOurWorkProcess, { icon, title, description });
    await aboutOurWorkProcess.save();
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcess, UPDATE_SUCCESS("About Our Work Process"));
});

// DELETE: Delete About Our Work Process by ID
const deleteAboutOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const aboutOurWorkProcess = await AboutOurWorkProcess.findByIdAndDelete(id);
    if (aboutOurWorkProcess.icon) {
        await deleteImageFromServer(aboutOurWorkProcess.icon);
    }
    checkNotFound("About Our Work Process", aboutOurWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, aboutOurWorkProcess, DELETE_SUCCESS("About Our Work Process"));
});

module.exports = {
    createAboutOurWorkProcess,
    getAboutOurWorkProcesses,
    getAboutOurWorkProcessById,
    updateAboutOurWorkProcess,
    deleteAboutOurWorkProcess
};
