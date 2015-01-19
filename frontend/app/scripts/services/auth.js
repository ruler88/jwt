'use strict';

/**
 * @ngdoc service
 * @name jwtApp.auth
 * @description
 * # auth
 * Service in the jwtApp.
 */
angular.module('jwtApp')
  .service('auth', function ($http, API_URL, authToken, $state, $window) {

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

		var clientId = '892597316999-9m2ppfqrfarh1unmcq68d0i0isjmn58r.apps.googleusercontent.com';
		var authParams = [];
		authParams.push('response_type=code');
		authParams.push('client_id=' + clientId);
		authParams.push('redirect_uri=' + $window.location.origin);
		authParams.push('scope=profile email');

		this.googleAuth = function() {
			var url = "https://accounts.google.com/o/oauth2/auth?" + authParams.join('&');
			var options = "width=500, height=500, left=" + ($window.outerWidth-500)/2 +
				", top=" + ($window.outerHeight-500)/2.5;

			var popup = $window.open(url, '', options);
			$window.focus();
			$window.addEventListener('message', function(event) {
				if(event.origin === $window.location.origin) {
					var code = event.data;
					popup.close();

					$http.post(API_URL + 'auth/google', {
						code: code,
						redirectUri: $window.location.origin,
						clientId: clientId
					});
				}
			});
		};

  });
