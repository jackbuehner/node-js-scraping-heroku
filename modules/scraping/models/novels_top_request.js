var redis = require('scraping/redis');
var debug = require('debug')('scraping:models:novels_top_request');

module.exports = function NovelsTopRequest(keyPrefix) {
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
    retrieve: function(callback) {
      var client = redis.getRedisClient();
      var key = this.createStoreKey();

      client.get(key, function (err, value) {
        if(err) {
          console.log(err);
          callback(err);
        }
        if (!value) {
          callback(null);
        }
        debug('GET %s -> %s', key, value);

        return callback(JSON.parse(value));
      });
    }
  };
};

