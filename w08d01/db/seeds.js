const mongoose = require('mongoose');
const config   = require('../config/config');

mongoose.connect(config.db);

const User     = require('../models/user');

User.collection.drop();

const users = [
  {
    name: 'Tom',
    image: 'http://fillmurray.com/300/300.jpg'
  },
  {
    name: 'Musty',
    image: 'http://fillmurray.com/301/301.jpg'
  }
];

users.forEach(user => User.create(user, (err, user) => console.log(`${ user.name } was saved.`)));
