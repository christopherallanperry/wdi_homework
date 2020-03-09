const express = require('express');
const router  = express.Router();

const users = require('../controllers/users');
const projects = require('../controllers/projects');

router.route('/users')
  .post(users.create)
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .patch(users.update)
  .delete(users.delete);

router.route('/projects')
  .post(projects.create)
  .get(projects.index);

router.route('/projects/:id')
  .get(projects.show)
  .put(projects.update)
  .patch(projects.update)
  .delete(projects.delete);

module.exports = router;
