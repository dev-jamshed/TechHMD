const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { User } = require("../../models/user.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const ApiResponse = require("../../utils/ApiResponse.js");
const { generateJwtToken } = require("../../utils/auth.js");
const bcrypt = require("bcrypt");
const { ACCESS_TOKEN, PRODUCTION } = require("../../utils/constants/global.js");
const { INVALID_CREDENTIALS, LOGIN_SUCCESS, LOGOUT_SUCCESS, CREATE_SUCCESS } = require("../../utils/constants/message.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");

const saltRounds = Number(process.env.SALTROUNDS);

const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })
  if (userExist) {
    throw new ApiError(STATUS_CODES.CONFLICT, "A user with this email already exists.");
  }
  let avatar;
  const avtarLocalPath = req.file?.path;
  if (avtarLocalPath) {
    avatar = await uploadOnServer(avtarLocalPath);
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name, email,
    password: hashedPassword,
    avatar: avatar?.url
  })
  if (!user) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Something went wrong while User Registration")
  }

  const createduser = await User.findById(user._id).select(
    "_id name email"
  );

  res.status(STATUS_CODES.CREATED).json(
    new ApiResponse(STATUS_CODES.CREATED, createduser, CREATE_SUCCESS("User"))
  )
})

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select("_id name email password");

  if (!user) {
    throw new ApiError(STATUS_CODES.UN_AUTHORIZED, INVALID_CREDENTIALS);
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ApiError(STATUS_CODES.UN_AUTHORIZED, INVALID_CREDENTIALS);
  }

  const jwtToken = generateJwtToken(user._id, user.email);
  try {
    res.cookie(ACCESS_TOKEN, jwtToken, {
      maxAge: process.env.COOKIE_MAX_AGE,
      secure: process.env.ENV == PRODUCTION,
    }).status(STATUS_CODES.SUCCESS).json(
      new ApiResponse(STATUS_CODES.SUCCESS, { jwtToken, user: { ...user["_doc"], password: "" } }, LOGIN_SUCCESS(user.name))
    );
  } catch (error) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Error setting cookie");
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie(ACCESS_TOKEN, {
      secure: process.env.ENV == PRODUCTION,
    }).status(STATUS_CODES.SUCCESS).json(
      new ApiResponse(STATUS_CODES.SUCCESS, null, LOGOUT_SUCCESS(req.user.name))
    );
  } catch (error) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Error clearing cookie");
  }
});

const getAdmin = asyncHandler(async (req, res) => {
  const user = await User.findOne().select(
    "_id name email password"
  );

  if (!user) {
    throw new ApiError(STATUS_CODES.UN_AUTHORIZED, INVALID_CREDENTIALS);
  }

  res.status(STATUS_CODES.SUCCESS).json(
    new ApiResponse(STATUS_CODES.SUCCESS, { user: { ...user["_doc"], password: "" } }, "")
  )
})

module.exports = { registerController, loginController, getAdmin, logout }