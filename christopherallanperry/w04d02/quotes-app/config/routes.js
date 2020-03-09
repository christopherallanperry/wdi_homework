const express = require('express');
const router  = express.Router();
const quotesController = require('../controllers/quoteController');

// root path
router.get('/', (req, res) => {
  res.redirect(302, '/quotes');
});

router.route('/quotes')
  .get(quotesController.index)
  .post(quotesController.create);

router.route('/quotes/new')
  .get(quotesController.new);

router.route('/quotes/:id')
  .get(quotesController.show)
  .put(quotesController.update)
  .delete(quotesController.delete);

router.route('/quotes/:id/edit')
.get(quotesController.edit);

module.exports = router;
