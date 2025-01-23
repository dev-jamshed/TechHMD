const asyncHandler = require("../../utils/asyncHandler.js");
const { BlogsModel } = require("../../models/blog.model.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

// Create a new Blog
const createBlog = asyncHandler(async (req, res) => {
  let cover;
  const coverLocalPath = req.file?.path;

  // Upload cover if file exists
  if (coverLocalPath) {
    cover = await uploadOnServer(coverLocalPath);
  }

  const blogData = {
    ...req.body,
    cover: cover?.url,
  };
  const blog = await BlogsModel.create(blogData);

  sendResponse(res, STATUS_CODES.CREATED, blog, CREATE_SUCCESS("Blog"));
});

// Get a Blog by ID
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await BlogsModel.findById(id);

  checkNotFound("Blog", blog);

  sendResponse(res, STATUS_CODES.SUCCESS, blog, "Blog fetched successfully");
});

// Get all Blogs
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await BlogsModel.find();

  checkNotFound("Blogs", blogs);
  sendResponse(res, STATUS_CODES.SUCCESS, blogs, "Blogs fetched successfully");
});

// Update a Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the blog exists
  const existingBlog = await BlogsModel.findById(id);
  checkNotFound("Blog", existingBlog);

  let cover;
  const coverLocalPath = req.file?.path;

  // Upload new cover if a file is provided
  if (coverLocalPath) {
    // Delete old cover image
    if (existingBlog.cover) {
      await deleteImageFromServer(existingBlog.cover);
    }
    cover = await uploadOnServer(coverLocalPath);
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
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await BlogsModel.findByIdAndDelete(id);
  checkNotFound("Blog", blog);

  // Delete associated cover image
  if (blog.cover) {
    await deleteImageFromServer(blog.cover);
  }

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Blog"));
});

module.exports = {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};