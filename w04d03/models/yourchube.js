const mongoose = require('mongoose');

const yourchubeSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String },
  videoid: { type: String, required: true },
  genre: { type: String },
  views: { type: Number }
}, {
  timestamps: true
});

module.exports = mongoose.model('Yourchube', yourchubeSchema);
