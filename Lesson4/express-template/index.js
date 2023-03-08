const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/books');
const { errorHandler } = require('./helpers/errorHandler');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api/books', usersRouter);
app.use(errorHandler);

app.listen(process.env.PORT);
