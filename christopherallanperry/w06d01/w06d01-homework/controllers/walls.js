const Wall = require('../models/wall');

function wallsIndex(req, res){
  Wall.find((err, walls) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ walls: walls });
  });
}

module.exports = {
  index: wallsIndex
};
