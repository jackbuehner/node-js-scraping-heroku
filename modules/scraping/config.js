// Refer: https://github.com/heroku-examples/node-articles-nlp/blob/master/lib/config.js
var debug = require('debug')('scraping:config');

config = {
  // Services
  redisUrl: process.env.REDIS_URI || 'redis://:@127.0.0.1:6379',
  port: int(process.env.PORT) || 5000,

  // Session
  cookieSecret: process.env.COOKIE_SECRET || 'myCookieSecret',
  cookiePath: process.env.COOKIE_PATH || '/',
  cookieMaxAge: process.env.COOKIE_PATH || 1 * 24 * 60 * 60 * 1000,
  cookieSessionKey: process.env.SESSION_KEY || 'sid'
};
debug(config);
module.exports = config;

function bool(str) {
  if (str == void 0) return false;
  return str.toLowerCase() === 'true';
}

function int(str) {
  if (!str) return 0;
  return parseInt(str, 10);
}

function float(str) {
  if (!str) return 0;
  return parseFloat(str, 10);
}

