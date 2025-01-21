import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { Testimonial } from "../../models/testimonial.model.js";
import uploadOnServer from "../../utils/cloudinary.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import sendResponse from "../../utils/responseHandler.js";

// POST: Create a new Testimonial
export const createTestimonial = asyncHandler(async (req, res) => {
  const { title, description, user, position } = req.body;
  let image;
  if (req.file?.path) {
    const result = await uploadOnServer(req.file.path);
    image = result?.url;
  }

  const testimonial = await Testimonial.create({
    title,
    description,
    user,
    position,
    image,
  });

  sendResponse(res, STATUS_CODES.CREATED, testimonial, CREATE_SUCCESS("Testimonial"));
});

// GET: Fetch all Testimonials
export const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find();

  checkNotFound("testimonials", testimonials);

  sendResponse(res, STATUS_CODES.SUCCESS, testimonials, "Testimonials fetched successfully");
});

// GET: Fetch Testimonial by ID
export const getTestimonialById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id);
  checkNotFound("testimonials", testimonial);

  sendResponse(res, STATUS_CODES.SUCCESS, testimonial, "Testimonial fetched successfully");
});

// PUT: Update Testimonial
export const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, user, position } = req.body;

  let image;
  if (req.file?.path) {
    const result = await uploadOnServer(req.file.path);
    image = result?.url;
  }

  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { title, description, user, position, ...(image && { image }) },
    { new: true }
  );

  checkNotFound("testimonials", testimonial);

  sendResponse(res, STATUS_CODES.SUCCESS, testimonial, UPDATE_SUCCESS("Testimonial"));
});

// DELETE: Delete Testimonial
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findByIdAndDelete(id);
  checkNotFound("testimonials", testimonial);

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Testimonial"));
});