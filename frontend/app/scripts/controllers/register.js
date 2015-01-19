'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterctrlCtrl
 * @description
 * # RegisterctrlCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, alert, auth) {
    $scope.submit = submit;

		function submit() {
			auth.register($scope.email, $scope.password)
				.success(function(res) {
					alert("info", "Woot: ", "you are registered");
				})
				.error(function(err) {
					alert("warning", "Bad", "is bad");
				});
		};
  });
