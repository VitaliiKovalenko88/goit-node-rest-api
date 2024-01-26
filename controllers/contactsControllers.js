import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactbyId,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { log } from "console";
import { catchAsync } from "../helpers/catchAsync.js";


export const getAllContacts = catchAsync(async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);

});

export const getOneContact = catchAsync(async (req, res) => {
  const contactById = await getContactById(req.params.id);

  if (!contactById) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(contactById);
});

export const deleteContact = catchAsync(async (req, res) => {
  const deleteContact = await removeContact(req.params.id);

  if (!deleteContact) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(deleteContact);
})

export const createContact = catchAsync(async (req, res) => {
  const newContact = await addContact(req.body);

  if (!newContact) {
    throw HttpError(401, "Unauthorized")
  }

  res.status(201).json(newContact);
});

export const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateContact = await updateContactbyId(id, req.body);

  if (!updateContact) {
    throw HttpError(404, "Not found")
  }

  res.status(200).json(updateContact);
}); 
