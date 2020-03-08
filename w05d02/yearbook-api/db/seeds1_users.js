const mongoose = require('mongoose');

const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yearbook-api';
mongoose.connect(databaseUrl);

const User = require('../models/user');

const user1 = new User({
  name: 'Chris Perry',
  twitter: 'https://twitter.com/Chris_Perry_61',
  github: 'https://github.com/ChrisofArabia',
  image: 'chris.jpg',
  bio: 'He\'s just this guy, you know?'
});

user1.save((err, user) => {
  if (err) return console.log(err);
  return console.log(`${user.name} was saved`);
});
