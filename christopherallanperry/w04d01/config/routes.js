const express = require('express');
const router = express.Router();

router.get('/',        (req, res) => {
  return res.render('index', { title: 'Chris\'s Guitars' });
});

router.get('/gallery',   (req, res) => {
  return res.render('gallery', { title: 'Guitar Gallery' });
});

router.get('/repairs', (req, res) => {
  return res.render('repairs', { title: 'Instrument Repairs' });
});

module.exports = router;
