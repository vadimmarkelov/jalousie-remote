'use strict';

describe('Service: RESTbase', function () {

  // load the service's module
  beforeEach(module('jalousieRemoteApp'));

  // instantiate service
  var RESTbase;
  beforeEach(inject(function (_RESTbase_) {
    RESTbase = _RESTbase_;
  }));

  it('should do something', function () {
    expect(!!RESTbase).toBe(true);
  });

});
