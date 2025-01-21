import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { CompanyDetailModel } from "../../models/companyDetail.model.js";
import uploadOnServer, { deleteImageFromServer } from "../../utils/cloudinary.js";
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import { CREATE_SUCCESS, UPDATE_SUCCESS } from "../../utils/constants/message.js";

const createCompanyDetailController = asyncHandler(async (req, res) => {
  const {
    name,
    slogan,
    sloganDescription,
    description,
    address,
    phone1,
    phone2,
    email1,
    email2,
    socialMedia,
    seo,
    sitemap,
    robotsTxt,
  } = req.body;

  let headerLogo, footerLogo;

  const headerLogoLocalPath = req.files?.headerLogo?.[0]?.path;
  const footerLogoLocalPath = req.files?.footerLogo?.[0]?.path;

  if (!headerLogoLocalPath || !footerLogoLocalPath) {
    throw new ApiError(400, "Validation Error", [
      {
        message: "All logos (headerLogo, footerLogo) are required",
        path: ["logos"],
      },
    ]);
  }

  headerLogo = await uploadOnServer(headerLogoLocalPath);
  footerLogo = await uploadOnServer(footerLogoLocalPath);

  const companyDetail = await CompanyDetailModel.create({
    name,
    slogan,
    sloganDescription,
    description,
    address,
    headerLogo: headerLogo?.url,
    footerLogo: footerLogo?.url,
    phone1,
    phone2,
    email1,
    email2,
    socialMedia,
    seo,
    sitemap,
    robotsTxt,
  });

  sendResponse(res, STATUS_CODES.CREATED, companyDetail, CREATE_SUCCESS("Company Detail"));
});

const getCompanyDetailController = asyncHandler(async (req, res) => {
  const companyDetail = await CompanyDetailModel.findOne();
  checkNotFound("Company detail", companyDetail);

  sendResponse(res, STATUS_CODES.SUCCESS, companyDetail, "Company detail fetched successfully");
});

const updateCompanyDetailController = asyncHandler(async (req, res) => {
  const {
    name,
    slogan,
    sloganDescription,
    description,
    address,
    phone1,
    phone2,
    email1,
    email2,
    socialMedia,
    seo: { metaTitle, metaDescription, metaKeywords, ogTitle, ogDescription },
    sitemap,
    robotsTxt,
  } = req.body;

  // Check if the company detail exists
  const existingCompanyDetail = await CompanyDetailModel.findOne();
  checkNotFound("Company detail", existingCompanyDetail);

  let headerLogo, footerLogo, ogImage;

  if (req.files?.headerLogo?.[0]?.path) {
    // Delete old header logo
    if (existingCompanyDetail.headerLogo) {
      await deleteImageFromServer(existingCompanyDetail.headerLogo);
    }
    headerLogo = await uploadOnServer(req.files.headerLogo[0].path);
  }

  if (req.files?.footerLogo?.[0]?.path) {
    // Delete old footer logo
    if (existingCompanyDetail.footerLogo) {
      await deleteImageFromServer(existingCompanyDetail.footerLogo);
    }
    footerLogo = await uploadOnServer(req.files.footerLogo[0].path);
  }

  if (req.files?.ogImage?.[0]?.path) {
    // Delete old og image
    if (existingCompanyDetail.seo?.ogImage) {
      await deleteImageFromServer(existingCompanyDetail.seo.ogImage);
    }
    ogImage = await uploadOnServer(req.files.ogImage[0].path);
  }

  const updatedDetails = {
    name,
    slogan,
    sloganDescription,
    description,
    address,
    phone1,
    phone2,
    email1,
    email2,
    socialMedia,
    seo: { metaTitle, metaDescription, metaKeywords, ogTitle, ogDescription, ...(ogImage && { ogImage: ogImage?.url }) },
    ...(headerLogo && { headerLogo: headerLogo?.url }),
    ...(footerLogo && { footerLogo: footerLogo?.url }),
    sitemap,
    robotsTxt,
  };

  const companyDetail = await CompanyDetailModel.findOneAndUpdate(
    {},
    updatedDetails,
    { new: true }
  );

  checkNotFound("Company detail", companyDetail);
  sendResponse(res, STATUS_CODES.SUCCESS, companyDetail, UPDATE_SUCCESS("Company Detail"));
});

export {
  createCompanyDetailController,
  getCompanyDetailController,
  updateCompanyDetailController,
};