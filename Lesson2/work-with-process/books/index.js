const fs = require('node:fs/promises');
const { v4: uuidv4 } = require('uuid');
const path = require('node:path');

const booksPath = path.join(__dirname, 'books.json');

const listBooks = async () => {
  const result = await fs.readFile(booksPath);
  return JSON.parse(result);
};

const getById = async (id) => {
  const books = await listBooks();
  const result = books.find((item) => item.id == id);

  return result || null;
};

const add = async ({ title, author }) => {
  const books = await listBooks();
  const newBook = {
    id: uuidv4(),
    title,
    author
  };
  books.push(newBook);

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

  return newBook;
};

const deleteById = async (id) => {
  const books = await listBooks();
  const index = books.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = books.splice(index, 1);

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return result;
};

module.exports = {
  listBooks,
  getById,
  add,
  deleteById
};
