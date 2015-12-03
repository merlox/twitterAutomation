var twitterCtrl = require('../controllers/twitter.server.controller.js');

module.exports = function(app){
  app.route('/api/tweets')
    .post(twitterCtrl.postTweet);
};
