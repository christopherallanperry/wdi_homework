const Renovation = require('../models/renovation');

// INDEX
function renovationsIndex(req, res) {
  Renovation.find({}, (err, renovations) => {
    if (err) return res.render('renovations/index', { renovations: null, error: 'Something went wrong' });
    return res.render('renovations/index', { renovations });
  });
}

// NEW
function renovationsNew(req, res) {
  return res.render('renovations/new', { error: null });
}

// CREATE
function renovationsCreate(req, res) {
  const renovation = new Renovation(req.body.renovation);
  renovation.save((err, renovation) => {
    if (err) return res.render('renovations/index', { renovations: null, error: err.message });
    return res.redirect('/renovations');
  });
}

// SHOW
function renovationsShow(req, res) {
  Renovation.findById(req.params.id, (err, renovation) => {
    if (err) return res.render('renovations/show', { renovation: {}, error: 'Something went wrong.' });
    if (!renovation) return res.render('renovations/show', { renovation: {}, error: 'No renovation was found!' });
    return res.render('renovations/show', { renovation, error: null });
  });
}

// EDIT
function renovationsEdit(req, res) {
  Renovation.findById(req.params.id, (err, renovation) => {
    if (err) return res.render('renovations/edit', { renovation: {}, error: 'Something went wrong.' });
    if (!renovation) return res.render('renovations/edit', { renovation: {}, error: 'No renovation was found!' });
    return res.render('renovations/edit', { renovation, error: null });
  });
}

// UPDATE
function renovationsUpdate(req, res) {
  Renovation.findById(req.params.id, (err, renovation) => {
    if (err) return res.render('renovations/edit', { renovation: {}, error: 'Something went wrong.' });
    if (!renovation) return res.render('renovations/edit', { renovation: {}, error: 'No renovation was found!' });

    for (const field in Renovation.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.renovation[field] !== undefined) {
          renovation[field] = req.body.renovation[field];
        }
      }
    }

    renovation.save((err, renovation) => {
      if (err) return res.render('renovations/edit', { renovation: {}, error: 'Something went wrong.' });
      return res.redirect(`/renovations/${renovation._id}`);
    });
  });
}

// DELETE
function renovationsDelete(req, res) {
  Renovation.findByIdAndRemove(req.params.id, err => {
    if (err) return res.render('renovations/show', { renovation: {}, error: 'Something went wrong.' });
    return res.redirect('/renovations');
  });
}

module.exports = {
  index: renovationsIndex,
  new: renovationsNew,
  create: renovationsCreate,
  show: renovationsShow,
  edit: renovationsEdit,
  update: renovationsUpdate,
  delete: renovationsDelete
};
