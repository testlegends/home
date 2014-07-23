/**
* ShareRoutes
*
* @author      :: Jeff Lee
* @created     :: 2014/07/22
*/

define(['angular', 'angularRoute'], function(angular) {
    'use strict';

    return angular.module('Share.routes', ['ngRoute'])

        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider.when('/share', {
                templateUrl: '/js/angular/share/partials/index.html',
                controller: 'ShareController'
            });

            $routeProvider.otherwise({ redirectTo: '/' });

            $locationProvider.html5Mode(true);
        }]);
});
