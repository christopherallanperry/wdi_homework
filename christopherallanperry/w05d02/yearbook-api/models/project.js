const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {type: String, trim: true, required: true},
  description: {type: String},
  github: {type: String, trim: true },
  website: {type: String, trim: true }
}, {
  timestamps: true
});

projectSchema.set('toJSON', { getters: true, virtuals: false });

module.exports = mongoose.model('Project', projectSchema);
