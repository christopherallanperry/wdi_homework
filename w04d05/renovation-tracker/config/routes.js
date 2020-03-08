const express = require('express');
const router = express.Router();

const renovations = require('../controllers/renovations');
const costs = require('../controllers/costs');

router.route('/').get((req, res) => res.render('home'));

router.route('/renovations')
  .get(renovations.index)
  .post(renovations.create);
router.route('/renovations/new')
  .get(renovations.new);
router.route('/renovations/:id')
  .get(renovations.show)
  .put(renovations.update)
  .delete(renovations.delete);
router.route('/renovations/:id/edit')
  .get(renovations.edit);

router.route('/costs')
  // .get(costs.index)
  .post(costs.create);
router.route('/costs/:id/new')
  .get(costs.new);
router.route('/renovations/:id/costs')
  .get(costs.index);
router.route('/costs/:id')
  .get(costs.show)
  .put(costs.update)
  .delete(costs.delete);
router.route('/costs/:id/edit')
  .get(costs.edit);

module.exports = router;
