var redis = require('redis');
var client;

class Redis{
  constructor(){
    client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS
    });
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
