'use strict';

describe('Controller: LoggeduserCtrl', function () {

  // load the controller's module
  beforeEach(module('jalousieRemoteApp'));

  var LoggeduserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoggeduserCtrl = $controller('LoggeduserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
