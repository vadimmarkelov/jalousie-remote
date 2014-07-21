'use strict';

/**
 * @ngdoc directive
 * @name jalousieRemoteApp.directive:commands
 * @description
 * # commands
 */
angular.module('jalousieRemoteApp')
  .directive('commands',['$rootScope', '$filter', 'authenticate', 'sendCommand', function ($rootScope, $filter, authenticate, sendCommand) {
    return {
      template: '<div>'+
				'	<fieldset class="btn-group cmd-buttons" ng-disabled="((url==\'#\') || inProgress)">'+
				'		<button href="#" class="btn btn-success cmd-button" role="button" data-cmd="open"><i class="fa fa-arrow-up"></i> <span ng-i18next="commands.open"></span></button>'+
				'		<button href="#" class="btn btn-warning cmd-button" role="button" data-cmd="close"><span ng-i18next="commands.close"></span> <i class="fa fa-arrow-down"></i></button>'+
				'	</fieldset>'+
				'</div>',
      restrict: 'E',
      replace: true,
      scope: {
		url: '&',
		caption: '&'
      },
      link: function postLink(scope, element, attrs) {
			scope.url='#';
			scope.caption='messages.loading';
			scope.inProgress=false;

			element.on('click','.cmd-button', function(){
				var cmd=angular.element(this).data('cmd');
				scope.inProgress=true;
				sendCommand.send(cmd).then(function(){
					scope.inProgress=false;
				});
			});

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
