'use strict';

/**
 * @ngdoc overview
 * @name jalousieRemoteApp
 * @description
 * # jalousieRemoteApp
 *
 * Main module of the application.
 */
angular.module('jalousieRemoteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'jm.i18next',
    'RAFpolyfill'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        resolve: {
          userData: function (authenticate){
            return authenticate.getUserData();
          }
        },
        templateUrl: 'views/main.html'
      })
      .when('/error', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', '$location', function ($rootScope, $location) {

  }])
;
