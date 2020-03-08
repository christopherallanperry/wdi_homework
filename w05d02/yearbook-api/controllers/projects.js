const Project = require('../models/project');

function projectsCreate(req, res) {
  Project.create(req.body.project, (err, project) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!project) return res.status(404).json({ success: false, message: 'Please send the correct information to create a project.' });
    return res.status(201).json(project);
  });
}

function projectsIndex(req, res) {
  Project.find((err, projects) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!projects) return res.status(404).json({ success: false, message: 'No projects found' });
    return res.status(200).json(projects);
  });
}

function projectsShow(req, res) {
  const id = req.params.id;
  Project
    .findById(id)
    .populate(['projects'])
    .exec((err, project) => {
      if (err) return res.status(500).json({ success: false, message: err });
      if (!project) return res.status(404).json({ success: false, message: 'Oops! No projects were found' });
      return res.status(200).json(project);
    });
}

function projectsUpdate(req, res) {
  Project.findByIdAndUpdate(req.params.id, req.body.project, (err, project) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!project) return res.status(404).json({ success: false, message: 'No project found' });
    return res.status(204).json({ success: true });
  });
}

function projectsDelete(req, res) {
  Project.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(500).json({ success: false, message: err });
    return res.status(204).json({ success: true });
  });
}

module.exports = {
  create: projectsCreate,
  index: projectsIndex,
  show: projectsShow,
  update: projectsUpdate,
  delete: projectsDelete
};
