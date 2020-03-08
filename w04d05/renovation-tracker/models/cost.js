const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
  propertyId: { type: String, trim: true, required: true},
  contractorId: {type: String, trim: true},
  contractorRef: {type: String, trim: true },
  costCategory: {type: String, trim: true},
  costDesc: {type: String, trim: true},
  costValue: {type: Number, trim: true},
  taxAdded: {type: Number, trim: true}
}, {
  timestamps: true
});

module.exports = mongoose.model('Cost', costSchema);
