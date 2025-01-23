const asyncHandler = require("../../utils/asyncHandler.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const { CommentsModel } = require("../../models/comments.model.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

// Create a new Comment
const createComment = asyncHandler(async (req, res) => {
    const blog = await CommentsModel.create({ ...req.body, blog: new Types.ObjectId(req.body.blogId) })
    sendResponse(res, STATUS_CODES.CREATED, blog, CREATE_SUCCESS("Comment"));
});

// Get a single Comment by ID
const getComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await CommentsModel.findById(id);

    checkNotFound("comment", comment);

    sendResponse(res, STATUS_CODES.SUCCESS, comment, "Comment fetched successfully");
});

// Get all Comments
const getComments = asyncHandler(async (req, res) => {
    const comments = await CommentsModel.find();
    checkNotFound("comments", comments);
    sendResponse(res, STATUS_CODES.SUCCESS, comments, "Comments fetched successfully");
});

// Get Comments for a specific Post
const getPostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const comments = await CommentsModel.find({ post: postId });
    checkNotFound("comments", comments);
    sendResponse(res, STATUS_CODES.SUCCESS, comments, "Comments fetched successfully");
});

// Update a Comment
const updateComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await CommentsModel.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    checkNotFound("comment", comment);

    sendResponse(res, STATUS_CODES.SUCCESS, comment, UPDATE_SUCCESS("Comment"));
});

// Delete a Comment
const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await CommentsModel.findByIdAndDelete(id);
    checkNotFound("comment", comment);

    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Comment"));
});

module.exports = {
    createComment,
    getComment,
    getComments,
    getPostComments,
    updateComment,
    deleteComment
};