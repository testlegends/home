/**
 * Share App
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/22
 */

define([
    'angular',
    'share/Controller',
    'share/Routes'
], function (angular) {
    'use strict';

    return angular.module('Share', [
        'Share.controllers',
        'Share.routes'
    ]);
});
