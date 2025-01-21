import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { ProjectModel } from "../../models/project.model.js";
import uploadOnServer from "../../utils/cloudinary.js";
import sendResponse from "../../utils/responseHandler.js";
import { UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";
import ApiResponse from "../../utils/ApiResponse.js";
import checkNotFound from "../../utils/checkNotFound.js";

export const createProjectController = asyncHandler(async (req, res) => {
  const { name, description, link, serviceID } = req.body;

  let image;
  if (req.file?.path) {
    const result = await uploadOnServer(req.file.path);
    image = result?.url;
  }else {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
        message: "Image is required",
        path: ["image"],
    }]);
}

  const project = await ProjectModel.create({ name, description, link, image, serviceID });

  sendResponse(res, STATUS_CODES.SUCCESS, project, UPDATE_SUCCESS("Project"));
});

export const getAllProjectsController = asyncHandler(async (req, res) => {
    const projects = await ProjectModel.find();
    checkNotFound("Projects", projects);
    res.status(STATUS_CODES.SUCCESS).json(
      new ApiResponse(STATUS_CODES.SUCCESS, projects, "Projects fetched successfully")
    );
  });
export const getProjectController = asyncHandler(async (req, res) => {
  const project = await ProjectModel.findById(req.params.id);

  checkNotFound("Project", project);

  res.status(STATUS_CODES.SUCCESS).json(
    new ApiResponse(STATUS_CODES.SUCCESS, project, "Project fetched successfully")
  );
});

export const updateProjectController = asyncHandler(async (req, res) => {
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

export const deleteProjectController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteProject = await ProjectModel.findByIdAndDelete(id);

  checkNotFound("Project", deleteProject);
  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Project"));
});
