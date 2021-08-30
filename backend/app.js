const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');

const app = express();
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const ciphersRouter = require('./controllers/ciphers');
const adminRouter = require('./controllers/admin');
const middleware = require('./utils/middleware');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
  });
app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/ciphers', ciphersRouter);

// In development, ciphers can be modified
if (process.env.NODE_ENV === 'development') {
  app.use('/api/ciphers', adminRouter);
} else if (
  process.env.NODE_ENV === 'production' &&
  fs.existsSync(path.join(__dirname, '/build'))
) {
  app.use(express.static(path.join(__dirname, '/build')));
  app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, '/build/index.html'));
  });
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
