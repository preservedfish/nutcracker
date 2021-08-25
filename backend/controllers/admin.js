const adminRouter = require('express').Router();
const Cipher = require('../models/cipher');

adminRouter.post('/', async (request, response, next) => {
  const { body } = request;

  if (!body.encoded || !body.decoded) {
    response.status(400).end();
  } else {
    const cipher = new Cipher({
      type: body.type,
      encoded: body.encoded,
      decoded: body.decoded,
      title: body.title,
      difficulty: body.difficulty,
      description: body.description,
      source: body.source,
    });

    try {
      const savedCipher = await cipher.save();
      response.json(savedCipher);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
});

adminRouter.put('/:id', async (request, response, next) => {
  const { body } = request;

  const cipher = {
    type: body.type,
    encoded: body.encoded,
    decoded: body.decoded,
    title: body.title,
    difficulty: body.difficulty,
    description: body.description,
    source: body.source,
  };

  Object.keys(cipher).forEach((key) => {
    if (!cipher[key]) {
      delete cipher[key];
    }
  });

  try {
    const updatedCipher = await Cipher.findByIdAndUpdate(
      request.params.id,
      cipher,
      {
        new: true,
      }
    );
    if (updatedCipher) {
      response.json(updatedCipher);
    } else {
      response.status(404).end();
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

adminRouter.delete('/:id', async (request, response, next) => {
  try {
    await Cipher.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = adminRouter;
