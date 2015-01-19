'use strict';

angular.module('jwtApp').config(function($urlRouterProvider, $stateProvider, $httpProvider) {
	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	})

	.state('register', {
		url: '/register',
		templateUrl: '/views/register.html',
		controller: 'RegisterCtrl'
	})

	.state('login', {
		url: '/login',
		templateUrl: '/views/login.html',
		controller: 'LoginCtrl'
	})

	.state('jobs', {
		url: '/jobs',
		templateUrl: '/views/jobs.html',
		controller: 'JobsCtrl'
	})

	.state('logout', {
		url: '/logout',
		controller: 'LogoutCtrl'
	});

	$urlRouterProvider.otherwise('/');

	$httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3030/')

.run(function($window) {
		var params = $window.location.search.substring(1);	//get token from google auth

		if(params && $window.opener && $window.opener.location.origin === $window.location.origin) {
			var pair = params.split('=');
			var code = decodeURIComponent(pair[1]);

			$window.opener.postMessage(code, $window.location.origin);
		}
	})
;