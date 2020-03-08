const mongoose = require('mongoose');

const cycleSchema = mongoose.Schema({
  model: { type: String, trim: true, required: true },
  image: { type: String, trim: true },
  priceGbp: { type: Number, trim: true} ,
  desc: { type: String, trim: true },
  frame: { type: String, trim: true },
  fork: { type: String, trim: true },
  frontDera: { type: String, trim: true },
  rearDera: { type: String, trim: true }
});

module.exports = mongoose.model('Cycle', cycleSchema);
