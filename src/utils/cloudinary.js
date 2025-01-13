import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { STATUS_CODES } from "./constants/statusCodes.js";
import { INTERNAL_SERVER_ERROR } from "./constants/message.js";
import ApiError from "./ApiError.js";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

    // cloud_name: "ddhoxxqbe",
    // api_key: "952469622347586",
    // api_secret: "2mAoCPs2HPz8K6A2DZSQMwiGiVo"
});
// console.log('Debugging on Production:', { env: process.env.CLOUDINARY_CLOUD_NAME });

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        return null;
    }
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.error("Error on Uploading File in Cloudinary ❌", error);
        throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
    }
};

export const deleteImageFromCloudinary = async (url) => {
    try {
        const publicId = url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId, { invalidate: true });
    } catch (error) {
        throw new Error('Failed to delete image from Cloudinary');
    }
};

export default uploadOnCloudinary;
