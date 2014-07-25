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
        trackr: '../trackr'
        //debounce: '../vendor/jquery-throttle-debounce/jquery.ba-throttle-debounce.min',
        //slimscroll: '../vendor/jquery.slimscroll/jquery.slimscroll.min'
    },
    shim: {
        flowtype: ['jquery'],
        fullpage: ['jquery', 'trackr'],
        trackr: ['jquery']
        //trackr: ['jquery', 'debounce']
        //fullpage: ['jquery', 'slimscroll']
    },
    priority: ['jquery']
});

require([
    'jquery',
    'flowtype',
    'fullpage',
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

                if (index === 1 || index === 6) {
                    $('.shade').fadeOut();
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

                if (index === 1 || index === 6) {
                    $('.shade').fadeIn();
                }

                if (index === 3) {
                    $('#EpicGame').hide();
                }
            }
        });

        $.trackr({
            name: 'TestLegends Home',
            dbUrl: '/trackr',
            pageWaitTime: 8000,
            trackers: [
                // { element: '#pageOne',   event: 'viewport' },
                // { element: '#pageTwo',   event: 'viewport' },
                // { element: '#pageThree', event: 'viewport' },
                // { element: '#pageFour',  event: 'viewport' },
                // { element: '#pageFive',  event: 'viewport' },
                // { element: '#pageSix',  event: 'viewport' },
                { element: '#pageOne button',            event: 'click', condition: { notEmpty: '#pageOne input[type=email]' } }, // Join in page 1
                { element: '#pageOne input[type=email]', event: 'keyup', condition: { notEmpty: '#pageOne input[type=email]' } }, // Join in page 1
                { element: '#pageSix button',            event: 'click', condition: { notEmpty: '#pageSix input[type=email]' } }, // Join in page 6
                { element: '#pageSix input[type=email]', event: 'keyup', condition: { notEmpty: '#pageSix input[type=email]' } }, // Join in page 6
                { element: '.showJoinBox.pageTwo',   event: 'click' },
                { element: '.showJoinBox.pageThree', event: 'click' },
                { element: '.showJoinBox.pageFour',  event: 'click' },
                { element: '.showJoinBox.pageFive',  event: 'click' },
                { element: '.submitJoin.pageTwo',    event: 'click', condition: { notEmpty: '.user_sub input.pageTwo' } },
                { element: '.submitJoin.pageThree',  event: 'click', condition: { notEmpty: '.user_sub input.pageThree' } },
                { element: '.submitJoin.pageFour',   event: 'click', condition: { notEmpty: '.user_sub input.pageFour' } },
                { element: '.submitJoin.pageFive',   event: 'click', condition: { notEmpty: '.user_sub input.pageFive' } },
                { element: '.user_sub input.pageTwo',   event: 'keyup', condition: { notEmpty: '.user_sub input.pageTwo' } },
                { element: '.user_sub input.pageThree', event: 'keyup', condition: { notEmpty: '.user_sub input.pageThree' } },
                { element: '.user_sub input.pageFour',  event: 'keyup', condition: { notEmpty: '.user_sub input.pageFour' } },
                { element: '.user_sub input.pageFive',  event: 'keyup', condition: { notEmpty: '.user_sub input.pageFive' } },
                { element: '.sel1, .sel1a', event: 'mouseenter' },
                { element: '.sel2, .sel2a', event: 'mouseenter' },
                { element: '.sel3',         event: 'mouseenter' },
                { element: '#demo_button',       event: 'click' },
                { element: '#vocabulary button', event: 'click' },
                { element: '#physics button',    event: 'click' },
                { element: '#follow button:first', event: 'click' }, // Follow on FB
                { element: '#follow button:last',  event: 'click' }, // Follow on Twitter
                { url: '/adventurers',   event: 'ajax'}
            ]
        });
    });
});
