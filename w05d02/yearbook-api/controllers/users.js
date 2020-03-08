const User = require('../models/user');

function usersCreate(req, res) {
  User.create(req.body.user, (err, user) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!user) return res.status(404).json({ success: false, message: 'Please send the correct information to create a user.' });
    return res.status(201).json(user);
  });
}

function usersIndex(req, res) {
  User.find((err, users) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!users) return res.status(404).json({ success: false, message: 'No users found' });
    return res.status(200).json(users);
  });
}

function usersShow(req, res) {
  const id = req.params.id;
  User
    .findById(id)
    .populate(['projects'])
    .exec((err, user) => {
      if (err) return res.status(500).json({ success: false, message: err });
      if (!user) return res.status(404).json({ success: false, message: 'Oops! No users were found' });
      return res.status(200).json(user);
    });
}

function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, (err, user) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!user) return res.status(404).json({ success: false, message: 'No user found' });
    return res.status(204).json({ success: true });
  });
}

function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(500).json({ success: false, message: err });
    return res.status(204).json({ success: true });
  });
}

module.exports = {
  create: usersCreate,
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
