var redis = require('redis');
var config = require('./config');
var debug = require('debug')('scraping:redisFactory');

function getRedisClient() {
  var options = {};
  return redis.createClient(config.redisUrl, options);
};

module.exports = {
  getRedisClient: getRedisClient
};

