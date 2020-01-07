const Auth = require('../services/auth')

var Routes = {
  reddit: function(res, req, redisClient, oAuthClient){
    // get posts for a specified subreddit
    redisClient.getClient().get(req.query.name, function (error, result) {
      if (error) {
          console.log(error);
          res.send({status: 'error'})
      }
      res.send({status: 'success', data: JSON.parse(result)})
    });
  },
  getAuthUrl: function(res, req, oAuthClient){
    // protected
    if(req.query.key != process.env.PROTECTED){
      res.status(404).json({ status: 'failed' });
      return;
    }
    // return the url for user to connect youtube
    res.send({status: 'success', data: Auth.getAuthUrl(oAuthClient)})
  },
  setToken: function(res, req, redisClient, oAuthClient){
    // protected
    if(req.body.key != process.env.PROTECTED){
      console.log(req.body.key, process.env.PROTECTED)
      res.send({status: 'failed'});
      return;
    }

    // set the oauth code aftering connecting youtube
    let code = req.body.code;
    Auth.setToken(code, redisClient, oAuthClient);
    res.send({status: 'success', message: 'Auth token set if valid'})
  }
}

module.exports = Routes;
