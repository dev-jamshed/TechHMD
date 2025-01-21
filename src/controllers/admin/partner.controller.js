import asyncHandler from "../../utils/asyncHandler.js";
import { Partner } from "../../models/partner.model.js";
import uploadOnServer, { deleteImageFromServer } from "../../utils/cloudinary.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import ApiError from "../../utils/ApiError.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";

// POST: Create Partner
export const createPartner = asyncHandler(async (req, res) => {
    const { name, description, website_url, is_featured } = req.body;
    let logo;
    const logoLocalPath = req.file?.path;

    if (!logoLocalPath) {
        throw new ApiError(400, "Validation Error", [
          {
            message: "Logo is required",
            path: ["logo"],
          },
        ]);
    }

    const uploadResponse = await uploadOnServer(logoLocalPath);
    logo = uploadResponse?.secure_url;

    const partner = await Partner.create({ name, logo, description, website_url, is_featured });
    sendResponse(res, STATUS_CODES.CREATED, partner, CREATE_SUCCESS("Partner"));
});

// GET: Fetch all Partners
export const getPartners = asyncHandler(async (req, res) => {
    const partners = await Partner.find();
    checkNotFound("Partners", partners);
    sendResponse(res, STATUS_CODES.SUCCESS, partners, "Partners fetched successfully");
});

// GET: Fetch single Partner by ID
export const getPartnerById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const partner = await Partner.findById(id);
    checkNotFound("Partner", partner);
    sendResponse(res, STATUS_CODES.SUCCESS, partner, "Partner fetched successfully");
});

// PUT: Update Partner by ID
export const updatePartner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, website_url, is_featured } = req.body;

    // Check if the partner exists
    const existingPartner = await Partner.findById(id);
    checkNotFound("Partner", existingPartner);

    let logo;
    const logoLocalPath = req.file?.path;

    if (logoLocalPath) {
        // Delete old logo
        if (existingPartner.logo) {
            await deleteImageFromServer(existingPartner.logo);
        }
        const uploadResponse = await uploadOnServer(logoLocalPath);
        logo = uploadResponse?.secure_url;
    }

    const updatedPartner = { name, description, website_url, is_featured, ...(logo && { logo }) };
    const partner = await Partner.findByIdAndUpdate(id, updatedPartner, { new: true });
    checkNotFound("Partner", partner);
    sendResponse(res, STATUS_CODES.SUCCESS, partner, UPDATE_SUCCESS("Partner"));
});

// DELETE: Delete Partner by ID
export const deletePartner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const partner = await Partner.findByIdAndDelete(id);
    checkNotFound("Partner", partner);
    if (partner.logo) {
        await deleteImageFromServer(partner.logo);
    }
    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Partner"));
});
