/**
 * Script
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/15
 */

require.config({
    baseUrl: '/js/angular',
    paths: {
        jquery: '../vendor/jquery/dist/jquery.min',
        flowtype: '../vendor/FlowType.JS/flowtype',
        fullpage: '../vendor/fullpage.js/jquery.fullPage.min',
        //slimscroll: '../vendor/jquery.slimscroll/jquery.slimscroll.min',
        //underscore: '../vendor/underscore/underscore',

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
        flowtype: ['jquery'],
        fullpage: ['jquery'],
        //fullpagejs: ['jquery', 'slimscroll']
    },
    priority: ['jquery']
});

require([
    'jquery',
    'flowtype',
    'fullpage'
], function () {
    $(document).ready(function(){
        $('body').flowtype({
            fontRatio: 81
        });

        var dir = 'down';
        $('#fullpage').fullpage({
            easing: 'linear',
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['Home', 'Demo', 'Customize', 'Track', 'Publish'],
            //anchors: ['home', 'demo', 'customize', 'track', 'publish'],
            scrollingSpeed: 500,
            css3: true,
            resize: false,

            onLeave: function (index, nextIndex, direction) {
                if (index === 1) {
                    dir = 'down';
                } else if (index === 2 && direction === 'up') {
                    dir = 'up';
                }
            },
            afterLoad: function (anchor, index) {
                if (index === 2 && dir === 'down') {
                    $('#pageTwo .sidebar').animate({
                        left: '0'
                    }, 500);
                } else if (index === 1 && dir === 'up') {
                    $('#pageTwo .sidebar').animate({
                        left: '-22%'
                    }, 500);
                }
            }
        });
    });
});
