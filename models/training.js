const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  requiredForRoles: [String], // e.g., ['Dental Assistant', 'Receptionist']
  completionDeadlineDays: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Training', trainingSchema);
