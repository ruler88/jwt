'use strict';

/**
 * @ngdoc directive
 * @name jwtApp.directive:validatePassword
 * @description
 * # validatePassword
 */
angular.module('jwtApp')
  .directive('validatePassword', function () {
    return {
			require: 'ngModel',
			restrict: 'A',
      link: function postLink(scope, element, attrs, ngModelCtrl) {
        function validatePassword(value) {
					var valid = (value === scope.$eval(attrs.validatePassword));
					ngModelCtrl.$setValidity('equal', valid);
					return valid ? value : undefined;
				}
				ngModelCtrl.$parsers.push(validatePassword);
				ngModelCtrl.$parsers.push(validatePassword);

				scope.$watch(attrs.validatePassword, function() {
					ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
				})
      }
    };
  });
