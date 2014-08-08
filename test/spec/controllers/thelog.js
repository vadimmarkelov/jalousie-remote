'use strict';

describe('Controller: ThelogCtrl', function () {

  // load the controller's module
  beforeEach(module('jalousieRemoteApp'));

  var ThelogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThelogCtrl = $controller('ThelogCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
