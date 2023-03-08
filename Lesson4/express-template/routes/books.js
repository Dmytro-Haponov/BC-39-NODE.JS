const express = require('express');
const router = express.Router();

const {
  getBooksController,
  getBookByIdController,
  addBookController,
  updateBookController,
  deleteBookController
} = require('../controllers/books.controller');

const { addBookValidation } = require('../middlewares/validation.middleware');
const { controllerWrapper } = require('../helpers/errorHandler');

//get all books
router.get('/', controllerWrapper(getBooksController));

//get book by id
router.get('/:id', controllerWrapper(getBookByIdController));

//add new book
router.post('/', addBookValidation, controllerWrapper(addBookController));

//update book by id
router.put('/:id', controllerWrapper(updateBookController));

//delete book by id
router.delete('/:id', controllerWrapper(deleteBookController));

module.exports = router;
