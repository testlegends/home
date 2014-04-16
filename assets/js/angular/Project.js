require.config({
	paths: {
		angular: '../vendor/angular/angular',
		angularRoute: '../vendor/angular-route/angular-route',
		angularLoadingBar: '../vendor/angular-loading-bar/build/loading-bar'
	},
	shim: {
		'angular': { 'exports': 'angular' },
		'angularRoute': ['angular'],
		'angularLoadingBar': ['angular']
	},
	priority: ['angular']
});

require([
	'angular',
	'project/app',
	'project/ProjectRoutes'
], function (angular, app, routes) {
	'use strict';

	angular.element(document).ready(function () {
		angular.bootstrap(document, [app['name']]);
	});
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}