const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  subProductA: {
    type: String,
    required: true,
  },
  maintenanceA: {
    type: String,
    required: true,
  },
  subProductB: {
    type: String,
  },
  maintenanceB: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;