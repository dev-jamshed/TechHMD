import asyncHandler from "../../utils/asyncHandler.js";
import { PrivacyPolicy } from "../../models/privacyPolicy.model.js";
import uploadOnCloudinary, { deleteImageFromCloudinary } from "../../utils/cloudinary.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";

// POST: Create Privacy Policy
export const createPrivacyPolicy = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    let image;
    const imageLocalPath = req.file?.path;

    if (imageLocalPath) {
        const uploadResponse = await uploadOnCloudinary(imageLocalPath);
        image = uploadResponse?.secure_url;
    }

    const privacyPolicy = await PrivacyPolicy.create({ title, content, image });
    sendResponse(res, STATUS_CODES.CREATED, privacyPolicy, CREATE_SUCCESS("Privacy Policy"));
});

// GET: Fetch all Privacy Policies
export const getPrivacyPolicies = asyncHandler(async (req, res) => {
    const privacyPolicies = await PrivacyPolicy.find();
    checkNotFound("Privacy Policies", privacyPolicies);
    sendResponse(res, STATUS_CODES.SUCCESS, privacyPolicies, "Privacy Policies fetched successfully");
});

// GET: Fetch single Privacy Policy by ID
export const getPrivacyPolicyById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const privacyPolicy = await PrivacyPolicy.findById(id);
    checkNotFound("Privacy Policy", privacyPolicy);
    sendResponse(res, STATUS_CODES.SUCCESS, privacyPolicy, "Privacy Policy fetched successfully");
});

export const getDefaultPrivacyPolicy = asyncHandler(async (req, res) => {
        const privacyPolicy = await PrivacyPolicy.find().sort({ createdAt: -1 }).limit(1);
        checkNotFound("Privacy Policy", privacyPolicy);
        sendResponse(res, STATUS_CODES.SUCCESS, privacyPolicy[0], "Default Privacy Policy fetched successfully");
});

// PUT: Update Privacy Policy by ID
export const updatePrivacyPolicy = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    let image;
    const imageLocalPath = req.file?.path;

    if (imageLocalPath) {
        const existingPolicy = await PrivacyPolicy.findById(id);
        if (existingPolicy && existingPolicy.image) {
            await deleteImageFromCloudinary(existingPolicy.image);
        }
        const uploadResponse = await uploadOnCloudinary(imageLocalPath);
        image = uploadResponse?.secure_url;
    }

    const updatedPrivacyPolicy = { title, content, image };
    const privacyPolicy = await PrivacyPolicy.findByIdAndUpdate(id, updatedPrivacyPolicy, { new: true });
    checkNotFound("Privacy Policy", privacyPolicy);
    sendResponse(res, STATUS_CODES.SUCCESS, privacyPolicy, UPDATE_SUCCESS("Privacy Policy"));
});

// DELETE: Delete Privacy Policy by ID
export const deletePrivacyPolicy = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const privacyPolicy = await PrivacyPolicy.findByIdAndDelete(id);
    checkNotFound("Privacy Policy", privacyPolicy);
    if (privacyPolicy.image) {
        await deleteImageFromCloudinary(privacyPolicy.image);
    }
    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Privacy Policy"));
});
