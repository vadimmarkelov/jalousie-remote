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
          },
          def=$q.defer();

      var getUserData = function() {
        if(userData.author !== null){
          def.resolve(userData);
          return  def.promise;
        } else {
          if(request) {
            return def.promise;
          } else {
            request = $http.get(httpUri)
              .success(function (data) {
                angular.extend(userData,data);
                def.resolve(userData);
              })
              .error(function (error, status, headers) {
                console.log('Login error');
                request=null;
                $location.path('/error');
                def.reject(error);
              });
            }
            return def.promise;
          }
      };

      return {
        getUserData: getUserData
      };
  }]);
