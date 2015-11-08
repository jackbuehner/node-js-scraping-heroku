var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);
var debug = require('debug')('scraping:sessions');

module.exports = function Sessions(config) {
  var storeOptions = { url: config.redisUrl };
  var store = new RedisStore(storeOptions);
  debug(storeOptions);

  var sessionOptions = {
    key: config.cookieSessionKey,
    secret: config.cookieSecret,
    store: store,
    cookie: {
      path: config.cookiePath,
      maxAge: config.cookieMaxAge
    },
    resave: true,
    saveUninitialized: true
  };
  debug(sessionOptions);
  return expressSession(sessionOptions);
};

