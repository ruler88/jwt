'use strict';

angular.module('jwtApp').config(function($urlRouterProvider, $stateProvider) {
	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	})

	.state('register', {
		url: '/register',
		templateUrl: '/views/register.html'
	});

	$urlRouterProvider.otherwise('/');
});