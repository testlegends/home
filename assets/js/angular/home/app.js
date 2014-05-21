/**
 * Home App
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/15
 */

define([
    'angular',
    'home/Controller',
    'home/Directives',
    'home/Routes'
], function (angular) {
    'use strict';

    return angular.module('Home', [
        'Home.controllers',
        'Home.directives',
        'Home.routes'
    ]);
});
