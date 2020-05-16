const express = require('express');
const router  = express.Router();

const celebrities = require('./celebrities');
router.use('/celebrities',celebrities);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});



module.exports = router;
