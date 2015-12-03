var Twitter = require('twitter'),
  config = require('../../config/config.js');
var client = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessKey,
    access_token_secret: config.twitter.accessSecret,
  });

exports.postTweet = function(req, res){
  console.log(req.body.tweet)
  client.post('statuses/update', {status: req.body.tweet}, function(error, tweet, response){
    if(error && error != null) throw error;
    res.json({message: 'Successfully send'});
  });
};
