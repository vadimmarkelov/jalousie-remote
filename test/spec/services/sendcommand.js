'use strict';

describe('Service: sendCommand', function () {

  // load the service's module
  beforeEach(module('jalousieRemoteApp'));

  // instantiate service
  var sendCommand;
  beforeEach(inject(function (_sendCommand_) {
    sendCommand = _sendCommand_;
  }));

  it('should do something', function () {
    expect(!!sendCommand).toBe(true);
  });

});
