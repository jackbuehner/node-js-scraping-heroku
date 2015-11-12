var models = require('scraping/models');

module.exports = function(req, res, next) {
  var model = new models.NovelsTopRequest(req.session.id);
  model.retrieve(function(page) {
    debug(page);
    res.render('novels/top/request', { data: { params: {}, page: page } });
  });
};

