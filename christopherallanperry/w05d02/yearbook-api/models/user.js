const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, trim: true },
  twitter: {type: String},
  github: {type: String},
  image: {type: String},
  bio: {type: String},
  portfolio: {type: Number},
  projects: [{type: mongoose.Schema.ObjectId, ref: 'Project'}]
}, {
  timestamps: true
});

userSchema.set('toJSON', { getters: true, virtuals: false });

module.exports = mongoose.model('User', userSchema);
