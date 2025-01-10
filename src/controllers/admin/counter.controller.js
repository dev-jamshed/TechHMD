import asyncHandler from "../../utils/asyncHandler.js";
import { Counter } from "../../models/counter.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";

// POST: Create Counter
export const createCounter = asyncHandler(async (req, res) => {
    const { title, number } = req.body;
    const counter = await Counter.create({ title, number });
    sendResponse(res, STATUS_CODES.CREATED, counter, CREATE_SUCCESS("Counter"));
});

// GET: Fetch all Counters
export const getCounters = asyncHandler(async (req, res) => {
    const counters = await Counter.find();
    checkNotFound("Counters", counters);
    sendResponse(res, STATUS_CODES.SUCCESS, counters, "Counters fetched successfully");
});

// GET: Fetch single Counter by ID
export const getCounterById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const counter = await Counter.findById(id);
    checkNotFound("Counter", counter);
    sendResponse(res, STATUS_CODES.SUCCESS, counter, "Counter fetched successfully");
});

// PUT: Update Counter by ID
export const updateCounter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedCounter = req.body;
    const counter = await Counter.findByIdAndUpdate(id, updatedCounter, { new: true });
    checkNotFound("Counter", counter);
    sendResponse(res, STATUS_CODES.SUCCESS, counter, UPDATE_SUCCESS("Counter"));
});

// DELETE: Delete Counter by ID
export const deleteCounter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const counter = await Counter.findByIdAndDelete(id);
    checkNotFound("Counter", counter);
    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Counter"));
});
