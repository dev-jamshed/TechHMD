import asyncHandler from "../../utils/asyncHandler.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import { CommentsModel } from "../../models/comments.model.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";

// Create a new Comment
export const createComment = asyncHandler(async (req, res) => {
    const blog = await CommentsModel.create({ ...req.body, blog: new Types.ObjectId(req.body.blogId) })
    sendResponse(res, STATUS_CODES.CREATED, blog, CREATE_SUCCESS("Comment"));
});

// Get a single Comment by ID
export const getComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await CommentsModel.findById(id);

    checkNotFound("comment", comment);

    sendResponse(res, STATUS_CODES.SUCCESS, comment, "Comment fetched successfully");
});

// Get all Comments
export const getComments = asyncHandler(async (req, res) => {
    const comments = await CommentsModel.find();
    checkNotFound("comments", comments);
    sendResponse(res, STATUS_CODES.SUCCESS, comments, "Comments fetched successfully");
});

// Get Comments for a specific Post
export const getPostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const comments = await CommentsModel.find({ post: postId });
    checkNotFound("comments", comments);
    sendResponse(res, STATUS_CODES.SUCCESS, comments, "Comments fetched successfully");
});

// Update a Comment
export const updateComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await CommentsModel.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    checkNotFound("comment", comment);

    sendResponse(res, STATUS_CODES.SUCCESS, comment, UPDATE_SUCCESS("Comment"));
});

// Delete a Comment
export const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await CommentsModel.findByIdAndDelete(id);
    checkNotFound("comment", comment);

    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Comment"));
});