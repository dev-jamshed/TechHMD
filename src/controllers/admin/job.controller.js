const asyncHandler = require("../../utils/asyncHandler.js");
const { Job } = require("../../models/job.model.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

// POST: Create Job
const createJob = asyncHandler(async (req, res) => {
    const { title, description, requirements, location, is_active } = req.body;

    const job = await Job.create({ title, description, requirements, location, is_active });
    sendResponse(res, STATUS_CODES.CREATED, job, CREATE_SUCCESS("Job"));
});

// GET: Fetch all Jobs
const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find();
    checkNotFound("Jobs", jobs);
    sendResponse(res, STATUS_CODES.SUCCESS, jobs, "Jobs fetched successfully");
});

// GET: Fetch single Job by ID
const getJobById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    checkNotFound("Job", job);
    sendResponse(res, STATUS_CODES.SUCCESS, job, "Job fetched successfully");
});

// PUT: Update Job by ID
const updateJob = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, requirements, location, is_active } = req.body;

    const updatedJob = { title, description, requirements, location, is_active };
    const job = await Job.findByIdAndUpdate(id, updatedJob, { new: true });
    checkNotFound("Job", job);
    sendResponse(res, STATUS_CODES.SUCCESS, job, UPDATE_SUCCESS("Job"));
});

// DELETE: Delete Job by ID
const deleteJob = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    checkNotFound("Job", job);
    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Job"));
});

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
};
