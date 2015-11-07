var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('novels/index', { title: 'Express' });
});

module.exports = router;

