'use strict';


angular.module('jwtApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert) {

		$http.get('http://localhost:1337/' + 'jobs').success(function(jobs) {
			$scope.jobs = jobs;
		}).error(function(err) {
			alert('warning', "Unable to get jobs", err.message);
		});

  });
