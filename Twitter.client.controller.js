angular.module('twitter', [
  'angularXml2json',
  'ui.router',
  'ngMaterial',
]);
angular.module('twitter').controller('TwitterCtrl', function($http, ngXml2json){
  twitterCtrl = this;
  twitterCtrl.tweetsSent = [];
  twitterCtrl.sendTweet = function(myTweet){
    $http.post('/api/tweets', {
      tweet: myTweet
    }).then(function(response){
      console.log(response)
      twitterCtrl.response = response.message;
    }, function(error){
      console.log(error)
    });
  };
  //use $interval(function(), 0) for infinite quotes
  twitterCtrl.getRandomQuote = function(){
    console.log('getting quote...')
    $http.get('http://www.stands4.com/services/v2/quotes.php?uid=4606&tokenid=1TyqfHbuSXPN1IHy&searchtype=RANDOM').then(function(response){
      var jsonObject = ngXml2json.parser(response.data);
      twitterCtrl.tweet = jsonObject.results.result.quote+' - '+jsonObject.results.result.author;
      twitterCtrl.tweetsSent.push(twitterCtrl.tweet);
      if((twitterCtrl.tweet).length < 141){
        $http.post('/api/tweets', {
          tweet: twitterCtrl.tweet
        }).then(function(response){
          console.log(response)
        }, function(error){
          console.log(error)
        });
      }else{
        console.log('too long, get another')
      }
    }, function(error){
      console.log(error)
    });
  };
});
