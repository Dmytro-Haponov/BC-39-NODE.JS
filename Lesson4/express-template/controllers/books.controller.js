const { listBooks, getBookById, addBook, updateBook, removeBook } = require('../services/books.service');
const { v4: uuidv4 } = require('uuid');
const { ServerError } = require('../helpers/error');

const getBooksController = async (req, res) => {
  try {
    const books = await listBooks();
    res.json(books);
  } catch (error) {
    throw new ServerError('Something went wrong', 501);
  }
};

const getBookByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await listBooks();
    const result = await getBookById(books, id);

    res.json(result);
  } catch (error) {}
};

const addBookController = async (req, res) => {
  try {
    const { title, author } = req.body;
    const books = await listBooks();
    const newBook = {
      id: uuidv4(),
      title,
      author
    };
    books.push(newBook);

    await addBook(books);

    res.json(req.body);
  } catch (error) {}
};

const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;

    const books = await listBooks();
    const result = await updateBook(books, id, title, author);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await listBooks();
    const result = await removeBook(books, id);
    res.json(result);
  } catch (error) {}
};
module.exports = {
  getBooksController,
  getBookByIdController,
  addBookController,
  updateBookController,
  deleteBookController
};
