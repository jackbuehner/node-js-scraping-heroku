module.exports = function(req, res, next) {
  res.render('novels/top/recommend', { data: { params: req.body } });
};

