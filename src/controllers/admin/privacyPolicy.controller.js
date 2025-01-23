const asyncHandler = require("../../utils/asyncHandler.js");
const { PrivacyPolicy } = require("../../models/privacyPolicy.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

// POST: Create Privacy Policy
const createPrivacyPolicy = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    let image;
    const imageLocalPath = req.file?.path;

    if (imageLocalPath) {
        const uploadResponse = await uploadOnServer(imageLocalPath);
        image = uploadResponse?.secure_url;
    }

    const privacyPolicy = await PrivacyPolicy.create({ title, content, image });
    sendResponse(res, STATUS_CODES.CREATED, privacyPolicy, CREATE_SUCCESS("Privacy Policy"));
});

// GET: Fetch all Privacy Policies
const getPrivacyPolicies = asyncHandler(async (req, res) => {
    const privacyPolicies = await PrivacyPolicy.find();
    checkNotFound("Privacy Policies", privacyPolicies);
    sendResponse(res, STATUS_CODES.SUCCESS, privacyPolicies, "Privacy Policies fetched successfully");
});

// GET: Fetch single Privacy Policy by ID
const getPrivacyPolicyById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const privacyPolicy = await PrivacyPolicy.findById(id);
    checkNotFound("Privacy Policy", privacyPolicy);
    sendResponse(res, STATUS_CODES.SUCCESS, privacyPolicy, "Privacy Policy fetched successfully");
});

const getDefaultPrivacyPolicy = asyncHandler(async (req, res) => {
    const privacyPolicy = await PrivacyPolicy.find().sort({ createdAt: -1 }).limit(1);
    checkNotFound("Privacy Policy", privacyPolicy);
    sendResponse(res, STATUS_CODES.SUCCESS, privacyPolicy[0], "Default Privacy Policy fetched successfully");
});

// PUT: Update Privacy Policy by ID
const updatePrivacyPolicy = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // Check if the privacy policy exists
    const existingPrivacyPolicy = await PrivacyPolicy.findById(id);
    checkNotFound("Privacy Policy", existingPrivacyPolicy);

    let image;
    const imageLocalPath = req.file?.path;

    if (imageLocalPath) {
        // Delete old image
        if (existingPrivacyPolicy.image) {
            await deleteImageFromServer(existingPrivacyPolicy.image);
        }
        const uploadResponse = await uploadOnServer(imageLocalPath);
        image = uploadResponse?.secure_url;
    }

    const updatedPrivacyPolicy = { title, content, ...(image && { image }) };
    const privacyPolicy = await PrivacyPolicy.findByIdAndUpdate(id, updatedPrivacyPolicy, { new: true });
    checkNotFound("Privacy Policy", privacyPolicy);
    sendResponse(res, STATUS_CODES.SUCCESS, privacyPolicy, UPDATE_SUCCESS("Privacy Policy"));
});

// DELETE: Delete Privacy Policy by ID
const deletePrivacyPolicy = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const privacyPolicy = await PrivacyPolicy.findByIdAndDelete(id);
    checkNotFound("Privacy Policy", privacyPolicy);
    if (privacyPolicy.image) {
        await deleteImageFromServer(privacyPolicy.image);
    }
    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Privacy Policy"));
});

module.exports = {
    createPrivacyPolicy,
    getPrivacyPolicies,
    getPrivacyPolicyById,
    getDefaultPrivacyPolicy,
    updatePrivacyPolicy,
    deletePrivacyPolicy
};
