const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parameters: [{
    type: String,
    required: true,
  }],
  price: {
    type: Number,
    validate: {
      validator: (v) => v >= 0,
      message: () => 'Cena nie może być wartością ujemną!'
    },
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    maxlength: 500,
    trim: true,
  }
}, {
  timestamps: true,
});

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;