var express = require('express');
var router = express.Router();
var debug = require('debug')('scraping:routes:novels');

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('novels/index', { title: 'Express' });
});

router.get('/top/request', require('./novels/top/request/get'));
router.post('/top/request', require('./novels/top/request/post'));
router.get('/top/recommend', require('./novels/top/recommend/get'));

module.exports = router;

