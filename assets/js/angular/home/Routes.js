/**
* Routes
*
* @author      :: Jeff Lee
* @created     :: 2014/05/15
*/

define(['angular', 'angularRoute'], function(angular) {
    'use strict';

    return angular.module('Home.routes', ['ngRoute'])

        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
                templateUrl: '/index.html',
                controller: 'HomeController'
            });

            $routeProvider.otherwise({ redirectTo: '/' });

            $locationProvider.html5Mode(true);
        }]);
});
