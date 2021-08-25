const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRouter = require('express').Router();
const User = require('../models/user');
const Cipher = require('../models/cipher');

usersRouter.post('/', async (request, response, next) => {
  const { body } = request;
  const saltRounds = 10;

  try {
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// eslint-disable-next-line consistent-return
usersRouter.put('/', async (request, response, next) => {
  const { body } = request;
  if (!request.token) {
    return response.status(401).json({ error: 'Missing token' });
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' });
    }

    const completedCipher = await Cipher.findById(body.cipher);
    if (completedCipher) {
      const updatedUser = await User.findByIdAndUpdate(
        decodedToken.id,
        { $addToSet: { completed: body.cipher } },
        {
          new: true,
        }
      );
      if (updatedUser) {
        response.json(updatedUser);
      } else {
        response.status(404).end();
      }
    } else {
      response.status(404).end();
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = usersRouter;
