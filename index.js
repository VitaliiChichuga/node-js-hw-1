const { Command } = require("commander");
const chalk = require("chalk");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(...contacts);
      break;

    case "get":
      const contact = await getContactById(id);     
        console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(chalk.bgGreen.white("SUCCESS)))"));
      console.log(newContact);
      break;

    case "remove":
      const response = await removeContact(id);
      console.log(response);
      break;
    default:
      console.warn(chalk.bgRedBright.black("Unknown action type!"));
  }
};

invokeAction(argv);
