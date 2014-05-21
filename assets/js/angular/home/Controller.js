/**
 * Controller
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/15
 */

define(['angular'], function (angular) {
	'use strict';

	return angular.module('Home.controllers', [])

		.controller('HomeController', ['$scope', function ($scope) {

            $scope.name = "HomeController";

		}]);
});
