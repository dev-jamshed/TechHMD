import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { Service } from "../../models/service.model.js";
import uploadOnServer, { deleteImageFromServer } from "../../utils/cloudinary.js";
import { addServiceToSitemap, updateServiceInSitemap } from "../../utils/sitemap.js";
import checkNotFound from "../../utils/checkNotFound.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import { Types } from 'mongoose';
import sendResponse from "../../utils/responseHandler.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";

const createServiceController = asyncHandler(async (req, res) => {
  const { name, description, shortDescription, slug, parentService, metaTitle, metaDescription } = req.body;

  const serviceExist = await Service.findOne({ slug });
  if (serviceExist) {
    throw new ApiError(STATUS_CODES.CONFLICT, "Service with this slug already exists");
  }

  let logo;
  const logoLocalPath = req.file?.path;

  if (!logoLocalPath) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "validation error", [{
      message: "Logo is required",
      path: ["logo"],
    }])
  }

  logo = await uploadOnServer(logoLocalPath);

  const service = await Service.create({
    name,
    description,
    shortDescription,
    slug,
    parentService: parentService ? new Types.ObjectId(parentService) : null,
    metaTitle,
    metaDescription,
    logo: logo?.url,
  });

  if (!service) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong while registering the service");
  }

  const updatedSitemap = await addServiceToSitemap(slug);

  sendResponse(res, STATUS_CODES.CREATED, { service, sitemap: updatedSitemap }, CREATE_SUCCESS("Service"));
});

const getParentServices = asyncHandler(async (req, res) => {
  const parentServices = await Service.find({ parentService: null })

  checkNotFound("Parent Services", parentServices);
  sendResponse(res, STATUS_CODES.SUCCESS, parentServices, "Parent services fetched successfully");
})

const getAllServicesController = asyncHandler(async (req, res) => {
  const { children } = req.query

  const aggregateOptions = children == 'true' ?
    [
      {
        $match: {
          parentService: null
        }
      },
      {
        $lookup: {
          from: "services",
          let: { parentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$parentService", "$$parentId"] }
              }
            },
            {
              $lookup: {
                from: "services",
                let: { childId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$parentService", "$$childId"] }
                    }
                  }
                ],
                as: "grandchildrenServices"
              }
            }
          ],
          as: "childrenServices"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          logo: 1,
          slug: 1,
          metaTitle: 1,
          metaDescription: 1,
          childrenServices: {
            $map: {
              input: "$childrenServices",
              as: "child",
              in: {
                _id: "$$child._id",
                name: "$$child.name",
                description: "$$child.description",
                logo: "$$child.logo",
                slug: "$$child.slug",
                metaTitle: "$$child.metaTitle",
                metaDescription: "$$child.metaDescription",
                grandchildrenServices: "$$child.grandchildrenServices"
              }
            }
          }
        }
      }
    ]

    :

    [
      {
        $lookup: {
          from: "services",
          let: { "serviceId": "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$parentService", "$$serviceId"] } } },
          ],
          as: "childrenServices"
        }
      }
    ]

  const services = await Service.aggregate(aggregateOptions);

  checkNotFound("services", services);
  sendResponse(res, STATUS_CODES.SUCCESS, services, "Services fetched successfully");
});

const getServiceBySlugController = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const service = await Service.findOne({ slug }).populate('parentService');
  checkNotFound("service", service);
  sendResponse(res, STATUS_CODES.SUCCESS, service, "Service fetched successfully");
});

const getSubServices = asyncHandler(async (req, res) => {
  const { parentServiceId } = req.params;

  const subServices = await Service.find({ parentService: parentServiceId })
  checkNotFound("sub services", subServices);
  sendResponse(res, STATUS_CODES.SUCCESS, subServices, "Sub services fetched successfully");
});

const updateServiceController = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { name, description, shortDescription, parentService, metaTitle, metaDescription, newSlug } = req.body;

  let logo;
  const logoLocalPath = req.file?.path;
  if (logoLocalPath) {
    const existingService = await Service.findOne({ slug });
    if (existingService && existingService.logo) {
      await deleteImageFromServer(existingService.logo);
    }
    const uploadResponse = await uploadOnServer(logoLocalPath);
    logo = uploadResponse?.secure_url;
  }

  const serviceDetails = { name, description, shortDescription, parentService, metaTitle, metaDescription, slug: newSlug || slug, logo }
  const service = await Service.findOneAndUpdate({ slug }, { ...serviceDetails }, { new: true });
  checkNotFound("service", service);

  const updatedSitemap = await updateServiceInSitemap(slug, newSlug || slug);

  sendResponse(res, STATUS_CODES.SUCCESS, { service, sitemap: updatedSitemap }, UPDATE_SUCCESS("Service"));
});

const deleteServiceController = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const service = await Service.findOneAndDelete({ slug });
  checkNotFound("service", service);
  if (service.logo) {
    await deleteImageFromServer(service.logo);
  }
  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Service"));
});

export { createServiceController, getAllServicesController, getServiceBySlugController, updateServiceController, deleteServiceController, getSubServices, getParentServices };