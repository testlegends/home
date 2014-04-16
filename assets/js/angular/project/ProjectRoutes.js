define(['angular', 'project/app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/projects', {
			templateUrl: 'js/angular/project/partials/list.html',
			controller: 'ProjectController'
		});
		$routeProvider.otherwise({redirectTo: '/projects'});
	}]);
});