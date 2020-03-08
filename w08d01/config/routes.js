const express  = require('express');
const router   = express.Router();

const cycles    = require('../controllers/cycles');

router.route('/cycles')
  .get(cycles.index)
  .post(cycles.create);
router.route('/cycles/:id')
  .get(cycles.show)
  .patch(cycles.update)
  .put(cycles.update)
  .delete(cycles.delete);

module.exports = router;
