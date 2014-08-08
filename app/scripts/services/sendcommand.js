'use strict';

/**
 * @ngdoc service
 * @name jalousieRemoteApp.sendCommand
 * @description
 * # sendCommand
 * Factory in the jalousieRemoteApp.
 */
angular.module('jalousieRemoteApp')
  .factory('sendCommand',['$http', '$q', 'RESTbase', function ($http, $q, RESTbase) {

    var httpUri = RESTbase+'cmd?command=';
    
    var send = function(command){
      var def=$q.defer();
      $http.get(httpUri+command).success(function (data) {
                def.resolve(data);
              });
      return def.promise;
    };

    return {
      send: send
    };
  }]);
