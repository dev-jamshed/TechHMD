import { CompanyDetailModel } from "../models/companyDetail.model.js";

export const addSlugToRobotsTxt = async (slug, moduleName) => {
  try {
    // Fetch the existing CompanyDetail record
    const companyDetail = await CompanyDetailModel.findOne();

    if (!companyDetail) {
      throw new Error("Company details not found");
    }

    // Fetch domain from environment variables (e.g., .env file)
    const domain = process.env.WEBSITE_URL;

    if (!domain) {
      throw new Error("Website domain not found in environment variables");
    }

    // Prepare the new entry for robots.txt (Allow rule)
    const newSlugEntry = `Allow: ${domain}/${moduleName}/${slug}\n`;

    // Check if the slug already exists in the robotsTxt content
    if (companyDetail.robotsTxt?.includes(newSlugEntry)) {
      console.log("Slug already allowed in robots.txt");
      return;
    }

    // Append the new slug entry to the robotsTxt content
    companyDetail.robotsTxt = (companyDetail.robotsTxt || "") + newSlugEntry;

    // Save the updated content back to the database
    await companyDetail.save();

    console.log("Slug added to robots.txt successfully");
  } catch (error) {
    console.error("Error adding slug to robots.txt:", error.message);
    throw new Error("Failed to update robots.txt content");
  }
};
