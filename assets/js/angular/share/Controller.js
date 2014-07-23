/**
 * ShareControllers
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/22
 */

define(['angular'], function (angular) {
	'use strict';

	return angular.module('Share.controllers', [])

		.controller('ShareController', ['$scope', '$location', function ($scope, $location) {

            $scope.name = "ShareController";

		}]);
});
