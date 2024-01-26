import { nanoid } from "nanoid";
import { promises as fs } from 'fs';
import { addContact, getContactById, listContacts, removeContact, updateContactbyId } from "../services/contactsServices.js";
import { log } from "console";


export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const contactById = await getContactById(req.params.id);

  res.status(200).json(contactById);
};

export const deleteContact = async (req, res) => {
  const deleteContact = await removeContact(req.params.id);

  res.status(200).json(deleteContact);
};

export const createContact = async (req, res) => {
  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const updateContact = await updateContactbyId(id, req.body);
};
