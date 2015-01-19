'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterctrlCtrl
 * @description
 * # RegisterctrlCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, $http, alert, authToken, API_URL) {
    $scope.submit = submit;

		var url = API_URL + 'register';

		function submit() {
			var user = {
				email: $scope.email,
				password: $scope.password
			};
			$http.post(url, user)
				.success(function(res) {
					alert("info", "Woot: ", "you are registered " + user.email);
					authToken.setToken(res.token);
				})
				.error(function(err) {
					alert("warning", "Bad", "is bad");
				});
		};
  });
