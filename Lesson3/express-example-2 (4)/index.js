const express = require('express');
const fs = require('node:fs/promises');
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const hostname = 'localhost';

const booksPath = path.join(__dirname, 'books.json');
const listBooks = async () => {
  const result = await fs.readFile(booksPath, 'utf-8');
  return JSON.parse(result);
};

//C - create
app.post('/create', async (req, res, next) => {
  try {
    const { title, author } = req.body;
    const books = await listBooks();
    const newBook = {
      title: title,
      author: author,
      id: uuidv4()
    };
    books.push(newBook);

    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    res.json(req.body);
  } catch (error) {}
});

//R - read
app.get('/list', async (req, res, next) => {
  try {
    const books = await listBooks();

    res.json(books);
  } catch (error) {}
});

//U - update
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

//D - delete
app.delete('/delete', async (req, res, next) => {
  try {
    const body = req.body;
    const books = await listBooks();
    const index = books.findIndex((item) => item.id === body.id);
    if (index === -1) {
      return null;
    }

    const [result] = books.splice(index, 1);
    console.log(result);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${hostname} ${port}`);
});
