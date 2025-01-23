const asyncHandler = require("../../utils/asyncHandler.js");
const { HeroSection } = require("../../models/heroSection.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

const saveHeroSection = async (req, res, existingHeroSection = null) => {
  const { title, description } = req.body;

  let media;
  if (req.file?.path) {
    // Delete old media if updating
    if (existingHeroSection && existingHeroSection.media) {
      await deleteImageFromServer(existingHeroSection.media);
    }
    const result = await uploadOnServer(req.file.path);
    media = result?.url;
  }

  const heroSectionData = {
    title,
    description,
    ...(media && { media })
  };

  if (existingHeroSection) {
    Object.assign(existingHeroSection, heroSectionData);
    await existingHeroSection.save();
    return sendResponse(res, STATUS_CODES.SUCCESS, existingHeroSection, UPDATE_SUCCESS("Hero Section"));
  } else {
    const heroSection = await HeroSection.create(heroSectionData);
    return sendResponse(res, STATUS_CODES.CREATED, heroSection, CREATE_SUCCESS("Hero Section"));
  }
};

// POST: Create Hero Section
const createHeroSection = asyncHandler(async (req, res) => {
  return saveHeroSection(req, res);
});

// GET: Fetch all Hero Sections
const getHeroSections = asyncHandler(async (req, res) => {
  const heroSections = await HeroSection.find();
  sendResponse(res, STATUS_CODES.SUCCESS, heroSections, "Hero Sections fetched successfully");
});

// GET: Fetch single Hero Section by title
const getHeroSectionByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const heroSection = await HeroSection.findOne({ title });
  checkNotFound("Hero Section", heroSection);
  sendResponse(res, STATUS_CODES.SUCCESS, heroSection, "Hero Section fetched successfully");
});

const getHeroSectionByPageOrService = asyncHandler(async (req, res) => {
  const { pageName, serviceId } = req.query;
  const query = {};
  if (!pageName && !serviceId) {
    return sendResponse(res, STATUS_CODES.NOT_FOUND, null, "Either pageName or serviceId must be provided");
  }
  if (pageName) query.pageName = pageName;
  if (serviceId) query.serviceId = serviceId;
  const heroSections = await HeroSection.find(query);

  if (heroSections.length === 0) {
    return sendResponse(res, STATUS_CODES.NOT_FOUND, null, "Hero Section not found");
  }

  sendResponse(res, STATUS_CODES.SUCCESS, heroSections, "Hero Sections fetched successfully");

});

// PUT: Update Hero Section by ID
const updateHeroSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const heroSection = await HeroSection.findById(id);
  checkNotFound("Hero Section", heroSection);
  return saveHeroSection(req, res, heroSection);
});

// DELETE: Delete Hero Section by ID
const deleteHeroSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const heroSection = await HeroSection.findByIdAndDelete(id);
  checkNotFound("Hero Section", heroSection);

  // Delete associated media
  if (heroSection.media) {
    await deleteImageFromServer(heroSection.media);
  }

  sendResponse(res, STATUS_CODES.SUCCESS, heroSection, DELETE_SUCCESS("Hero Section"));
});

module.exports = {
  createHeroSection,
  getHeroSections,
  getHeroSectionByTitle,
  getHeroSectionByPageOrService,
  updateHeroSection,
  deleteHeroSection
};
