const asyncHandler = require("../../utils/asyncHandler.js");
const { OurWorkProcess } = require("../../models/ourWorkProcess.model.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const ApiError = require("../../utils/ApiError.js");
const { Types } = require("mongoose");

// POST: Create Our Work Process
const createOurWorkProcess = asyncHandler(async (req, res) => {
    const { serviceId, title, description } = req.body;

    let icon;
    if (req.file?.path) {
        const result = await uploadOnServer(req.file.path);
        icon = result?.url;
    }

    const ourWorkProcess = await OurWorkProcess.create({ serviceId, icon, title, description });
    sendResponse(res, STATUS_CODES.CREATED, ourWorkProcess, CREATE_SUCCESS("Our Work Process"));
});

// GET: Fetch all Our Work Processes
const getOurWorkProcesses = asyncHandler(async (req, res) => {
    const ourWorkProcesses = await OurWorkProcess.find()
    checkNotFound("Our Work Process", ourWorkProcesses);
    sendResponse(res, STATUS_CODES.SUCCESS, ourWorkProcesses, "Our Work Processes fetched successfully");
});

// GET: Fetch single Our Work Process by serviceId
const getOurWorkProcessByServiceId = asyncHandler(async (req, res) => {
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
const updateOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { serviceId, title, description } = req.body;

    // Check if the work process exists
    const existingWorkProcess = await OurWorkProcess.findById(id);
    checkNotFound("Our Work Process", existingWorkProcess);

    let icon;
    if (req.file?.path) {
        // Delete old image
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
    sendResponse(res, STATUS_CODES.SUCCESS, existingWorkProcess, UPDATE_SUCCESS("Our Work Process"));
});

// DELETE: Delete Our Work Process by ID
const deleteOurWorkProcess = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const ourWorkProcess = await OurWorkProcess.findByIdAndDelete(id);
    checkNotFound("Our Work Process", ourWorkProcess);
    sendResponse(res, STATUS_CODES.SUCCESS, ourWorkProcess, DELETE_SUCCESS("Our Work Process"));
});

module.exports = {
    createOurWorkProcess,
    getOurWorkProcesses,
    getOurWorkProcessByServiceId,
    updateOurWorkProcess,
    deleteOurWorkProcess
};
