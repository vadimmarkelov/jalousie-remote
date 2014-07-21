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
		console.log(newItems);
		Array.prototype.push.apply($scope.commands, newItems);
		Array.prototype.slice.call($scope.commands,0,logLength);
	});


}]);
