/**
 * Share
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/22
 */

require.config({
    baseUrl: '/js/angular',
    paths: {
        angular: '../vendor/angular/angular.min',
        angularRoute: '../vendor/angular-route/angular-route.min',
    },
    shim: {
        angular: { exports: 'angular' },
        angularRoute: ['angular'],
    }
});

require([
    'angular',
    'share/app'
], function (angular, shareApp) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, [shareApp.name]);
    });
});
