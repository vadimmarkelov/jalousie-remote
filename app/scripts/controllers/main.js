'use strict';

/**
 * @ngdoc function
 * @name jalousieRemoteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jalousieRemoteApp
 */
angular.module('jalousieRemoteApp')
  .controller('MainCtrl',['$scope', 'userData', function ($scope, userData) {
	console.log(userData);
	$scope.userName = userData.author;
	$scope.logged = userData.author !== '';
  }]);
