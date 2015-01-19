'use strict';


angular.module('jwtApp')
  .controller('LoginCtrl', function ($scope, $http, alert, $auth) {
		$scope.submit = submit;
		$scope.authenticate = authenticate;

		function submit() {
			$auth.login({
				email: $scope.email,
				password: $scope.password
			}).then(function(res) {
				alert("info", "Woot: ", "you are logged in");
			}, function(err) {
				alert("warning", "Bad:  ", err.message)
			});
		};

		function authenticate(provider) {
				$auth.authenticate(provider)
					.then(function(res) {
						alert("info", "Woot: ", "you are logged in");
					}, function(err) {
						alert("warning", "Bad:  ", err.message)
					});
		}
  });
