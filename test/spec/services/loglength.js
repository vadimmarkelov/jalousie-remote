'use strict';

describe('Service: logLength', function () {

  // load the service's module
  beforeEach(module('jalousieRemoteApp'));

  // instantiate service
  var logLength;
  beforeEach(inject(function (_logLength_) {
    logLength = _logLength_;
  }));

  it('should do something', function () {
    expect(!!logLength).toBe(true);
  });

});
