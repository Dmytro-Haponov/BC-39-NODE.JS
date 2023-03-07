const fs = require('node:fs/promises');
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const booksPath = path.join(__dirname, 'books.json');

const listBooks = async () => {
  const result = await fs.readFile(booksPath, 'utf-8');
  return JSON.parse(result);
};

const getById = async (id) => {
  const books = await listBooks();
  const result = books.find((el) => el.id == id);

  return result || null;
};

const add = async ({ title, author }) => {
  const books = await listBooks();
  const newBook = {
    title,
    author,
    id: uuidv4()
  };
  books.push(newBook);

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

  return newBook;
};

const addMany = async (books) => {
  const list = await listBooks();
  books.items.map((el) => {
    el.id = uuidv4();
    list.push(el);
  });

  await fs.writeFile(booksPath, JSON.stringify(list, null, 2));

  return books.items;
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
  addMany,
  deleteById
};
