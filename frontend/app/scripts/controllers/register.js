'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterctrlCtrl
 * @description
 * # RegisterctrlCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, alert, $auth) {
    $scope.submit = submit;

		function submit() {
			$auth.signup({
				email: $scope.email,
				password: $scope.password
			})
				.then(function(res) {
					alert("info", "Woot: ", "you are registered");
				})
				.catch(function(err) {
					alert("warning", "Bad", "is bad");
				});
		};
  });
