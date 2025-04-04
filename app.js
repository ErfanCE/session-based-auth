// Core Modules
const { join } = require('node:path');

// Third Party Modules
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

// Local Modules
const { connectToDatabase } = require('./database/database-connection');
const { AppError } = require('./utils/app-error');
const { addAdmin } = require('./utils/add-admin');
const appRouter = require('./routes/app-route');

const app = express();

// Database connection
connectToDatabase().then(() => addAdmin());

// Logger
app.use(morgan('dev'));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', join(__dirname, './views'));

// serve static files
app.use(express.static(join(__dirname, './public')));

// Body Parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

// Routing
app.use('/', appRouter);

// Not Found Routes
app.all('*', (req, res, next) => {
  next(new AppError(404, `can't find ${req.method} ${req.originalUrl}`));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    status = 'error',
    message = 'internal sever error, not your fault :)'
  } = err;

  console.log(err);

  res.status(statusCode).json({ status, message });
});

module.exports = { app };
