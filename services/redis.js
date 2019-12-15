var redis = require('redis');
var client;

class Redis{
  constructor(){
    client = redis.createClient(6385, process.env.REDIS_HOST);
    client.on('connect', function() {
      console.log('Redis client connected');
    });

    client.on('error', function (err) {
      console.log('Something went wrong ' + err);
    });
  }
  getClient(){
    return client;
  }
}

module.exports = Redis;
