const ciphersRouter = require('express').Router();
const Cipher = require('../models/cipher');

ciphersRouter.get('/', async (request, response, next) => {
  try {
    const ciphers = await Cipher.find({});
    response.json(ciphers);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

ciphersRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params;

  try {
    const cipher = await Cipher.findById(id);
    if (cipher) {
      response.json(cipher);
    } else {
      response.status(404).end();
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = ciphersRouter;
