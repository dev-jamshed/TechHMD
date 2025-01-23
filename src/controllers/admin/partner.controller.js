const asyncHandler = require("../../utils/asyncHandler.js");
const { Partner } = require("../../models/partner.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

// POST: Create Partner
const createPartner = asyncHandler(async (req, res) => {
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
const getPartners = asyncHandler(async (req, res) => {
    const partners = await Partner.find();
    checkNotFound("Partners", partners);
    sendResponse(res, STATUS_CODES.SUCCESS, partners, "Partners fetched successfully");
});

// GET: Fetch single Partner by ID
const getPartnerById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const partner = await Partner.findById(id);
    checkNotFound("Partner", partner);
    sendResponse(res, STATUS_CODES.SUCCESS, partner, "Partner fetched successfully");
});

// PUT: Update Partner by ID
const updatePartner = asyncHandler(async (req, res) => {
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
const deletePartner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const partner = await Partner.findByIdAndDelete(id);
    checkNotFound("Partner", partner);
    if (partner.logo) {
        await deleteImageFromServer(partner.logo);
    }
    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Partner"));
});

module.exports = {
    createPartner,
    getPartners,
    getPartnerById,
    updatePartner,
    deletePartner
};
