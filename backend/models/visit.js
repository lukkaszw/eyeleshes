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
  date: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    maxlength: 500,
    required: true,
    trim: true,
  }
}, {
  timestamps: true,
});

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;