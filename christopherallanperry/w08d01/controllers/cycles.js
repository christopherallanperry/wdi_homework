module.exports = {
  index: cyclesIndex,
  create: cyclesCreate,
  show: cyclesShow,
  update: cyclesUpdate,
  delete: cyclesDelete
};

const Cycle = require('../models/cycle');

function cyclesIndex(req, res){
  Cycle.find((err, cycles) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json(cycles);
  });
}

function cyclesCreate(req, res){
  const cycle = new Cycle(req.body);
  cycle.save((err, cycle) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(201).json(cycle);
  });
}

function cyclesShow(req, res){
  Cycle
    .findById(req.params.id, (err, cycle) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!cycle) return res.status(404).json({ message: 'Cycle not found.' });
      return res.status(200).json(cycle);
    });
}

function cyclesUpdate(req, res){
  Cycle
  .findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, cycle) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!cycle) return res.status(404).json({ message: 'Cycle not found.' });
    return res.status(200).json(cycle);
  });
}

function cyclesDelete(req, res){
  Cycle.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.sendStatus(204);
  });
}
