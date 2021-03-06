process.env.NODE_PATH = __dirname + '/modules';
require('module').Module._initPaths();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var sessions = require('scraping/sessions');
var config = require('scraping/config');

var novels = require('./routes/novels');
var routes = require('./routes');

var app = express();

app.set('port', (config.port));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions(config));

app.use('/novels', novels);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.message);
    console.log(err.stack);
    //res.status(err.status || 500);
    //res.render('error', {
    //  message: err.message,
    //  error: err
    //});
  });
}

// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.log(err.message);
    //res.status(err.status || 500);
    //res.render('error', {
    //  message: err.message,
    //  error: {}
    //});
  });
}

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

