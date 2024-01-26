import { log } from "console";
import fs from "fs/promises";
import path from "path";
import { nanoid } from 'nanoid'

const contactsPath = path.resolve('./db/contacts.json');


export async function listContacts() {

  const getContacts = await fs.readFile(contactsPath);
  const contacts = JSON.parse(getContacts);

  return contacts;

};

export async function getContactById(contactId) {

  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === contactId);

  return contactById ? contactById : null;



}

export async function removeContact(contactId) {

  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) {
    return null;
  };
  const deleteContact = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deleteContact[0];


}

export async function addContact({ name, email, phone }) {

  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  log(newContact);
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

export async function updateContactbyId(id, data) {

  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(contact => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }

  const contactById = contacts.find(contact => contact.id === id);

  contacts[contactIndex] = { id, ...contactById, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[contactIndex];

}
