var client = require('cheerio-httpcli');
var debug = require('debug')('scraping:routes/novels/top/recommend/post');

module.exports = function(req, res, next) {
  var data = [];
  var url;

  if (req.body.ncode) {
    url = 'http://ncode.syosetu.com/' + req.body.ncode + '/';

    client.fetch(url)
      .then(function (result) {
        result.$('.recommend_novel').each(function(index, element){
          data.push(extractRecommendData(result.$, element));
        });
      })
      .catch(function (err) {
        debug(err);
        console.log(err);
      })
      .finally(function () {
        debug(data);
        res.render('novels/top/recommend', { data: { params: req.body } });
      });

  } else {
    res.render('novels/top/recommend', { data: { params: req.body } });
  }
};

function extractRecommendData($, element) {
  var data = {};

  var matches = $(element).find('a').attr('href').match(/\/(n[0-9a-z]+)\//);
  data['ncode'] = matches[1];

  data['url'] = $(element).find('a').attr('href');
  data['title'] = $(element).find('a .reconovel_title').text();

  $(element).find('li').each(function(index, element){
    switch (index) {
      case 0:
        var matches = $(element).text().match(/.+/);
        data['category'] = matches[0];
        break;

      case 1:
        var matches = $(element).text().match(/(.+)\(全(\d+)部\)/);
        data['state'] = matches[1];
        data['pageCount'] = matches[2];
        break;

      case 2:
        var matches = $(element).text().match(/(\d+) user/);
        data['bookmarkCount'] = matches[1];
        break;

      case 3:
        var matches = $(element).text().match(/最終掲載日：(.+)/)
        data['lastPublishedAt'] = matches[1];
    }
  });

  return data;
}

