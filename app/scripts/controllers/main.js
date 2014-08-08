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
	$scope.label = "name";
	$scope.lineHeight=30;
	$scope.d3Data = [
		{name: "markelov.vadim", up: 100, down:10},
		{name: "qwertyu", up: 10, down:100},
		{name: "zxcvb", up: 30, down:30},
		{name: "mmmmmmmmmmmmmmmmmmmm", up: 1000, down:10}
	];
  }]);
