var Routes = {
  reddit: function(res, req, redisClient){
    redisClient.getClient().get(req.query.name, function (error, result) {
      if (error) {
          console.log(error);
          res.send({status: 'error'})
      }
      res.send({status: 'success', data: JSON.parse(result)})
    });
  }
}

module.exports = Routes;
