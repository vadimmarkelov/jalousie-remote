'use strict';

/**
 * @ngdoc function
 * @name jalousieRemoteApp.controller:ThelogCtrl
 * @description
 * # ThelogCtrl
 * Controller of the jalousieRemoteApp
 */
angular.module('jalousieRemoteApp')
  .controller('ThelogCtrl', ['$scope', 'log', 'logLength', function ($scope, log, logLength) {

	$scope.commands=[];

	log.getLog().then(null, null, function(newItems){
		$scope.commands.unshift.apply($scope.commands, newItems);
		$scope.commands.length = logLength;
	});


}]);
