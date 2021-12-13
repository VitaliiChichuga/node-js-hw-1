const fs = require("fs/promises");
const path = require("path");
// const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const chalk = require("chalk");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const result = await JSON.parse(contacts);
  return result;
};

const listContacts = async () => {
  const contacts = await readContacts();
  return await contacts.map((contact) => {
    return `
                ${chalk.magenta(`${contact.name}`)}            
          ${chalk.green("email:")}${chalk.yellow(`${contact.email}`)}
          ${chalk.green("phone:")}  ${chalk.yellow(`${contact.phone}`)}
          ${chalk.green("id:")} ${chalk.yellow(`${contact.id}`)}
            `;
  });
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (contact) {
    return `${chalk.bgGreen.black("Your contact:")}${chalk.blue(
      `${contact.name}`
    )}
        ${chalk.magenta("email:")}${chalk.green(`${contact.email}`)}
        ${chalk.magenta("phone:")}${chalk.green(`${contact.phone}`)}`;
  } else {
    return `${chalk.bgYellow.black(
      `Contact with id ${contactId} not found!!!`
    )}`;
  }
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const deletedCont = contacts.find((contact) => contact.id === contactId);

  const otherContacts = contacts.filter((contact) => contact.id !== contactId);

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(otherContacts, null, 4)
  );
  if (deletedCont) {
    return `${chalk.bgRed.bold.black(
      `Contact with id: ${deletedCont.id} DELETED!!!`
    )}
        ${chalk.bold.red("Deleted contact:")}
        ${chalk.yellow("name:")}${chalk.blue(`${deletedCont.name}`)}
        ${chalk.yellow("email:")}${chalk.blue(`${deletedCont.email}`)}
        ${chalk.yellow("phone:")}${chalk.blue(`${deletedCont.phone}`)}`;
  } else {
    return `${chalk.blue(
      `Contact with id: ${chalk.red(`${contactId}`)} not found!!! `
    )}`;
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contacts, null, 4)
  );

  return `
        ${chalk.bold.blue("New contact:")}
        ${chalk.magenta("name:")}${chalk.yellow(`${newContact.name}`)}
        ${chalk.magenta("email:")}${chalk.yellow(`${newContact.email}`)}
        ${chalk.magenta("phone:")}${chalk.yellow(`${newContact.phone}`)}`;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
