'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:HeaderctrlCtrl
 * @description
 * # HeaderctrlCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('HeaderCtrl', function ($scope, $auth) {
		$scope.isAuthenticated = $auth.isAuthenticated;
  });
