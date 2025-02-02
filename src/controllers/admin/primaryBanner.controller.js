import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { PrimaryBanner } from "../../models/primaryBanner.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import uploadOnServer from "../../utils/cloudinary.js";
import sendResponse from "../../utils/responseHandler.js";
import { pipeline } from '../../utils/global.js'
import { CREATE_SUCCESS, UPDATE_SUCCESS } from "../../utils/constants/message.js";

const createPrimaryBanner = asyncHandler(async (req, res) => {
    const { title, description, pageName, serviceId } = req.body;

    if (!pageName && !serviceId) {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
            message: "Either pageName or serviceId is required",
            path: ["pageName", "serviceId"],
        }]);
    }

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
        pageName,
        serviceId
    });

    if (!primaryBanner) {
        throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, CREATE_SUCCESS("Primary Banner"));
    }

    if (primaryBanner.serviceId) {
        const { serviceId, ...otherData } = (await primaryBanner.populate("serviceId", "_id name")).toObject()
        const updatedBanner = { service: serviceId, ...otherData }
        return sendResponse(res, STATUS_CODES.CREATED, updatedBanner, CREATE_SUCCESS("Primary Banner"));
    }


    sendResponse(res, STATUS_CODES.CREATED, primaryBanner, CREATE_SUCCESS("Primary Banner"));
});

const getPrimaryBanners = asyncHandler(async (req, res) => {
    const primaryBanners = await PrimaryBanner.aggregate(pipeline);
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
    const { title, description, pageName, serviceId } = req.body;

    if (!pageName && !serviceId) {
        throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
            message: "Either pageName or serviceId is required",
            path: ["pageName", "serviceId"],
        }]);
    }

    let primaryImage, secondaryImage;
    if (req.files?.primaryImage?.[0]?.path) {
        const result = await uploadOnServer(req.files.primaryImage[0].path);
        primaryImage = result?.url;
    }

    if (req.files?.secondaryImage?.[0]?.path) {
        const result = await uploadOnServer(req.files.secondaryImage[0].path);
        secondaryImage = result?.url;
    }

    const updateData = {
        title,
        description,
        primaryImage,
        ...(secondaryImage && { secondaryImage }),
        ...(serviceId ? { serviceId } : { $unset: { serviceId: 1 } }),
        ...(pageName ? { pageName } : { $unset: { pageName: 1 } })
    };

    const updatedPrimaryBanner = await PrimaryBanner.findByIdAndUpdate(id, updateData, { new: true });

    checkNotFound("Primary Banner", updatedPrimaryBanner);

    if (updatedPrimaryBanner.serviceId) {
        const { serviceId, ...otherData } = (await updatedPrimaryBanner.populate("serviceId", "_id name")).toObject()
        const _updatedPrimaryBanner = { service: serviceId, ...otherData }
        return sendResponse(res, STATUS_CODES.CREATED, _updatedPrimaryBanner, UPDATE_SUCCESS("Primary Banner"));
    }
    sendResponse(res, STATUS_CODES.SUCCESS, updatedPrimaryBanner, UPDATE_SUCCESS("Primary Banner"));
});

const deletePrimaryBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const primaryBanner = await PrimaryBanner.findByIdAndDelete(id);
    checkNotFound("Primary Banner", primaryBanner);
    sendResponse(res, STATUS_CODES.SUCCESS, null, "Primary Banner deleted successfully");
});

export { createPrimaryBanner, getPrimaryBanners, getPrimaryBannerById, updatePrimaryBanner, deletePrimaryBanner };
