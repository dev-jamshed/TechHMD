import asyncHandler from "../../utils/asyncHandler.js";
import { PageMetaTags } from "../../models/pageMetaTags.model.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";

// POST: Create Page Meta Tags
export const createPageMetaTags = asyncHandler(async (req, res) => {
    const { pageName, metaTitle, metaDescription, metaKeyword, pageContent, organizationSchema } = req.body;
    const existingPageMetaTags = await PageMetaTags.findOne({ pageName });
    if (existingPageMetaTags) {
        return sendResponse(res, STATUS_CODES.CONFLICT, null, "Page Meta Tags with this pageName already exists");
    }
    const pageMetaTags = await PageMetaTags.create({ pageName, metaTitle, metaDescription, metaKeyword, pageContent, organizationSchema });
    sendResponse(res, STATUS_CODES.CREATED, pageMetaTags, CREATE_SUCCESS("Page Meta Tags"));
});

// GET: Fetch all Page Meta Tags
export const getPageMetaTags = asyncHandler(async (req, res) => {
    const pageMetaTags = await PageMetaTags.find();
    checkNotFound("Page Meta Tags", pageMetaTags);
    sendResponse(res, STATUS_CODES.SUCCESS, pageMetaTags, "Page Meta Tags fetched successfully");
});

// GET: Fetch single Page Meta Tags by pageName
export const getPageMetaTagsByPageName = asyncHandler(async (req, res) => {
    const { pageName } = req.params;
    const pageMetaTags = await PageMetaTags.findOne({ pageName });
    checkNotFound("Page Meta Tags", pageMetaTags);
    sendResponse(res, STATUS_CODES.SUCCESS, pageMetaTags, "Page Meta Tags fetched successfully");
});

// PUT: Update Page Meta Tags by pageName
export const updatePageMetaTags = asyncHandler(async (req, res) => {
    const { pageName } = req.params;
    const updatedMetaTags = req.body;
    const pageMetaTags = await PageMetaTags.findOneAndUpdate({ pageName }, updatedMetaTags, { new: true });
    checkNotFound("Page Meta Tags", pageMetaTags);
    sendResponse(res, STATUS_CODES.SUCCESS, pageMetaTags, UPDATE_SUCCESS("Page Meta Tags"));
});

// DELETE: Delete Page Meta Tags by pageName
export const deletePageMetaTags = asyncHandler(async (req, res) => {
    const { pageName } = req.params;
    const pageMetaTags = await PageMetaTags.findOneAndDelete({ pageName });
    checkNotFound("Page Meta Tags", pageMetaTags);
    sendResponse(res, STATUS_CODES.SUCCESS, pageMetaTags, DELETE_SUCCESS("Page Meta Tags"));
});

