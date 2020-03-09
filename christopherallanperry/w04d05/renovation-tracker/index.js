// Require packages
const express = require('express');
const morgan = require('morgan');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// App variables
const app = express();
const port = process.env.PORT || 3000;
const router =  require('./config/routes');

const databaseName = 'renovation-tracker';
const databaseUrl = `mongodb://localhost/${databaseName}`;

mongoose.connect(databaseUrl, () => {
  return console.log(`Connected to db: ${databaseUrl}`);
});

// App settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// App middleware
app.use(morgan('dev'));
app.use(ejsLayouts);
app.use(express.static(`${__dirname}/bower_components`));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use('/', router);

// Test to see if app is running OK with nodemon
app.listen(port, () => console.log(`Started on port: ${port}`));

// Check Terminal to see if app is running on PORT 3000 and connecting to the database.
