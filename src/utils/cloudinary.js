const path = require('path');
const { STATUS_CODES } = require("./constants/statusCodes.js");
const { INTERNAL_SERVER_ERROR } = require("./constants/message.js");
const ApiError = require("./ApiError.js");
const fs = require("fs");

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

const deleteImageFromServer = async (url) => {
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

module.exports = {
  uploadOnServer,
  deleteImageFromServer
};
