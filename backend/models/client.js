const mongoose = require('mongoose');
const Visit = require('../models/visit');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  surname: {
    type: String,
    required: true,
    maxlength: 30,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

clientSchema.pre('remove', async function (next) {
  const client = this;

  await Visit.deleteMany({ clientId: client._id });

  next();
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;