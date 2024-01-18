import { log } from "console";
import fs from "fs/promises";
import path from "path";
import { nanoid } from 'nanoid'

const contactsPath = path.resolve('./db/contacts.json');


export async function listContacts() {
  try {
    const getContacts = await fs.readFile(contactsPath);
    const contacts = JSON.parse(getContacts);

    return contacts;

  } catch (error) {
    log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(contact => contact.id === contactId);

    return contactById ? contactById : null;

  } catch (error) {
    log(error.message);
  }

}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) {
      return null;
    };
    const deleteContact = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return deleteContact[0];

  } catch (error) {
    log(error.message);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;

  } catch (error) {
    log(error.message);

  }
}
