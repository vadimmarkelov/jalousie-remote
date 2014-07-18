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
    'jm.i18next'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/loggeduser', {
        templateUrl: 'views/loggeduser.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', '$location', function ($rootScope, $location) {

  }])
;
