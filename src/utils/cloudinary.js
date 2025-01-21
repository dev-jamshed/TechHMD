import { v2 as cloudinary } from "cloudinary";
import path from 'path';
import { fileURLToPath } from "url";
import { STATUS_CODES } from "./constants/statusCodes.js";
import { INTERNAL_SERVER_ERROR } from "./constants/message.js";
import ApiError from "./ApiError.js";
import asyncHandler from "./asyncHandler.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadOnServer = async (filePath) => {
  const fileName = path.basename(filePath);
  const url = `${process.env.WEBSITE_URL}/uploads/${fileName}`;

  try {
    return {
      asset_id: "local_" + Date.now(),
      url: url,
      secure_url: url,
      original_filename: fileName.split('.')[0],
    };

  } catch (error) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
};

export const deleteImageFromServer = async (url) => {
  try {
    const fileName = url.split('/').pop();
    const filePath = path.join(__dirname, '../../public/uploads', fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      throw new Error('File not found');
    }
  } catch (error) {
    // throw new Error('Failed to delete image from local server');
  }
};

export default uploadOnServer;
