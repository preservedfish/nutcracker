const mongoose = require('mongoose');

const cipherSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  encoded: {
    type: String,
    required: true,
  },
  decoded: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  description: String,
  source: String,
});

cipherSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    returnedObject.decoded = returnedObject.decoded.toUpperCase();
    returnedObject.encoded = returnedObject.encoded.toUpperCase();
  },
});

const Cipher = mongoose.model('Cipher', cipherSchema);

module.exports = Cipher;
