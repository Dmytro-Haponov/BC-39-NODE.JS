const { program } = require('commander');

const books = require('./books');

const invokeAction = async ({ action, id, title, author }) => {
  switch (action) {
    case 'getAll':
      const allBooks = await books.getAll();
      console.log(allBooks);
      break;
    case 'getById':
      const oneBook = await books.getById(id);
      console.log(oneBook);
      break;
    case 'add':
      const newBook = await books.add({ title, author });
      console.log(newBook);
      break;
    case 'updateById':
      const updateBook = await books.updateById(id, { title, author });
      console.log(updateBook);
      break;
    case 'removeById':
      const removeBook = await books.removeById(id);
      console.log(removeBook);
      break;
    default:
      console.log('Unknown action');
  }
};

program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-t, --title <type>')
  .option('-at, --author <type>');

program.parse();

const options = program.opts();
console.log(options);
invokeAction(options);

//How is it works? (examples working with Commander from console)
/**
 * node index -a getAll
 * node index -a getById -i 17f938e7-1a43-4301-aaec-c6ef85951e99
 * node index -a add -t New -at Test
 * node index -a updateById -i 17f938e7-1a43-4301-aaec-c6ef85951e99 -t New -at Test
 * node index -a removeById -i 17f938e7-1a43-4301-aaec-c6ef85951e99
 */
