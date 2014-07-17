/**
 * Directives
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/12
 */

define([
    'angular',
    'underscore',
    'home/Services',
    'game/services/Global',
    'game/services/Main'
], function (angular, _) {

    return angular.module('Home.directives', ['Home.services', 'Game.services'])

        .directive('landing', ['$location', 'adventurers', function ($location, adventurers) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/landing.html',
                controller: ['$scope', function ($scope) {
                    $scope.join = function () {
                        adventurers.join({
                            email: $scope.email,
                            refCode: $location.search().ref
                        }, function (data) {
                            $scope.joined();
                            adventurers.share(data.code);
                        });
                    };

                    $scope.joined = function () {
                        $('#pageOne .submit').hide();
                        $('#pageOne .social_hide').removeClass('social_hide');
                        $('#pageTwo .user_sub').hide();
                        $('#pageTwo .social_hide').removeClass('social_hide');
                        $('#pageThree .user_sub').hide();
                        $('#pageThree .social_hide').removeClass('social_hide');
                        $('#pageFour .submission input').hide();
                        $('#pageFour .join_us button').text('Submit');
                        $('#pageFive .submission input').hide();
                        $('#pageFive .join_us button').text('Submit');
                        $('#pageSix #signup').hide();
                        $('#pageSix .social_hide').removeClass('social_hide');
                    };
                }],
                link: function (scope) {
                    adventurers.visited($location.search().ref, function (data) { });

                    // for fb/twitter callback on new window
                    if ($location.search().close_window === 'true') {
                        window.close();
                    }
                }
            };
        }])

        .directive('demo', ['$location', 'adventurers', 'Global', 'Main', function ($location, adventurers, Global, Main) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/demo.html',
                controller: ['$scope', function ($scope) {
                    $scope.init = function () {
                        Global.canvas = document.getElementById('EpicGame');
                        Global.game.Main = new Main();
                    };

                    $scope.destroy = function () {
                        Global = {
                            game: {
                                assets: {},
                                monster_list: [],
                                scale_idx: 1
                            },
                            stage: {},
                            canvas: null
                        };
                    };
                }],
                link: function (scope) {
                    $('#join_on_demo').on('click', function(){
                        $('#pageTwo .submission').toggleClass('hidden');
                        $('#pageTwo .submission input').focus();

                        $(this).unbind('click');
                        $(this).on('click', function () {
                            adventurers.join({
                                email: scope.email,
                                refCode: $location.search().ref
                            }, function (data) {
                                scope.joined();
                                $('#pageTwo .user_sub').hide();
                                $('#pageTwo .social').show();
                                adventurers.share(data.code);
                            });
                        });
                    });
                    $('#demo_button').on('click', function(){
                        $('#pageTwo .sidebar').hide();
                        $('#demo').hide();
                        $('.welcome').show();
                        /*deactivate canvas here*/
                        $('#EpicGame').hide();
                    });
                    $('.skip').on('click', function(){
                        $('.welcome').hide();
                        $('.knight').hide();
                        $('.question_timer').hide();
                        $('.monsters').hide();
                        $('.health').hide();
                        $('#pageTwo .sidebar').show();
                        $('#EpicGame').show();
                        scope.init();
                    });
                    $('.restart').on('click', function(){
                        $('#pageTwo .sidebar').hide();
                        $('.welcome').show();
                        $('.rumble').hide();
                    });
                    $('.welcome .play').on('click', function(){
                        $('.knight').show();
                        $('.welcome').hide();
                    });
                    $('.knight .next').on('click', function(){
                        $('.question_timer').show();
                        $('.knight').hide();
                    });
                    $('.question_timer .next').on('click', function(){
                        $('.monsters').show();
                        $('.question_timer').hide();
                    });
                    $('.monsters .next').on('click', function(){
                        $('.health').show();
                        $('.monsters').hide();
                    });
                    $('.health .next').on('click', function(){
                        $('.rumble').show();
                        $('.health').hide();
                    });
                    $('.rumble .play').on('click', function(){
                        $('.rumble').hide();
                        $('#pageTwo .sidebar').show();
                        $('#EpicGame').show();
                        scope.init();
                    });
                }
            };
        }])

        .directive('customize', ['$location', 'adventurers', function ($location, adventurers) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/customize.html',
                controller: ['$scope', function ($scope) {

                }],
                link: function (scope) {
                    var blinker = (function(){
                        var timerInterval = null;
                        var x = 0;
                        var target = $('#physics button');

                        function blink() {
                            if (x === 0) {
                                target.removeClass('blinkOff');
                                target.addClass('blinkOn');
                                x = 1;
                            } else if (x === 1) {
                                target.removeClass('blinkOn');
                                target.addClass('blinkOff');
                                x = 0;
                            }
                        }

                        function startBlinking () {
                            if (timerInterval === null) {
                               timerInterval = setInterval(blink, 1000);
                            }
                        }

                        function stopBlinking() {
                            if (timerInterval !== null) {
                                clearInterval(timerInterval);
                                timerInterval = null;
                            }
                            target.removeClass('blinkOn');
                            target.removeClass('blinkOff');
                        }

                        return {
                            startBlinking: startBlinking,
                            stopBlinking: stopBlinking
                        };
                    })();

                    blinker.startBlinking();

                    $('#vocabulary').on('click', function(){
                        $('.vocabulary').show();
                        $('.hero').addClass('faderight_hero');
                        $('.monster').addClass('fadeleft_monster');
                        $('.physics').hide();
                        $('#physics button').addClass('inactive');
                        $('#history button').addClass('inactive');
                        $('#vocabulary button').removeClass('inactive');
                    });

                    $('#physics').on('click', function(){
                        blinker.stopBlinking();
                        $('.physics').show();
                        $('.spaceship').addClass('faderight_space');
                        $('.ufo').addClass('fadeleft_ufo');
                        $('.vocabulary').hide();
                        $('.q1').addClass('qFade');
                        $('.q2').addClass('qFade fade_q2');
                        $('.q3').addClass('qFade fade_q3');
                        $('.q4').addClass('qFade fade_q4');
                        $('#physics button').removeClass('inactive');
                        $('#history button').addClass('inactive');
                        $('#vocabulary button').addClass('inactive');
                    });

                    $('#join_on_customize').on('click', function(){
                        $('#pageThree .submission').toggleClass('hidden');
                        $('#pageTwo .submission input').focus();

                        $(this).unbind('click');
                        $(this).on('click', function(){
                            adventurers.join({
                                email: scope.email,
                                refCode: $location.search().ref
                            }, function (data) {
                                scope.joined();
                                $('#pageThree .user_sub').hide();
                                $('#pageThree .social').show();
                                adventurers.share(data.code);
                            });
                        });
                    });
                }
            };
        }])

        .directive('track', ['$location', 'adventurers', 'scores', function ($location, adventurers, scores) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/track.html',
                controller: ['$scope', function ($scope) {
                    $scope.scores = scores.list();

                    // Work around to prevent data to be sorted
                    // http://stackoverflow.com/questions/19676694/ng-repeat-directive-sort-the-data-when-using-key-value
                    $scope.names = function(obj){
                        return obj ? Object.keys(obj) : [];
                    };

                    $scope.viewStudent = function (name, $event) {
                        $('.name_container p').removeClass('selected');
                        $($event.currentTarget).find('p').addClass('selected');
                        scores.drawChart(name);
                        scores.drawMeter(name);
                        scores.populateData(name);
                    };

                    $scope.joinWithAssessment = function () {
                        adventurers.join({
                            email: $scope.email,
                            refCode: $location.search().ref,
                            assessment: $scope.assessment
                        }, function (data) {
                            $scope.joined();
                            $('#pageFour .user_sub').hide();
                            $('#pageFour .social').show();
                            adventurers.share(data.code);
                        });
                    };
                }],
                link: function () {
                    scores.drawChart();
                    scores.drawMeter();
                    scores.populateData();
                }
            };
        }])

        .directive('publish', ['$location', 'adventurers', 'cities', function ($location, adventurers, cities) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/publish.html',
                controller: ['$scope', function ($scope) {
                    $scope.cities = cities.list();

                    $scope.joinWithTopic = function () {
                        adventurers.join({
                            email: $scope.email,
                            refCode: $location.search().ref,
                            topic: $scope.topic
                        }, function (data) {
                            $scope.joined();
                            $('#pageFive .user_sub').hide();
                            $('#pageFive .social').show();
                            adventurers.share(data.code);
                        });
                    };
                }],
                link: function (scope) {
                    var bubblr = (function () {
                        var bubbleTpl = _.template('<div class="cities"><div class="pins"><img src="<%= avatar %>" /><div class="triangle"></div></div>' +
                            '<div class="city-text"><div class="city-topic"><%= topic %></div><div class="city-name"><%= city %></div></div>' +
                            '</div>');

                        function addBubble (name, data) {
                            var city = $(bubbleTpl({
                                city: name,
                                avatar: data.avatar,
                                topic: data.topic
                            })).css({
                                top: data.top,
                                left: data.left
                            });

                            $('#publish_map').append(city);
                        }

                        return {
                            addBubble: addBubble
                        };
                    })();

                    $.each(scope.cities, function (name, pos) {
                        bubblr.addBubble(name, pos);
                    });
                }
            };
        }])

        .directive('signup', ['$location', 'adventurers', function ($location, adventurers) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/signup.html',
                controller: ['$scope', function ($scope) {
                    // Same handle as landing page
                }],
                link: function (scope) {

                }
            };
        }]);
});
