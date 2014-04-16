define(['angular'], function (angular) {
	'use strict';

	return angular.module('Common.filters', [])
		.filter('makeURL', function () {
			return function (url) {
				if (url !== null && url.length !== 0) {
					return '<a href="' + url + '" target="_blank" class="icon-external-link"></a>';
				} else {
					return "&nbsp;";
				}
			};
		});
});