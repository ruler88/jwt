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

    this.login = function(email, password) {
			var url = API_URL + 'login';
			return $http.post(url, {
					email: email,
					password: password
				}).success(function(res) {
					authToken.setToken(res.token);
					$state.go('main');
				});
		}

  });
