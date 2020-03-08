const Yourchube = require('../models/yourchube');

function yourchubeIndex(req, res) {
  Yourchube.find({}, (err, yourchube) => {
    if (err) return console.log(err);
    return res.render('yourchubes/index', { yourchube });
  });
}

function yourchubeNew(req, res) {
  return res.render('yourchubes/new');
}

function yourchubeShow(req, res) {
  Yourchube.findById(req.params.id, (err, yourchube) => {
    if (err) return console.log(err);
    if (!yourchube) return console.log('Your selected YourChube was not found');
    return res.render('yourchubes/show', { yourchube });
  });
}

function yourchubeCreate(req, res) {
  console.log('yourchubeCreate');
  const yourchube = new Yourchube(req.body.yourchube);
  yourchube.save((err, yourchube) => {
    if (err) return console.log(err);
    console.log('I\'m here');
    return res.redirect(302, `/yourchubes/${yourchube._id}`);
  });
}

function yourchubeEdit(req, res) {
  Yourchube.findById(req.params.id, (err, yourchube) => {
    if (err) return console.log(err);
    if (!yourchube) return console.log('Your selected YourChube was not found');
    return res.render('yourchubes/edit', { yourchube });
  });
}

function yourchubeUpdate(req, res) {
  Yourchube.findByIdAndUpdate(req.params.id, req.body.Yourchube, { new: true }, (err, yourchube) => {
    if (err) return console.log(err);
    if (!yourchube) return console.log('Your selected YourChube was not found');
    return res.redirect(302, `/yourchubes/${Yourchube._id}`);
  });
}

function yourchubeDelete(req, res) {
  Yourchube.findByIdAndRemove(req.params.id, err => {
    if (err) return console.log(err);
    return res.redirect(302, '/yourchubes');
  });
}

module.exports = {
  index: yourchubeIndex,
  new: yourchubeNew,
  show: yourchubeShow,
  create: yourchubeCreate,
  edit: yourchubeEdit,
  update: yourchubeUpdate,
  delete: yourchubeDelete
};
