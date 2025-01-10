import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { FAQModel } from "../../models/faq.model.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS,DELETE_SUCCESS } from "../../utils/constants/message.js";

// Create a new FAQ
export const createFAQController = asyncHandler(async (req, res) => {
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
export const getAllFAQsController = asyncHandler(async (req, res) => {
  const faqs = await FAQModel.find();
  
  checkNotFound("faqs", faqs);

  sendResponse(res, STATUS_CODES.SUCCESS, faqs, "FAQs fetched successfully");
});

// Get a single FAQ by ID
export const getFAQByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const faq = await FAQModel.findById(id);

  checkNotFound("faq", faq);

  sendResponse(res, STATUS_CODES.SUCCESS, faq, "FAQ fetched successfully");
});

// Update an FAQ
export const updateFAQController = asyncHandler(async (req, res) => {
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
export const deleteFAQController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedFAQ = await FAQModel.findByIdAndDelete(id);

  checkNotFound("faq", deletedFAQ);

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("FAQ"));
});