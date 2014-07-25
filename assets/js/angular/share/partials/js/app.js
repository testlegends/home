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
        trackr: '../trackr'
    },
    shim: {
        flowtype: ['jquery'],
        trackr: ['jquery']
    }
});

require([
    'jquery',
    'flowtype',
    'trackr'
], function () {
    $(document).ready(function(){
        $('body').flowtype({
            fontRatio: 81
        });

        $.trackr({
            name: 'TestLegends Share',
            dbUrl: '/trackr',
            trackers: [
                { element: '#facebook', name: 'Share on FB',       event: 'click' },
                { element: '#twitter',  name: 'Share on Twitter',  event: 'click' },
                { element: '#email',    name: 'Share with E-mail', event: 'click' }
            ]
        });
    });
});
