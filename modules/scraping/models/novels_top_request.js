var redis = require('scraping/redis');
var debug = require('debug')('scraping:redis');

var NovelsTopRequest = function(keyPrefix) {
  var keyPrefix = keyPrefix;
  var expireTime = 24 * 60 * 60;

  return {
    createStoreKey: function() {
      return keyPrefix + ':NovelsTopRequest';
    },
    store: function(data) {
      var client = redis.getRedisClient();
      var key = this.createStoreKey();
      var strData = JSON.stringify(data);
      debug('SETEX %s %s %s', key, expireTime, strData);
      client.setex(key, expireTime, strData);
      return true;
    },
    retrieve: function() {
      var client = redis.getRedisClient();
      var key = this.createStoreKey();
      var value = client.get(key);
      var parsedValue = JSON.parse(value);
      debug('GET %s', key);
      debug(parsedValue);
      return parsedValue;
    }
  };
};

module.exports = NovelsTopRequest;

