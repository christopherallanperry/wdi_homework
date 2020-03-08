const mongoose = require('mongoose');

const renovationSchema = new mongoose.Schema({
  property: { type: String, trim: true, required: true},
  address1: {type: String, trim: true},
  address2: {type: String, trim: true},
  town: {type: String, trim: true},
  county: {type: String, trim: true},
  postcode: {type: String, trim: true},
  imageUrl: {type: String, trim: true},
  owner: {type: String, trim: true},
  contactNo: {type: String, trim: true},
  email: {type: String, trim: true}
}, {
  timestamps: true
});

module.exports = mongoose.model('Renovation', renovationSchema);
