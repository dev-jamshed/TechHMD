const asyncHandler = require("../../utils/asyncHandler.js");
const { Client } = require("../../models/client.model.js");
const uploadOnServer = require("../../utils/cloudinary.js").default;
const { deleteImageFromServer } = require("../../utils/cloudinary.js");
const { STATUS_CODES } = require("../../utils/constants/statusCodes.js");
const checkNotFound = require("../../utils/checkNotFound.js");
const sendResponse = require("../../utils/responseHandler.js");
const ApiError = require("../../utils/ApiError.js");
const { CREATE_SUCCESS, UPDATE_SUCCESS, DELETE_SUCCESS } = require("../../utils/constants/message.js");

// POST: Create Client
const createClient = asyncHandler(async (req, res) => {
    const { name, description, website_url, is_featured } = req.body;
    let logo;
    const logoLocalPath = req.file?.path;

    if (!logoLocalPath) {
        throw new ApiError(400, "Validation Error", [
          {
            message: "Logo are required",
            path: ["logo"],
          },
        ]);
      }

  
        const uploadResponse = await uploadOnServer(logoLocalPath);
        logo = uploadResponse?.secure_url;
   

    const client = await Client.create({ name, logo, description, website_url, is_featured });
    sendResponse(res, STATUS_CODES.CREATED, client, CREATE_SUCCESS("Client"));
});

// GET: Fetch all Clients
const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.find();
    checkNotFound("Clients", clients);
    sendResponse(res, STATUS_CODES.SUCCESS, clients, "Clients fetched successfully");
});

// GET: Fetch single Client by ID
const getClientById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const client = await Client.findById(id);
    checkNotFound("Client", client);
    sendResponse(res, STATUS_CODES.SUCCESS, client, "Client fetched successfully");
});

// PUT: Update Client by ID
const updateClient = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, website_url, is_featured } = req.body;
    let logo;
    const logoLocalPath = req.file?.path;

    if (logoLocalPath) {
        const existingClient = await Client.findById(id);
        if (existingClient && existingClient.logo) {
            await deleteImageFromServer(existingClient.logo);
        }
        const uploadResponse = await uploadOnServer(logoLocalPath);
        logo = uploadResponse?.secure_url;
    }

    const updatedClient = { name, description, website_url, is_featured, logo };
    const client = await Client.findByIdAndUpdate(id, updatedClient, { new: true });
    checkNotFound("Client", client);
    sendResponse(res, STATUS_CODES.SUCCESS, client, UPDATE_SUCCESS("Client"));
});

// DELETE: Delete Client by ID
const deleteClient = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);
    checkNotFound("Client", client);
    if (client.logo) {
        await deleteImageFromServer(client.logo);
    }
    sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Client"));
});

module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
};
