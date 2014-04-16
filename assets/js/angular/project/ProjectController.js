/**
 * Controllers
 *
 * @created     :: 2014/02/11
 */

define(['angular', 'project/ProjectService'], function (angular) {
	'use strict';

	return angular.module('Project.controllers', ['Project.services'])

		.controller('ProjectController', ['$scope', 'projects', function ($scope, projects) {

			projects.list(function (data) {
				$scope.projects = data;
			});

			$scope.menus = [
				{
					name : 'Category',
					items : ['PHP', 'CakePHP', 'WordPress', 'JavaScript', 'AngularJS', 'Java', 'Twitter Bootstrap']
				},
				{
					name : 'Purpose',
					items : ['Skule', 'Non-Profit', 'Work', 'Personal']
				},
				{
					name : 'Year',
					items : [2013, 2012, 2011, 2010]
				},
				{
					name : 'Status',
					items : ['Planning', 'In Progress', 'Finished', 'Abandoned']
				}
			];

			// Default project order predicate
			$scope.orderPredicate = 'name';

			$scope.filterPredicate = {
				name: '',
				item: ''
			};

			$scope.updateFilter = function (name, item) {
				$scope.filterPredicate.name = name;
				$scope.filterPredicate.item = item;
			};

		}]);
});
