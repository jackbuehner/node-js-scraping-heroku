var express = require('express');
var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('novels/index', { title: 'Express' });
});

router.get('/top/request', function(req, res, next) {
  res.render('novels/top/request', { data: { params: {} } });
});

router.post('/top/request', function(req, res, next) {
  var url;
  var result = {};

  if (req.body.ncode) {
    url = 'http://ncode.syosetu.com/' + req.body.ncode + '/';
  }

  if (url) {
    request({url: url}, function(error, response, body) {
      // Async
      if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
        result['url'] = response.request.href;
        result['title'] = $("title").text();
        console.log(result);

      } else {
        console.log("--------------------------------------------------");
        if (error && "code" in error) {
          console.log("Error Code:" + error.code);
        }
        if (error && "errno" in error) {
          console.log("Error No:" + error.errno);
        }
        if (error && "syscall" in error) {
          console.log("Error Syscall:" + error.syscall);
        }
        if (response && "statusCode" in response) {
          console.log("Status Code:" +  response.statusCode);
        }
      }
    });
  }

  res.render('novels/top/request', { data: { params: req.body, page: result } });
});


module.exports = router;

