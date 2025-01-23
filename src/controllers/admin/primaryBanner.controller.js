const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { PrimaryBanner } = require("../../models/primaryBanner.model.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const sendResponse = require("../../utils/responseHandler.js");

const createPrimaryBanner = asyncHandler(async (req, res) => {
    const { title, description, pageName } = req.body;
    let primaryImage, secondaryImage;
    if (req.files?.primaryImage?.[0]?.path) {
        
        const result = await uploadOnServer(req.files.primaryImage[0].path);
        primaryImage = result?.url;
    } else {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
            message: "Primary image is required",
            path: ["primaryImage"],
        }]);
    }

    if (req.files?.secondaryImage?.[0]?.path) {
        const result = await uploadOnServer(req.files.secondaryImage[0].path);
        secondaryImage = result?.url;
    }

    const primaryBanner = await PrimaryBanner.create({
        title,
        description,
        primaryImage,
        secondaryImage,
        pageName
    });

    if (!primaryBanner) {
        throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong while creating the Primary Banner");
    }

    sendResponse(res, STATUS_CODES.CREATED, primaryBanner, "Primary Banner created successfully");
});

const getPrimaryBanners = asyncHandler(async (req, res) => {
    const primaryBanners = await PrimaryBanner.find();
    checkNotFound("Primary Banners", primaryBanners);
    sendResponse(res, STATUS_CODES.SUCCESS, primaryBanners, "Primary Banners fetched successfully");
});

const getPrimaryBannerById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const primaryBanner = await PrimaryBanner.findById(id);
    checkNotFound("Primary Banner", primaryBanner);
    sendResponse(res, STATUS_CODES.SUCCESS, primaryBanner, "Primary Banner fetched successfully");
});

const updatePrimaryBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, pageName } = req.body;

    let primaryImage, secondaryImage;
    if (req.files?.primaryImage?.[0]?.path) {
        const result = await uploadOnServer(req.files.primaryImage[0].path);
        primaryImage = result?.url;
    }

    if (req.files?.secondaryImage?.[0]?.path) {
        const result = await uploadOnServer(req.files.secondaryImage[0].path);
        secondaryImage = result?.url;
    }

    const primaryBanner = await PrimaryBanner.findByIdAndUpdate(id, {
        title,
        description,
        primaryImage,
        ...(secondaryImage && { secondaryImage }),
        pageName
    }, { new: true });

    checkNotFound("Primary Banner", primaryBanner);
    sendResponse(res, STATUS_CODES.SUCCESS, primaryBanner, "Primary Banner updated successfully");
});

const deletePrimaryBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const primaryBanner = await PrimaryBanner.findByIdAndDelete(id);
    checkNotFound("Primary Banner", primaryBanner);
    sendResponse(res, STATUS_CODES.SUCCESS, null, "Primary Banner deleted successfully");
});

module.exports = {
    createPrimaryBanner,
    getPrimaryBanners,
    getPrimaryBannerById,
    updatePrimaryBanner,
    deletePrimaryBanner
};
