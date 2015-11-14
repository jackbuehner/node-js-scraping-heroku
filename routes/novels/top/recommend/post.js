var client = require('cheerio-httpcli');
var models = require('scraping/models');
var html = require('scraping/utils/html');
var beautify = require('js-beautify').js_beautify;
var debug = require('debug')('scraping:routes/novels/top/recommend/post');

module.exports = function(req, res, next) {
  var recommends = [];
  var url;

  if (req.body.ncode) {
    url = 'http://ncode.syosetu.com/' + req.body.ncode + '/';

    client.fetch(url)
      .then(function (result) {
        result.$('.recommend_novel').each(function(index, element){
          recommends.push(html.extractRecommend(result.$, element));
        });
      })
      .catch(function (err) {
        debug(err);
        console.log(err);
      })
      .finally(function () {
        debug(recommends);

        //var novel = new models.Novel(req.session.id);
        //novel.store(recommends[0]);

        res.render('novels/top/recommend',
          {
            data: {
              params: req.body,
              recommends: recommends,
              recommendsStr: recommends ? beautify(JSON.stringify(recommends), { indent_size: 2 }) : null
            }
          });
      });
  } else {
    res.render('novels/top/recommend', { data: { params: req.body } });
  }
};

