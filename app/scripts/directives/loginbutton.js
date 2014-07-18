'use strict';

/**
 * @ngdoc directive
 * @name jalousieRemoteApp.directive:loginButton
 * @description
 * # loginButton
 */
angular.module('jalousieRemoteApp')
  .directive('loginButton',['$rootScope', '$filter', 'authenticate', function ($rootScope, $filter, authenticate) {
    return {
      template: '<a ng-href="{{url}}" ng-i18next="{{caption}}"></a>',
      restrict: 'E',
      replace: true,
      scope: {
		url: '&',
		caption: '&'
      },
      link: function postLink(scope, element, attrs) {
			scope.url='#';
			scope.caption='messages.loading';
			authenticate.getUserData().then(
				function(userData){
					if(userData.author) {
						scope.caption='authenticate.logout';
					} else {
						scope.caption='authenticate.login';
					}
					scope.url=userData.url;
				},
				function(errorData){
					scope.caption='authenticate.login';
					scope.url='#';
				});
		}
	};
}]);
