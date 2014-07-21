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
          request = null,
          userData= {
            author: null,
            //author: 'Vadim',
            url: '#'
          };

      var getUserData = function() {
        if(userData.author !== null){
          var def=$q.defer();
          def.resolve(userData);
          return  def.promise;
        } else {
          if(request) {
            return request;
          } else {
            request = $http.get(httpUri)
              .success(function (data) {
                angular.extend(userData,data);
                return userData;
              })
              .error(function (error, status, headers) {
                console.log('Login error');
                request=null;
                $location.path('/error');
                return error;
              });
            }
            return request;
          }
      };

      return {
        getUserData: getUserData
      };
  }]);
