const books = require('./books');

const getAction = async ({ action, id, title, author }) => {
  switch (action) {
    case 'list':
      const bookList = await books.listBooks();
      console.log(bookList);
      break;
    case 'getById':
      const oneBook = await books.getById(id);
      console.log(oneBook);
      break;
    case 'add':
      const newBook = await books.add({ title, author });
      console.log(newBook);
      break;
    case 'deleteById':
      const deletedBook = await books.deleteById(id);
      console.log(deletedBook);
      break;
    default:
      console.log('Unknown action');
      break;
  }
};

const actionIndex = process.argv.indexOf('--action');

if (actionIndex !== -1) {
  const action = process.argv[actionIndex + 1];

  if (action === 'deleteById' || action === 'getById') {
    const id = process.argv[actionIndex + 2];

    getAction({ action, id });
  } else if (action === 'add') {
    const title = process.argv[actionIndex + 2];
    const author = process.argv[actionIndex + 3];

    getAction({ action, title, author });
  } else {
    getAction({ action });
  }
} else {
  console.log('Unknown action');
}

//How is it works? (examples working with Process)
/**
 * node index --action list
 * node index --action add New Test
 * node index --action deleteById 13ee9841-22d5-41a6-890c-01f0f3ae1f14
 * node index --action getById 33947c11-e4f1-434a-bc9c-46185cd094b4
 */
