'use strict';

/**
 * @ngdoc service
 * @name jalousieRemoteApp.stats
 * @description
 * # stats
 * Factory in the jalousieRemoteApp.
 */
angular.module('jalousieRemoteApp')
  .factory('stats', ['$http', '$q', 'RESTbase', function ($http, $q, RESTbase) {
    
    var httpUri = RESTbase+'cmd?command=getstats',
        def=$q.defer();

    var fetchStats = function () {
        def.notify();
        $http.get(httpUri)
                .success(function (data) {
                    def.notify(data);
                });
    };

    var refresh = function () {
      fetchStats();
    };

    // Public API here
    return {
      getStats: function(){return def.promise;},
      refresh: refresh
      };
    }
  ]);
