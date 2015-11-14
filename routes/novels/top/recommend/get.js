var models = require('scraping/models');
var beautify = require('js-beautify').js_beautify;
var debug = require('debug')('scraping:routes/novels/top/recommend/get');

module.exports = function(req, res, next) {
  var novel = new models.Novel(req.session.id);
  novel.findAll(function(err, novels) {
    res.render('novels/top/recommend', {
      data: {
        params: req.body,
        novels: novels,
        novelsStr: novels ? beautify(JSON.stringify(novels), { indent_size: 2 }) : null
      }
    });
  });
};

