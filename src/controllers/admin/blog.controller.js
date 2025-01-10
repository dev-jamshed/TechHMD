import asyncHandler from "../../utils/asyncHandler.js";
import { BlogsModel } from "../../models/blog.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS,DELETE_SUCCESS } from "../../utils/constants/message.js";

// Create a new Blog
export const createBlog = asyncHandler(async (req, res) => {
  let cover;
  const coverLocalPath = req.file?.path;

  // Upload cover if file exists
  if (coverLocalPath) {
    cover = await uploadOnCloudinary(coverLocalPath);
  }

  const blogData = {
    ...req.body,
    cover: cover?.url,
  };
  const blog = await BlogsModel.create(blogData);

  sendResponse(res, STATUS_CODES.CREATED, blog, CREATE_SUCCESS("Blog"));
});

// Get a Blog by ID
export const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await BlogsModel.findById(id);

  checkNotFound("Blog", blog);

  sendResponse(res, STATUS_CODES.SUCCESS, blog, "Blog fetched successfully");
});

// Get all Blogs
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await BlogsModel.find();

  checkNotFound("Blogs", blogs);
  sendResponse(res, STATUS_CODES.SUCCESS, blogs, "Blogs fetched successfully");
});

// Update a Blog
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the blog exists
  const existingBlog = await BlogsModel.findById(id);

  checkNotFound("Blog", existingBlog);

  let cover;
  const coverLocalPath = req.file?.path;

  // Upload new cover if a file is provided
  if (coverLocalPath) {
    cover = await uploadOnCloudinary(coverLocalPath);
  }

  // Prepare updated data
  const updatedData = {
    ...req.body,
    ...(cover && { cover: cover.url }), // Add the cover URL if uploaded
  };

  // Update the blog
  const updatedBlog = await BlogsModel.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  // Send response
  sendResponse(res, STATUS_CODES.SUCCESS, updatedBlog, UPDATE_SUCCESS("Blog"));
});

// Delete a Blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await BlogsModel.findByIdAndDelete(id);

  checkNotFound("Blog", blog);

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Blog"));
});