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
        fullpage: '../vendor/fullpage.js/jquery.fullPage',
        debounce: '../vendor/jquery-throttle-debounce/jquery.ba-throttle-debounce.min',
        trackr: '../trackr'
        //slimscroll: '../vendor/jquery.slimscroll/jquery.slimscroll.min'
    },
    shim: {
        flowtype: ['jquery'],
        fullpage: ['jquery', 'trackr'],
        debounce: ['jquery'],
        trackr: ['jquery', 'debounce']
        //fullpage: ['jquery', 'slimscroll']
    },
    priority: ['jquery']
});

require([
    'jquery',
    'flowtype',
    'fullpage',
    'debounce',
    'trackr'
], function () {
    $(document).ready(function(){
        $('body').flowtype({
            fontRatio: 81
        });

        var dir = null;
        $('#fullpage').fullpage({
            easing: 'linear',
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['Home', 'Demo', 'Customize', 'Track', 'Publish', 'Sign Up'],
            // anchors: ['home', 'demo', 'customize', 'track', 'publish', 'signup'],
            scrollingSpeed: 500,
            css3: true,
            resize: false,

            onLeave: function (index, nextIndex, direction) {
                dir = direction;
                if (index === 1 && nextIndex === 2 && dir === 'down') {
                    $('#pageTwo .sidebar').animate({
                        left: '-22%'
                    }, 0);
                } else if (index === 6 && nextIndex === 5 && dir === 'up') {
                    $('#pageFive .sidebar').animate({
                        left: '-22%'
                    }, 0);
                }

                if (nextIndex === 1 || nextIndex === 6) {
                    $('#follow').show();
                } else {
                    $('#follow').hide();
                }

                if (nextIndex === 2) {
                    $('#EpicGame').show();
                }
            },
            afterLoad: function (anchor, index) {
                if (index === 2 && dir === 'down')  {
                    $('#pageTwo .sidebar').animate({
                        left: '0'
                    }, 500);
                } else  if (index === 5 && dir === 'up') {
                    $('#pageFive .sidebar').animate({
                        left: '0'
                    }, 500);
                }

                if (index === 3) {
                    $('#EpicGame').hide();
                }
            }
        });

        $.trackr({
            name: 'TestLegends Home',
            dbUrl: '/trackr',
            trackers: [
                // { element: '#pageOne',   event: 'viewport' },
                // { element: '#pageTwo',   event: 'viewport' },
                // { element: '#pageThree', event: 'viewport' },
                // { element: '#pageFour',  event: 'viewport' },
                // { element: '#pageFive',  event: 'viewport' },
                // { element: '#pageSix',  event: 'viewport' },
                { element: '.sel1, .sel1a', event: 'mouseenter' },
                { element: '.sel2, .sel2a', event: 'mouseenter' },
                { element: '.sel3', event: 'mouseenter' },
                { element: '#join', event: 'click' }, // Join in page 1
                { element: '#join', event: 'keyup' }, // Join in page 1
                { element: '.join_on_sidebar.showJoinBox.pageTwo', event: 'click' },
                { element: '.join_on_sidebar.submitJoin.pageTwo', event: 'click' },
                { element: '.join_on_sidebar.submitJoin.pageTwo', event: 'keyup' },
                { element: '.join_on_sidebar.showJoinBox.pageThree', event: 'click' },
                { element: '.join_on_sidebar.submitJoin.pageThree', event: 'click' },
                { element: '.join_on_sidebar.submitJoin.pageThree', event: 'keyup' },
                { element: '.join_on_sidebar.showJoinBox.pageFour', event: 'click' },
                { element: '.join_on_sidebar.submitJoin.pageFour', event: 'click' },
                { element: '.join_on_sidebar.submitJoin.pageFour', event: 'keyup' },
                { element: '.join_on_sidebar.showJoinBox.pageFive', event: 'click' },
                { element: '.join_on_sidebar.submitJoin.pageFive', event: 'click' },
                { element: '.join_on_sidebar.submitJoin.pageFive', event: 'keyup' },
                { element: '#signup button', event: 'click' }, // Join in page 6
                { element: '#signup button', event: 'keyup' }, // Join in page 6
                { element: '#demo_button', event: 'click' },
                { element: '#vocabulary button', event: 'click' },
                { element: '#physics button', event: 'click' },
                { element: '#follow button:first', event: 'click' }, // Follow on FB
                { element: '#follow button:last', event: 'click' }, // Follow on Twitter
                { url: '/adventurers',   event: 'ajax'}
            ]
        });
    });
});
