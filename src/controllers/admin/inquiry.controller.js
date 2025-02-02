import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { InquiryModel } from "../../models/inquiry.model.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import { CREATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import { Types } from "mongoose";

export const createInquiryController = asyncHandler(async (req, res) => {
  const { name, email, subject, message, serviceId, packageId } = req.body;

  const inquiry = await InquiryModel.create({
    name,
    email,
    subject,
    message,
    packageId,
    serviceId: serviceId ? new Types.ObjectId(serviceId) : null,
  });

  if (!inquiry) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to create inquiry");
  }

  sendResponse(res, STATUS_CODES.CREATED, inquiry, CREATE_SUCCESS("Inquiry"));
});

export const getAllInquiriesController = asyncHandler(async (req, res) => {
  const inquiries = await InquiryModel.find().populate("ServiceId");

  checkNotFound("inquiries", inquiries);

  sendResponse(res, STATUS_CODES.SUCCESS, inquiries, "Inquiries fetched successfully");
});

export const getInquiryByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const inquiry = await InquiryModel.findById(id).populate("ServiceId", "_id name");

  checkNotFound("inquiry", inquiry);

  sendResponse(res, STATUS_CODES.SUCCESS, inquiry, "Inquiry fetched successfully");
});

export const deleteInquiryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedInquiry = await InquiryModel.findByIdAndDelete(id);

  checkNotFound("inquiry", deletedInquiry);

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Inquiry"));
});