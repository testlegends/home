/**
 * Home
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/15
 */

require.config({
    baseUrl: '/js/angular',
    paths: {
        angular: '../vendor/angular/angular.min',
        angularRoute: '../vendor/angular-route/angular-route.min'
    },
    shim: {
        angular: { exports: 'angular' },
        angularRoute: ['angular']
    }
});

require([
    'angular',
    'home/app'
], function (angular, homeApp) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, [homeApp.name]);
    });
});
