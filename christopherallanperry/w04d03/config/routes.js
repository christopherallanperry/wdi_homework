const express     = require('express');
const router      = express.Router();

const yourchubes = require('../controllers/yourchubes');

router.route('/').get((req, res) => res.render('home'));

router.route('/yourchubes')
  .get(yourchubes.index)
  .post(yourchubes.create);
router.route('/yourchubes/new')
  .get(yourchubes.new);
router.route('/yourchubes/:id')
  .get(yourchubes.show)
  .put(yourchubes.update)
  .delete(yourchubes.delete);
router.route('/yourchubes/:id/edit')
  .get(yourchubes.edit);

module.exports = router;
