'use strict';

/**
 * @ngdoc function
 * @name jalousieRemoteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jalousieRemoteApp
 */
angular.module('jalousieRemoteApp')
  .controller('MainCtrl',['$scope', 'userData', 'stats', function ($scope, userData, stats) {
	$scope.userName = userData.author;
	$scope.logged = userData.author !== '';
	$scope.label = "user";
	$scope.lineHeight=30;
	$scope.refreshingStats = true;
	$scope.d3Data = [];
	stats.getStats().then(null, null, function(data){
		if(data) {
			$scope.refreshingStats = false;
			$scope.d3Data=data;
		} else {
			$scope.refreshingStats = true;
		}
	});
  }]);
