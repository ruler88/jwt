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




		var url = '/';
		var user = {};
		function submit() {
			$http.post(url, user)
				.success(function(res) {
					alert("info", "Woot", "good");
					console.log("good");
				})
				.error(function(err) {
					alert("warning", "Bad", "is bad");
					console.log("bad");
				});
		};
  });
