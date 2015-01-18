'use strict';

describe('Controller: RegisterctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('jwtApp'));

  var RegisterctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisterctrlCtrl = $controller('RegisterctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
