'use strict';

describe('Service: CommandServices', function () {

  // load the service's module
  beforeEach(module('jalousieRemoteApp'));

  // instantiate service
  var CommandServices;
  beforeEach(inject(function (_CommandServices_) {
    CommandServices = _CommandServices_;
  }));

  it('should do something', function () {
    expect(!!CommandServices).toBe(true);
  });

});
