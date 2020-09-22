const mongoose = require('mongoose');

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
  visits: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit',
      }
    ],
    default: [],
  }
}, {
  timestamps: true,
});

clientSchema.pre('remove', async function (next) {
  const client = this;

  //removing related visits

  next();
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;