import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { ProjectModel } from "../../models/project.model.js";
import uploadOnServer from "../../utils/cloudinary.js";
import sendResponse from "../../utils/responseHandler.js";
import { UPDATE_SUCCESS, DELETE_SUCCESS, CREATE_SUCCESS } from "../../utils/constants/message.js";
import ApiResponse from "../../utils/ApiResponse.js";
import checkNotFound from "../../utils/checkNotFound.js";
import { pipeline } from "../../utils/global.js";

export const createProjectController = asyncHandler(async (req, res) => {
  const { name, description, link, serviceId } = req.body;

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

  const project = await ProjectModel.create({ name, description, link, image, serviceId });

  if (project.serviceId) {
    const { serviceId, ...otherData } = (await project.populate("serviceId", "_id name")).toObject()
    const updatedProject = { service: serviceId, ...otherData }
    return sendResponse(res, STATUS_CODES.CREATED, updatedProject, CREATE_SUCCESS("Project"));
  }

  sendResponse(res, STATUS_CODES.SUCCESS, project, CREATE_SUCCESS("Project"));
});

export const getAllProjectsController = asyncHandler(async (req, res) => {
  const projects = await ProjectModel.aggregate(pipeline);
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
  const { name, description, link, serviceId } = req.body;

  let image;
  if (req.file?.path) {
    const result = await uploadOnServer(req.file.path);
    image = result?.url;
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id, { name, description, link, image, serviceId }, { new: true });

  checkNotFound("Project", updatedProject);

  if (updatedProject.serviceId) {
    const { serviceId, ...otherData } = (await updatedProject.populate("serviceId", "_id name")).toObject()
    const _updatedProject = { service: serviceId, ...otherData }
    return sendResponse(res, STATUS_CODES.CREATED, _updatedProject, CREATE_SUCCESS("Project"));
  }

  sendResponse(res, STATUS_CODES.SUCCESS, updatedProject, UPDATE_SUCCESS("Project"));
});

export const deleteProjectController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteProject = await ProjectModel.findByIdAndDelete(id);

  checkNotFound("Project", deleteProject);
  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Project"));
});
