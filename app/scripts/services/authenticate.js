'use strict';

/**
 * @ngdoc service
 * @name jalousieRemoteApp.authenticate
 * @description
 * # authenticate
 * Factory in the jalousieRemoteApp.
 */
angular.module('jalousieRemoteApp')
  .factory('authenticate',['$http', '$q', '$location', '$rootScope', 'RESTbase', function ($http, $q, $location, $rootScope, RESTbase) {
      
      var httpUri = RESTbase+'login',
          userData= {
            author: null,
            url: '#'
          };

      var getUserData = function() {
        if(userData.author){
          return  $q.defer().resolve(userData);
        } else {
          return $http.get(httpUri).
            success(function (data) {
              angular.extend(userData,data);
              return userData;
            }).
            error(function (error, status, headers) {
              console.log('Login error');
              return error;
            });
          }
      };

      return {
        getUserData: getUserData
      };
  }]);
