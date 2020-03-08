const Cost = require('../models/cost');
const Renovation = require('../models/renovation');

// INDEX
function costsIndex(req, res) {
  Cost.find({propertyId: req.params.id}, (err, costs) => {
    if (err) return res.render('costs/index', { costs: {}, error: 'Something went wrong.' });
    if (!costs) return res.render('costs/index', { costs: {}, error: 'No cost was found!' });
    return res.render('costs/index', { costs, error: null });
  });
}

// NEW
// function costsNew(req, res) {
//   return res.render('costs/new', { error: null });
// }

function costsNew(req, res) {
  Renovation.findById(req.params.id, (err, renovation) => {
    if (err) return res.render('costs/new', { error: err.message });
    return res.render('costs/new', { error: null, renovation });
  });
}


// CREATE
function costsCreate(req, res) {
  const cost = new Cost(req.body.cost);
  cost.save((err, cost) => {
    if (err) return res.render('costs/index', { costs: null, error: err.message });
    return res.redirect('/costs');
  });
}

// SHOW
function costsShow(req, res) {
  Cost.find({propertyId: req.params.id}, (err, cost) => {
    if (err) return res.render('costs/show', { cost: {}, error: 'Something went wrong.' });
    if (!cost) return res.render('costs/show', { cost: {}, error: 'No cost was found!' });
    return res.render('costs/show', { cost, error: null });
  });
}

// EDIT
function costsEdit(req, res) {
  Cost.findById(req.params.id, (err, cost) => {
    if (err) return res.render('costs/edit', { cost: {}, error: 'Something went wrong.' });
    if (!cost) return res.render('costs/edit', { cost: {}, error: 'No costs were found!' });
    return res.render('costs/edit', { cost, error: null });
  });
}

// UPDATE
function costsUpdate(req, res) {
  Cost.findById(req.params.id, (err, cost) => {
    if (err) return res.render('costs/edit', { cost: {}, error: 'Something went wrong.' });
    if (!cost) return res.render('costs/edit', { cost: {}, error: 'No costs were found!' });

    for (const field in Cost.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.cost[field] !== undefined) {
          cost[field] = req.body.cost[field];
        }
      }
    }

    cost.save((err, cost) => {
      if (err) return res.render('costs/edit', { cost: {}, error: 'Something went wrong.' });
      return res.redirect(`/costs/${cost.propertyId}`);
    });
  });
}

// DELETE
function costsDelete(req, res) {
  Cost.findByIdAndRemove(req.params.id, err => {
    if (err) return res.render('costs/show', { cost: {}, error: 'Something went very wrong.' });
    // Redirect to index.ejs
    return res.redirect('/costs');
  });
}

module.exports = {
  index: costsIndex,
  new: costsNew,
  create: costsCreate,
  show: costsShow,
  edit: costsEdit,
  update: costsUpdate,
  delete: costsDelete
};
