'use strict';


angular.module('jwtApp')
  .controller('LoginCtrl', function ($scope, $http, alert, authToken, API_URL) {
		var url = API_URL + 'login';

		$scope.submit = submit;

		function submit() {
			var user = {
				email: $scope.email,
				password: $scope.password
			};
			$http.post(url, user)
				.success(function(res) {
					alert("info", "Woot: ", "you are logged in " + user.email);
					authToken.setToken(res.token);
				})
				.error(function(err) {
					alert("warning", "Bad:  ", err.message);
				});
		};
  });
