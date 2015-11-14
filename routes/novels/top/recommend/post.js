var client = require('cheerio-httpcli');
var models = require('scraping/models');
var html = require('scraping/utils/html');
var beautify = require('js-beautify').js_beautify;
var async = require('async');
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

        var ncodes = [];
        //ncodes.push(recommends[0].ncode);
        //ncodes.push(recommends[1].ncode);
        recommends.forEach(function(recommend) {
          ncodes.push(recommend.ncode);
        });
        scrapeNovels(req.session.id, ncodes);

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

function scrapeNovels(session_id, ncodes) {
  if (!ncodes) {
    return;
  }

  var tasks = [];
  var requested_at = new Date();

  ncodes.forEach(function(ncode) {
    tasks.push(function(callback) {
      var url = 'http://ncode.syosetu.com/novelview/infotop/ncode/' + ncode + '/';

      client.fetch(url)
        .then(function (result) {
          var novelModel = new models.Novel(session_id);

          var novelInfo = html.extractNovelInfo(result.$);
          novelInfo['requested_at'] = requested_at;
          novelInfo['responded_at'] = new Date();

          novelModel.store(novelInfo);
        })
        .catch(function (err) {
          debug('Error occurred. URL:' + url);
          debug(err);
          console.log(err);
        })
        .finally(function () {
          callback(null, null);
        });
    });
  });

  async.series(tasks,
    function done(err, results) {
      if (err) {
        debug(err);
        console.log(err.toString());
        return;
      }
      console.log('series all done.');
    });
}

