'use strict';

/**
 * @ngdoc service
 * @name jwtApp.auth
 * @description
 * # auth
 * Service in the jwtApp.
 */
angular.module('jwtApp')
  .service('auth', function ($http, API_URL, authToken, $state) {

		function authSuccess(res) {
			authToken.setToken(res.token);
			$state.go('main');
		}

    this.login = function(email, password) {
			var url = API_URL + 'login';
			return $http.post(url, {
					email: email,
					password: password
				}).success(authSuccess);
		};

		this.register = function(email, password) {
			var url = API_URL + 'register';
			return $http.post(url, {
					email: email,
					password: password
				}).success(authSuccess);
		};

  });
