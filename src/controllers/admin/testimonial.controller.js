const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const { Testimonial } = require("../../models/testimonial.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const sendResponse = require("../../utils/responseHandler.js");

// POST: Create a new Testimonial
const createTestimonial = asyncHandler(async (req, res) => {
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
const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find();

  checkNotFound("testimonials", testimonials);

  sendResponse(res, STATUS_CODES.SUCCESS, testimonials, "Testimonials fetched successfully");
});

// GET: Fetch Testimonial by ID
const getTestimonialById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id);
  checkNotFound("testimonials", testimonial);

  sendResponse(res, STATUS_CODES.SUCCESS, testimonial, "Testimonial fetched successfully");
});

// PUT: Update Testimonial
const updateTestimonial = asyncHandler(async (req, res) => {
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
const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findByIdAndDelete(id);
  checkNotFound("testimonials", testimonial);

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Testimonial"));
});

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
};