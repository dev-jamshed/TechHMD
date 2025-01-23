const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { InquiryModel } = require("../../models/inquiry.model.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const { CREATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const { Types } = require("mongoose");

const createInquiryController = asyncHandler(async (req, res) => {
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

const getAllInquiriesController = asyncHandler(async (req, res) => {
  const inquiries = await InquiryModel.find().populate("ServiceId");

  checkNotFound("inquiries", inquiries);

  sendResponse(res, STATUS_CODES.SUCCESS, inquiries, "Inquiries fetched successfully");
});

const getInquiryByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const inquiry = await InquiryModel.findById(id).populate("ServiceId");

  checkNotFound("inquiry", inquiry);

  sendResponse(res, STATUS_CODES.SUCCESS, inquiry, "Inquiry fetched successfully");
});

const deleteInquiryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedInquiry = await InquiryModel.findByIdAndDelete(id);

  checkNotFound("inquiry", deletedInquiry);

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Inquiry"));
});

module.exports = {
  createInquiryController,
  getAllInquiriesController,
  getInquiryByIdController,
  deleteInquiryController
};