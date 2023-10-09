const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = JSON.parse(await fs.readFile(contactsPath));

  console.table(data);
  return data;
}

async function getContactById(contactId) {
  const contacts = JSON.parse(await fs.readFile(contactsPath));

  const contactById = contacts.find((contact) => contact.id === contactId);

  console.log(contactById || null);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = JSON.parse(await fs.readFile(contactsPath));

  // const index = contacts.findIndex((contact) => contact.id === contactId);

  // if (index === -1) {
  //   return null;
  // }

  // const [result] = contacts.splice(index, 1);

  // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  // return result;

  const deletedContact = await getContactById(contactId);

  const filteredContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
}

async function addContact(name, email, phone) {
  const contacts = JSON.parse(await fs.readFile(contactsPath));

  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };

  await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact], null, 2));

  console.log(newContact);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
