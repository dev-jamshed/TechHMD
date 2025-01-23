const asyncHandler = require("../../utils/asyncHandler.js");
const { Counter } = require("../../models/counter.model.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

// POST: Create Counter
const createCounter = asyncHandler(async (req, res) => {
    const { title, number } = req.body;
    const counter = await Counter.create({ title, number });
    sendResponse(res, STATUS_CODES.CREATED, counter, CREATE_SUCCESS("Counter"));
});

// GET: Fetch all Counters
const getCounters = asyncHandler(async (req, res) => {
    const counters = await Counter.find();
    checkNotFound("Counters", counters);
    sendResponse(res, STATUS_CODES.SUCCESS, counters, "Counters fetched successfully");
});

// GET: Fetch single Counter by ID
const getCounterById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const counter = await Counter.findById(id);
    checkNotFound("Counter", counter);
    sendResponse(res, STATUS_CODES.SUCCESS, counter, "Counter fetched successfully");
});

// PUT: Update Counter by ID
const updateCounter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedCounter = req.body;
    const counter = await Counter.findByIdAndUpdate(id, updatedCounter, { new: true });
    checkNotFound("Counter", counter);
    sendResponse(res, STATUS_CODES.SUCCESS, counter, UPDATE_SUCCESS("Counter"));
});

// DELETE: Delete Counter by ID
const deleteCounter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const counter = await Counter.findByIdAndDelete(id);
    checkNotFound("Counter", counter);
    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Counter"));
});

module.exports = {
    createCounter,
    getCounters,
    getCounterById,
    updateCounter,
    deleteCounter
};
