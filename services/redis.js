const redis = require('redis');
let client;

class Redis{
  constructor(){
    client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS
    });
    client.on('connect', () => {
      console.log('Redis client connected');
    });

    client.on('error', (err) => {
      console.log('Something went wrong ' + err);
    });
  }
  /**
  Return a client to be used for connections
  **/
  getClient(){
    return client;
  }
}

module.exports = Redis;
