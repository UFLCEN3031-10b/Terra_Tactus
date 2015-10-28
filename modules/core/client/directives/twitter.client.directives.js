'use strict';

angular.module('core')
  .directive('twitterTimeline', function() {
  return {
       restrict: 'E',
       template: '<a class="twitter-timeline" href="https://twitter.com/TerraTactus" data-widget-id="658510925733883904">Tweets by @TerraTactus</a>',
       link: function(scope, element, attrs) {

      function run() {
          function twit(d,s,id) {
            var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
            if (!d.getElementById(id)) {
              js=d.createElement(s);
              js.id=id;
              js.src=p+"://platform.twitter.com/widgets.js";
              fjs.parentNode.insertBefore(js,fjs);
            }
          }
          twit(document,"script","twitter-wjs");
          console.log('run script');
      }

      run();

      //reload's the twitter feed.. does cause an error TODO find out why...
      if (typeof twttr !== 'undefined') {
        twttr.widgets.load();
      }


       }
     };
  });
