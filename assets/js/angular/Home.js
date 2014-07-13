/**
 * Home
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/15
 */

require.config({
    baseUrl: '/js/angular',
    paths: {
        underscore: '../vendor/underscore/underscore',
        angular: '../vendor/angular/angular.min',
        angularRoute: '../vendor/angular-route/angular-route.min',
        angularCookies: '../vendor/angular-cookies/angular-cookies.min',

        easeljs: '../vendor/easeljs/lib/easeljs-0.7.1.combined',
        tweenjs: '../vendor/TweenJS/lib/tweenjs-0.5.1.combined',
        //soundjs: '../vendor/SoundJS/lib/soundjs-0.5.2.combined',
        preloadjs: '../vendor/PreloadJS/lib/preloadjs-0.4.1.combined',

        // requirejs-plugins
        async: '../vendor/requirejs-plugins/src/async',
        goog: '../vendor/requirejs-plugins/src/goog',
        propertyParser : '../vendor/requirejs-plugins/src/propertyParser',
        // font: '../vendor/requirejs-plugins/src/font',
        // image: '../vendor/requirejs-plugins/src/image',
        // json: '../vendor/requirejs-plugins/src/json',
        // noext: '../vendor/requirejs-plugins/src/noext',
        // mdown: '../vendor/requirejs-plugins/src/mdown',
        // markdownConverter : '../vendor/requirejs-plugins/lib/Markdown.Converter'
    },
    shim: {
        angular: { exports: 'angular' },
        angularRoute: ['angular'],
        angularCookies: ['angular'],
        easel: { exports: 'createjs' },
        tween: { deps: ['easel'], exports: 'Tween' }
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
