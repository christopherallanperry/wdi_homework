const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const router = require('./config/routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

// Logging
app.use(morgan('dev'));

// View directory
app.set('views', `${__dirname}/views`);

// Use ejs as the template engine
app.set('view engine', 'ejs');

// Static files folder
app.use(express.static(`${__dirname}/public`));

// Setup app to parse req.body
app.use(bodyParser.urlencoded({ extended: true }));

// methodOverride for POST/PUT
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Use expressLayouts
app.use(expressLayouts);

// Use the config/routes
app.use('/', router);

// Set app to listen on port 3000
app.listen(port, () => console.log(`listening on port: ${port}`));
