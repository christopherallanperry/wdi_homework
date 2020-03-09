var mongoose = require('./connection.js');

var seedData = require('./seed.json');

var Product = mongoose.model('Product');

Product.remove().then(function() {
  Product.create(seedData).then(function() {
    process.exit();
  });
});
