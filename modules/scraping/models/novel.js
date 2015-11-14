var redis = require('scraping/redis');
var debug = require('debug')('scraping:models:novel');

function Novel(keyPrefix) {
  this.keyPrefix = keyPrefix;
  this.expireTime = 24 * 60 * 60;
  this.redisClient = redis.getRedisClient();
};

Novel.prototype.createStoreKey = function(ncode) {
  return this.keyPrefix + ':Novel:' + ncode;
};

Novel.prototype.createFindAllKey = function() {
  return this.keyPrefix + ':Novel:*';
};

Novel.prototype.store = function(data) {
  var key = this.createStoreKey(data.ncode);
  var strData = JSON.stringify(data);

  debug('SETEX %s %s %s', key, this.expireTime, strData);
  this.redisClient.setex(key, this.expireTime, strData);

  return true;
};

Novel.prototype.findByNcode = function(ncode, callback) {
  var key = this.createStoreKey(ncode);

  this.redisClient.get(key, function (err, value) {
    if(err) {
      console.log(err);
      callback(err);
    }
    if (!value) {
      callback(null, null);
    }
    debug('GET %s -> %s', key, value);

    return callback(null, JSON.parse(value));
  });
};

Novel.prototype.findAll = function(callback) {
  var key = this.createFindAllKey();
  var that = this;

  // TODO: Refactoring to resolve callback nest
  this.redisClient.keys(key, function(err, value) {
    if (err) {
      callback(err);
    }
    if (!value) {
      callback(null, null);
    }
    debug('KEYS %s -> %s', key, value);

    that.redisClient.mget(value, function(err, values) {
      if (err) {
        callback(err);
      }
      if (!values) {
        callback(null, null);
      }
      debug('MGET %s -> %s', value, values);

      var novels = [];
      values.forEach(function(str) {
        novels.push(JSON.parse(str));
      });

      callback(null, novels);
    });
  });
};

module.exports = Novel;

