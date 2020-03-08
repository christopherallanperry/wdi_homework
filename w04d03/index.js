// #########################################
//            Bring in packages           //
// #########################################
const express        = require('express');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const ejsLayouts     = require('express-ejs-layouts');
const methodOverride = require('method-override');
const mongoose       = require('mongoose');

// #########################################
//  Invoke express, set port, id mongoDb  //
// #########################################
const app            = express();
const port           = process.env.PORT || 3000;
const databaseUrl    = 'mongodb://localhost/yourchube';
const router         = require('./config/routes');

// #########################################
//            Connect to mongoDb          //
// #########################################
mongoose.connect(databaseUrl, () => console.log(`Connected to ${databaseUrl}`));

// #########################################
// Set ejs as view engine, set views path //
// #########################################
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// #########################################
//             Set up middleware          //
// #########################################
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(ejsLayouts);
app.use(router);

// #########################################
//    Start app listening on port 3000    //
// #########################################
app.listen(port, () => console.log(`Started on port: ${port}`));
