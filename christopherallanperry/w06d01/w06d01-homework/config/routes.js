const express = require('express');
const router  = express.Router();

const staticsController = require('../controllers/statics');
const camerasController = require('../controllers/walls');

router.route('/')
  .get(staticsController.home);

router.route('/walls')
  .get(camerasController.index);

module.exports = router;
