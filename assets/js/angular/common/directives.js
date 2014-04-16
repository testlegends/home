define(['angular'], function (angular) {
	'use strict';

	return angular.module('Common.directives', [])
		.directive('eatClick', function () {
			return function (scope, element) {
				$(element).click(function (event) {
					event.preventDefault();
				});
			};
		});
});