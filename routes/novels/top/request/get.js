var models = require('scraping/models');
var debug = require('debug')('scraping:routes/novels/top/request/get');

module.exports = function(req, res, next) {
  var model = new models.NovelsTopRequest(req.session.id);
  model.retrieve(function(page) {
    debug(page);
    res.render('novels/top/request', { data: { params: {}, page: page } });
  });
};

