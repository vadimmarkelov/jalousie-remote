'use strict';

/**
 * @ngdoc service
 * @name jalousieRemoteApp.log
 * @description
 * # log
 * Factory in the jalousieRemoteApp.
 */
angular.module('jalousieRemoteApp')
  .factory('log',['$http', '$q', '$location', '$rootScope', 'RESTbase', 'logLength', 'requestAnimationFrame', 'stats', function ($http, $q, $location, $rootScope, RESTbase, logLength, requestAnimationFrame, stats) {
    // Service logic
    var httpUri = RESTbase+'cmd?command=getlog',
        logCollection = [],
        def=$q.defer(),
        pageHasBeenActive;
    
    var AFhandler= function() {
      pageHasBeenActive=true;
      requestAnimationFrame(AFhandler);
    };
    AFhandler.call();

    var getNewItems = function (data){
        return data.filter(function(i) {return logCollection.map(function(ii){return ii.id;}).indexOf(i.id) < 0;}).slice(0,logLength);
    };

    var getLog = function(commandCount){

      if(!pageHasBeenActive){
        setTimeout(getLog,500);
      } else {
        pageHasBeenActive=!pageHasBeenActive;
        $http.get(httpUri+(commandCount?('&count='+commandCount):''))
                .success(function (data) {
                  var newItems = getNewItems(data);
                  logCollection = data.slice(0,logLength);
                  if(newItems.length) {
                    stats.refresh();
                    def.notify(newItems);
                  }
                })
                // .error(function(){
                //   var data = [{"currentState":"open","user":"markelov.vadim","time":"2014-07-18T05:40:43.000Z","id":"1405662043"},{"currentState":"close","user":"visoltyski24","time":"2014-07-17T07:45:56.000Z","id":"1405583156"},{"currentState":"close","user":"visoltyski24","time":"2014-07-15T07:28:38.000Z","id":"1405409318"},{"currentState":"open","user":"markelov.vadim","time":"2014-07-11T06:05:41.000Z","id":"1405058741"},{"currentState":"close","user":"visoltyski24","time":"2014-07-10T08:29:02.000Z","id":"1404980942"}];
                //   var newItems = getNewItems(data);
                //   logCollection = data.slice(0,logLength);
                //   if(newItems.length) {
                //     def.notify(newItems);
                //   }
                // })
                ['finally'](function(){
                  setTimeout(getLog,500);
                });
      }

      return def.promise;
    };

    // Public API here
    return {
      getLog: getLog
    };
  }]);
