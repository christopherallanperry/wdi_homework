var mongoose = require('mongoose');

var ProductSchema = {
  name: String
};

mongoose.model('Product', ProductSchema);
mongoose.connect('mongodb://localhost/taganything');

module.exports = mongoose;
