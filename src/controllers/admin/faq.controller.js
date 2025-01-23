const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { FAQModel } = require("../../models/faq.model.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

// Create a new FAQ
const createFAQController = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  const faq = await FAQModel.create({
    question,
    answer,
  });

  if (!faq) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to create FAQ");
  }

  sendResponse(res, STATUS_CODES.CREATED, faq, CREATE_SUCCESS("FAQ"));
});

// Get all FAQs
const getAllFAQsController = asyncHandler(async (req, res) => {
  const faqs = await FAQModel.find();
  
  checkNotFound("faqs", faqs);

  sendResponse(res, STATUS_CODES.SUCCESS, faqs, "FAQs fetched successfully");
});

// Get a single FAQ by ID
const getFAQByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const faq = await FAQModel.findById(id);

  checkNotFound("faq", faq);

  sendResponse(res, STATUS_CODES.SUCCESS, faq, "FAQ fetched successfully");
});

// Update an FAQ
const updateFAQController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const updatedFAQ = await FAQModel.findByIdAndUpdate(
    id,
    { question, answer },
    { new: true, runValidators: true } // `new: true` to return the updated document
  );

  checkNotFound("faq", updatedFAQ);

  sendResponse(res, STATUS_CODES.SUCCESS, updatedFAQ, UPDATE_SUCCESS("FAQ"));
});

// Delete an FAQ
const deleteFAQController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedFAQ = await FAQModel.findByIdAndDelete(id);

  checkNotFound("faq", deletedFAQ);

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("FAQ"));
});

module.exports = {
  createFAQController,
  getAllFAQsController,
  getFAQByIdController,
  updateFAQController,
  deleteFAQController
};