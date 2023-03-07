const books = require('./books');

const invokeAction = async ({ action, id, title, items, author }) => {
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
    case 'addManyBooks':
      const newBooks = await books.addMany({ items });
      break;
    case 'deleteById':
      const deleteBook = await books.deleteById(id);
      console.log(deleteBook);
      break;
    default:
      console.log('Unknown action');
  }
};

invokeAction({ action: 'list' });
invokeAction({ action: 'getById', id: 'u9kgwNWGi3uUUwh0b8V48' });
invokeAction({ action: 'add', title: 'Worm', author: 'Джон Маккрей' });
invokeAction({
  action: 'addManyBooks',
  items: [
    { title: 'Worm', author: 'Джон Маккрей' },
    { title: 'New Book', author: 'John Branson' }
  ]
});
invokeAction({ action: 'deleteById', id: 'u9kgwNWGi3uUUwh0b8V48' });
