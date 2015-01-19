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

.constant('API_URL', 'http://localhost:3030/');