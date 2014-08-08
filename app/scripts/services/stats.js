'use strict';

/**
 * @ngdoc service
 * @name jalousieRemoteApp.stats
 * @description
 * # stats
 * Factory in the jalousieRemoteApp.
 */
angular.module('jalousieRemoteApp')
  .factory('stats', ['RESTbase' function (RESTbase) {
    
    var httpUri = RESTbase+'cmd?command=getstats';

    var getStats = function () {

    };

    // Public API here
    return {
      getStats: getStats
      }
    };
  }]);
