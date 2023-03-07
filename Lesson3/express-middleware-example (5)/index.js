const express = require('express');
const fs = require('node:fs/promises');
const path = require('node:path');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(morgan('tiny'));

const booksPath = path.join(__dirname, 'books.json');

const listBooks = async () => {
  try {
    const result = await fs.readFile(booksPath, 'utf-8');
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
};

const myLogger = async function (req, res, next) {
  console.log(req.body);
  try {
    const body = req.body;

    const books = await listBooks();
    const index = books.findIndex((item) => item.id === body.id);
    if (index === -1) {
      res.send({ status: 200, message: 'A book with this id not found' });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

app.use(myLogger);

app.put('/update', async (req, res, next) => {
  try {
    const body = req.body;

    const books = await listBooks();
    const index = books.findIndex((item) => item.id === body.id);

    if (index === -1) {
      return null;
    }

    books[index] = { ...body };
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    res.send('Book was updated');
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
