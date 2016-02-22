'use strict';

angular.module('jalousieRemoteApp')
  .controller('MainPebbleCtrl',['$scope', 'userData', function ($scope, userData) {
	$scope.userName = userData.author;
	$scope.logged = userData.author !== '';
  }]);
