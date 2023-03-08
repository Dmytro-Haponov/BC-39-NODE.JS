const fs = require('node:fs/promises');
const path = require('node:path');

const dirname = process.cwd();
const booksPath = path.join(dirname, 'models', 'books.json');

const listBooks = async () => {
  console.log(dirname, booksPath);
  const result = await fs.readFile(booksPath);
  return JSON.parse(result);
};

const getBookById = async (books, id) => {
  const result = books.find((item) => item.id === id);

  return result || 'Books was not found';
};

const addBook = async (books) => {
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
};

const updateBook = async (books, id, title, author) => {
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return 'Book have not found';
  }

  books[index] = { id, title, author };
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return 'Book was updated';
};

const removeBook = async (books, id) => {
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return 'Book have not found';
  }

  const [deleteBook] = books.splice(index, 1);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return deleteBook;
};

module.exports = { listBooks, getBookById, addBook, updateBook, removeBook };
