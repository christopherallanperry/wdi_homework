module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};

const User = require('../models/user');

function authenticationsRegister(req, res){
  User.create(req.body.user, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong' });
    return res.status(201).json({
      message: `Welcome ${user.username}`,
      user
    });
  });
}

function authenticationsLogin(req, res) {
  // Use the findOne method to extract only a single match from the User model
  // if a match exists - email records SHOULD be unique
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(err);
    if (err) return res.status(500).json({ message: 'Something went wrong'});
    // If no user or wrong password
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'Unauthorised! Go away!'});
    }
    return res.status(200).json({
      message: `Welcome back ${user.username}`,
      user
    });
  });
}
