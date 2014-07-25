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
            pageWaitTime: 6000,
            trackers: [
                // { element: '#pageOne',   event: 'viewport' },
                // { element: '#pageTwo',   event: 'viewport' },
                // { element: '#pageThree', event: 'viewport' },
                // { element: '#pageFour',  event: 'viewport' },
                // { element: '#pageFive',  event: 'viewport' },
                // { element: '#pageSix',  event: 'viewport' },
                // { url: '/adventurers',   event: 'ajax'},
                { element: '#pageOne button',            name: 'Signup in page 1', event: 'click', condition: { notEmpty: '#pageOne input[type=email]' } }, // Join in page 1
                { element: '#pageOne input[type=email]', name: 'Signup in page 1', event: 'keyup', condition: { notEmpty: '#pageOne input[type=email]' } }, // Join in page 1
                { element: '#pageSix button',            name: 'Signup in page 6', event: 'click', condition: { notEmpty: '#pageSix input[type=email]' } }, // Join in page 6
                { element: '#pageSix input[type=email]', name: 'Signup in page 6', event: 'keyup', condition: { notEmpty: '#pageSix input[type=email]' } }, // Join in page 6
                { element: '.showJoinBox.pageTwo',   name: 'Signup box in page 2', event: 'click' },
                { element: '.showJoinBox.pageThree', name: 'Signup box in page 3', event: 'click' },
                { element: '.showJoinBox.pageFour',  name: 'Signup box in page 4', event: 'click' },
                { element: '.showJoinBox.pageFive',  name: 'Signup box in page 5', event: 'click' },
                { element: '.submitJoin.pageTwo',    name: 'Signup in page 2', event: 'click', condition: { notEmpty: '.user_sub input.pageTwo' } },
                { element: '.submitJoin.pageThree',  name: 'Signup in page 3', event: 'click', condition: { notEmpty: '.user_sub input.pageThree' } },
                { element: '.submitJoin.pageFour',   name: 'Signup in page 4', event: 'click', condition: { notEmpty: '.user_sub input.pageFour' } },
                { element: '.submitJoin.pageFive',   name: 'Signup in page 5', event: 'click', condition: { notEmpty: '.user_sub input.pageFive' } },
                { element: '.user_sub input.pageTwo',   name: 'Signup in page 2', event: 'keyup', condition: { notEmpty: '.user_sub input.pageTwo' } },
                { element: '.user_sub input.pageThree', name: 'Signup in page 3', event: 'keyup', condition: { notEmpty: '.user_sub input.pageThree' } },
                { element: '.user_sub input.pageFour',  name: 'Signup in page 4', event: 'keyup', condition: { notEmpty: '.user_sub input.pageFour' } },
                { element: '.user_sub input.pageFive',  name: 'Signup in page 5', event: 'keyup', condition: { notEmpty: '.user_sub input.pageFive' } },
                { element: '.sel1, .sel1a', name: 'Mouse hover knight',    event: 'mouseenter' },
                { element: '.sel2, .sel2a', name: 'Mouse hover questions', event: 'mouseenter' },
                { element: '.sel3',         name: 'Mouse hover monsters',  event: 'mouseenter' },
                { element: '#demo_button',         name: 'Play button',       event: 'click' },
                { element: '#vocabulary button',   name: 'Vocab button',      event: 'click' },
                { element: '#physics button',      name: 'Physics button',    event: 'click' },
                { element: '#follow button:first', name: 'Follow on FB',      event: 'click' }, // Follow on FB
                { element: '#follow button:last',  name: 'Follow on Twitter', event: 'click' }  // Follow on Twitter
            ]
        });
    });
});
