const asyncHandler = require("../../utils/asyncHandler.js");
const sendResponse = require("../../utils/responseHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const { OurCoreTeam } = require("../../models/ourCoreTeam.model.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");

const createOurCoreTeam = asyncHandler(async (req, res) => {
    const { name, designation, description, linkedin_url, is_featured } = req.body;
    let avatar;
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Validation Error", [
            {
                message: "avatar is required",
                path: ["avatar"],
            },
        ]);
    }
    avatar = await uploadOnServer(avatarLocalPath);
    const teamMember = await OurCoreTeam.create({ name, designation, avatar: avatar?.url, description, linkedin_url, is_featured });
    sendResponse(res, STATUS_CODES.CREATED, teamMember, CREATE_SUCCESS("Team Member"));
});

const getOurCoreTeam = asyncHandler(async (req, res) => {
    const teamMembers = await OurCoreTeam.find();
    checkNotFound("Team Members", teamMembers);
    sendResponse(res, STATUS_CODES.SUCCESS, teamMembers, "Team Members fetched successfully");
});

const updateOurCoreTeam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, designation, description, linkedin_url, is_featured } = req.body;

    // Check if the team member exists
    const existingTeamMember = await OurCoreTeam.findById(id);
    checkNotFound("Team Member", existingTeamMember);

    let avatar;
    const avatarLocalPath = req.file?.path;

    if (avatarLocalPath) {
        // Delete old avatar
        if (existingTeamMember.avatar) {
            await deleteImageFromServer(existingTeamMember.avatar);
        }
        avatar = await uploadOnServer(avatarLocalPath);
    }

    const updatedData = { name, designation, description, linkedin_url, is_featured };
    if (avatar) {
        updatedData.avatar = avatar?.url;
    }

    const teamMember = await OurCoreTeam.findByIdAndUpdate(id, updatedData, { new: true });
    checkNotFound("Team Member", teamMember);
    sendResponse(res, STATUS_CODES.SUCCESS, teamMember, UPDATE_SUCCESS("Team Member"));
});

const deleteOurCoreTeam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const teamMember = await OurCoreTeam.findByIdAndDelete(id);
    checkNotFound("Team Member", teamMember);

    // Delete associated avatar
    if (teamMember.avatar) {
        await deleteImageFromServer(teamMember.avatar);
    }

    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Team Member"));
});

const getFeaturedOurCoreTeam = asyncHandler(async (req, res) => {
  const featuredTeamMembers = await OurCoreTeam.find({ is_featured: true });
  checkNotFound("Featured Team Members", featuredTeamMembers);
  sendResponse(res, STATUS_CODES.SUCCESS, featuredTeamMembers, "Featured Team Members fetched successfully");
});

module.exports = {
    createOurCoreTeam,
    getOurCoreTeam,
    updateOurCoreTeam,
    deleteOurCoreTeam,
    getFeaturedOurCoreTeam
};