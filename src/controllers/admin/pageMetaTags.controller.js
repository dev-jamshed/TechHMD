const asyncHandler = require("../../utils/asyncHandler.js");
const { PageMetaTags } = require("../../models/pageMetaTags.model.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

// POST: Create Page Meta Tags
const createPageMetaTags = asyncHandler(async (req, res) => {
    const { pageName, metaTitle, metaDescription, metaKeyword, pageContent, organizationSchema } = req.body;
    const existingPageMetaTags = await PageMetaTags.findOne({ pageName });
    if (existingPageMetaTags) {
        return sendResponse(res, STATUS_CODES.CONFLICT, null, "Page Meta Tags with this pageName already exists");
    }
    const pageMetaTags = await PageMetaTags.create({ pageName, metaTitle, metaDescription, metaKeyword, pageContent, organizationSchema });
    sendResponse(res, STATUS_CODES.CREATED, pageMetaTags, CREATE_SUCCESS("Page Meta Tags"));
});

// GET: Fetch all Page Meta Tags
const getPageMetaTags = asyncHandler(async (req, res) => {
    const pageMetaTags = await PageMetaTags.find();
    checkNotFound("Page Meta Tags", pageMetaTags);
    sendResponse(res, STATUS_CODES.SUCCESS, pageMetaTags, "Page Meta Tags fetched successfully");
});

// GET: Fetch single Page Meta Tags by pageName
const getPageMetaTagsByPageName = asyncHandler(async (req, res) => {
    const { pageName } = req.params;
    const pageMetaTags = await PageMetaTags.findOne({ pageName });
    checkNotFound("Page Meta Tags", pageMetaTags);
    sendResponse(res, STATUS_CODES.SUCCESS, pageMetaTags, "Page Meta Tags fetched successfully");
});

// PUT: Update Page Meta Tags by pageName
const updatePageMetaTags = asyncHandler(async (req, res) => {
    const { pageName } = req.params;
    const updatedMetaTags = req.body;
    const pageMetaTags = await PageMetaTags.findOneAndUpdate({ pageName }, updatedMetaTags, { new: true });
    checkNotFound("Page Meta Tags", pageMetaTags);
    sendResponse(res, STATUS_CODES.SUCCESS, pageMetaTags, UPDATE_SUCCESS("Page Meta Tags"));
});

// DELETE: Delete Page Meta Tags by pageName
const deletePageMetaTags = asyncHandler(async (req, res) => {
    const { pageName } = req.params;
    const pageMetaTags = await PageMetaTags.findOneAndDelete({ pageName });
    checkNotFound("Page Meta Tags", pageMetaTags);
    sendResponse(res, STATUS_CODES.SUCCESS, pageMetaTags, DELETE_SUCCESS("Page Meta Tags"));
});

module.exports = {
    createPageMetaTags,
    getPageMetaTags,
    getPageMetaTagsByPageName,
    updatePageMetaTags,
    deletePageMetaTags
};

