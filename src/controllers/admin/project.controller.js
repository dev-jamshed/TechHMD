const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { ProjectModel } = require("../../models/project.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const sendResponse = require("../../utils/responseHandler.js");
const { UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const checkNotFound = require("../../utils/checkNotFound.js");

const createProjectController = asyncHandler(async (req, res) => {
  const { name, description, link, serviceID } = req.body;

  let image;
  if (req.file?.path) {
    const result = await uploadOnServer(req.file.path);
    image = result?.url;
  } else {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
        message: "Image is required",
        path: ["image"],
    }]);
  }

  const project = await ProjectModel.create({ name, description, link, image, serviceID });

  sendResponse(res, STATUS_CODES.SUCCESS, project, UPDATE_SUCCESS("Project"));
});

const getAllProjectsController = asyncHandler(async (req, res) => {
    const projects = await ProjectModel.find();
    checkNotFound("Projects", projects);
    res.status(STATUS_CODES.SUCCESS).json(
      new ApiResponse(STATUS_CODES.SUCCESS, projects, "Projects fetched successfully")
    );
  });

const getProjectController = asyncHandler(async (req, res) => {
  const project = await ProjectModel.findById(req.params.id);

  checkNotFound("Project", project);

  res.status(STATUS_CODES.SUCCESS).json(
    new ApiResponse(STATUS_CODES.SUCCESS, project, "Project fetched successfully")
  );
});

const updateProjectController = asyncHandler(async (req, res) => {
  const { name, description, link, serviceID } = req.body;

  let image;
  if (req.file?.path) {
    const result = await uploadOnServer(req.file.path);
    image = result?.url;
  }

  const project = await ProjectModel.findByIdAndUpdate(req.params.id, { name, description, link, image, serviceID });

  checkNotFound("Project", project);

  sendResponse(res, STATUS_CODES.SUCCESS, project, UPDATE_SUCCESS("Project"));
});

const deleteProjectController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteProject = await ProjectModel.findByIdAndDelete(id);

  checkNotFound("Project", deleteProject);
  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Project"));
});

module.exports = {
  createProjectController,
  getAllProjectsController,
  getProjectController,
  updateProjectController,
  deleteProjectController
};
