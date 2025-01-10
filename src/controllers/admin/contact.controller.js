import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ContactModel } from "../../models/contact.model.js"; 
import checkNotFound from "../../utils/checkNotFound.js";
import sendResponse from "../../utils/responseHandler.js";
import { CREATE_SUCCESS, DELETE_SUCCESS } from "../../utils/constants/message.js";

// Create a new Contact
export const createContactController = asyncHandler(async (req, res) => {
  const { name, email, subject, message, phone } = req.body; 
  const contact = await ContactModel.create({
    name,
    email,
    subject,
    message,
    phone  
  });

  if (!contact) {
    throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to create contact");
  }

  sendResponse(res, STATUS_CODES.CREATED, contact, CREATE_SUCCESS("Contact"));
});

// Get all Contacts
export const getAllContactsController = asyncHandler(async (req, res) => {
  const contacts = await ContactModel.find();
  
  checkNotFound("contacts", contacts);

  sendResponse(res, STATUS_CODES.SUCCESS, contacts, "Contacts fetched successfully");
});

// Get a single Contact by ID
export const getContactByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await ContactModel.findById(id);

  checkNotFound("contact", contact);

  sendResponse(res, STATUS_CODES.SUCCESS, contact, "Contact fetched successfully");
});

// Delete a Contact
export const deleteContactController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedContact = await ContactModel.findByIdAndDelete(id);

  checkNotFound("contact", deletedContact);

  sendResponse(res, STATUS_CODES.SUCCESS, null, DELETE_SUCCESS("Contact"));
});