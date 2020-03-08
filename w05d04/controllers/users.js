module.exports = {
  index: usersIndex,
  show: usersShow
};

const User = require('../models/user');

// INDEX VIEW
function usersIndex(req, res) {
  User.find({}, (err, user) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json(user);
  });
}

// SHOW VIEW
function usersShow(req, res) {
  const id = req.params.id;

  User
  .findById({ _id: id })
  .exec((err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json({ error: 'No user was found.' });
    return res.status(200).json(user);
  });
}
