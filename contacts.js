const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const findContact = contacts.find(contact => contact.id === contactId);
  if (!findContact) {
    return null;
  }
  return findContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removeContact = contacts.find(contact => contact.id === contactId);
  if (!removeContact) {
    return null;
  }
  const contactsAfterRemove = contacts.filter(
    contact => contact.id !== contactId,
  );

  await fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemove));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
