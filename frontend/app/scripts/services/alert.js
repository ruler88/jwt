'use strict';

/**
 * @ngdoc service
 * @name jwtApp.alert
 * @description
 * # alert
 * Service in the jwtApp.
 */
angular.module('jwtApp')
  .service('alert', function ($rootScope, $timeout) {
		return function(type, title, message, timeout) {
			$rootScope.alert = {
				message: message,
				title: title,
				type: type,
				show: true,
				hasBeenShown: true
			};
			var alertTimeout;
			$timeout.cancel(alertTimeout);
			alertTimeout = $timeout(function() {
				$rootScope.alert.show = false;
			}, timeout || 2000);
		};
  });
