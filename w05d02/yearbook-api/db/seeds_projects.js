const mongoose = require('mongoose');

const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yearbook-api';
mongoose.connect(databaseUrl);

const Project = require('../models/project');

const project1 = new Project({
  title: 'Minesweeper',
  description: 'A recreation of the MS Windows classic',
  github: 'https://github.com/ChrisofArabia/WDI_PROJECT_1',
  website: 'https://frozen-eyrie-56010.herokuapp.com/'
});

project1.save((err, project) => {
  if (err) return console.log(err);
  return console.log(`${project.title} was saved`);
});
