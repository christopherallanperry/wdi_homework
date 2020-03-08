const mongoose = require('mongoose');

const wallSchema = mongoose.Schema({
  available: String,
  file: String,
  lat: String,
  lng: String,
  postcode: String,
  name: String,
  website: String,
  location: String
});

module.exports = mongoose.model('Wall', wallSchema);
