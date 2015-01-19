'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterctrlCtrl
 * @description
 * # RegisterctrlCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, $http, alert) {
    $scope.submit = submit;

		var url = 'http://localhost:3000/register';

		function submit() {
			var user = {
				email: $scope.email,
				password: $scope.password
			};
			$http.post(url, user)
				.success(function(res) {
					alert("info", "Woot", "good");
					authToken.setToken(res.token);
				})
				.error(function(err) {
					alert("warning", "Bad", "is bad");
				});
		};
  });
