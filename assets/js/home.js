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
        jqueryMouseWheel: '../vendor/jquery-mousewheel/jquery.mousewheel.min',
        keyboardjs: '../vendor/KeyboardJS/keyboard',
        underscore: '../vendor/underscore/underscore',
        flowtype: '../vendor/FlowType.JS/flowtype'
    },
    shim: {
        jqueryMouseWheel: ['jquery'],
        flowtype: ['jquery']
    },
    priority: ['jquery']
});

require([
    'keyboardjs',
    'underscore',
    'jquery',
    'jqueryMouseWheel',
    'flowtype'
], function (keyboard, _) {
    $(document).ready(function(){
        $('body').flowtype({
          fontRatio: 81
        });

        var boxesY = [
            $('#box1').position().top,
            $('#box2').position().top,
            $('#box3').position().top,
            $('#box4').position().top,
            $('#box5').position().top
        ];

        var currentBox = 0;
        $('body').on('mousewheel', _.debounce(function(event){
            clearTimeout($.data(this, 'timer'));
            $.data(this, 'timer', setTimeout(function() {
                behaviors.gotoNextBox(event.deltaY > 0 ? 'up' : 'down');
            }, 100));
            return false;
        }, 100, true));

        keyboard.on('up', function(e){
            e.preventDefault();
            behaviors.gotoNextBox('up');
        });

        keyboard.on('down', function(e){
            e.preventDefault();
            behaviors.gotoNextBox('down');
        });

        $('#breadcrumbs > div').each(function(i){
            $(this).click(function(e){
                if (i > currentBox) {
                    var k = i - currentBox;
                    for (var j = 0; j < k; j++) {
                        behaviors.gotoNextBox('down');
                    }
                } else if (i < currentBox) {
                    var k = currentBox - i;
                    for (var j = 0; j < k; j++) {
                        behaviors.gotoNextBox('up');
                    }
                }
            });
        });

        var behaviors = {
            gotoClosestBox: function () {
                var minDist = 9999999999;
                var minIndex = -1;
                for (var i in boxesY) {
                    var dist = Math.abs($(window).scrollTop() - boxesY[i]);
                    if (minDist > dist) {
                        minIndex = i;
                        minDist = dist;
                    }
                }

                $('html, body').animate({
                    scrollTop: boxesY[minIndex]
                }, 500, 'swing');

                return false;
            },

            gotoNextBox: function (direction) {
                if (direction === 'up') {
                    if (currentBox === 0) return false;
                    $('#down_nav').show();
                    currentBox--;
                    $('#breadcrumbs > div:nth-child(' + (currentBox + 2) + ') .breadcrumbs').removeClass('breadcrumbs_filled');
                } else if (direction === 'down') {
                    if (currentBox === boxesY.length - 2) {
                        $('#down_nav').hide();
                    }
                    if (currentBox === boxesY.length - 1) {
                        return false;
                    }
                    currentBox++;
                    $('#breadcrumbs > div:nth-child(' + (currentBox) + ') .breadcrumbs').removeClass('breadcrumbs_filled');
                }

                $('html, body').animate({
                    scrollTop: boxesY[currentBox]
                }, 500, 'swing');

                $('#breadcrumbs > div:nth-child(' + (currentBox + 1) + ') .breadcrumbs').addClass('breadcrumbs_filled');

                return false;
            }
        };
    });
});
