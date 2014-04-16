/**
 * Services
 *
 * @created     :: 2014/02/11
 */

define(['angular'], function (angular) {
	'use strict';

	return angular.module('Project.services', [])
		.factory('projects', function ($http) {
			return {
				list: function (callback) {
					$http.get('/project').success(callback);
				},
				get: function (callback) {

				}
			};
		});
});