/**
 * NulogyFacepage App
 *
 * @created     :: 2014/02/11
 */


define([
	'angular',
	'angularRoute',
	'angularLoadingBar',
	'common/directives',
	'common/filters',
	'project/MenuFilter',
	'project/ProjectService',
	'project/ProjectController',
], function (angular) {
	'use strict';

	return angular.module('app', [
		'ngRoute',
		'chieffancypants.loadingBar',
		'Common.directives',
		'Common.filters',
		'Project.filters',
		'Project.services',
		'Project.controllers'
	]);
});