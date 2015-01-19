'use strict';


angular.module('jwtApp')
  .controller('LoginCtrl', function ($scope, $http, alert, auth) {
		$scope.submit = submit;

		function submit() {
			auth.login($scope.email, $scope.password)
				.success(function(res) {
					alert("info", "Woot: ", "you are logged in");
				})
				.error(function(err) {
					alert("warning", "Bad:  ", err.message);
				});
		};
  });
