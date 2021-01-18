import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { ValidationError } from 'express-json-validator-middleware';
import logger from 'morgan';
import User from './app/user/models/user';

import './config/init'; // must come before importing any other app files
import router from './router';
import './db/init';
import { corsMiddleware, corsOrigin } from './config/cors';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', corsMiddleware);
app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const title = 'The request body does not match the expected schema.';

    setCorsHeader(req, res);
    res.status(400).json({ title, details: err.validationErrors });
    next();
  } else {
    next(err);
  }
});

// error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const error = {
    title: err.message,
  };

  setCorsHeader(req, res);
  res.status(status).json(error);
  next();
});

const setCorsHeader = (req, res) => {
  const origin = req.get('origin');

  if (origin && origin.match(corsOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
};

export default app;
