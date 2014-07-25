/**
 * Home App
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/15
 */

define([
    'angular',
    'home/Directives'
], function (angular) {
    'use strict';

    return angular.module('Home', [
        'Home.directives'
    ]).config(['$locationProvider', function ($locationProvider) {
        // Need this so $location.search() can work
        $locationProvider.html5Mode(true);
    }]);
});
