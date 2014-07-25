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
    'game/services/Main',
    'game/constants/GameStates'
], function (angular, _) {

    return angular.module('Home.directives', ['Home.services', 'Game.services', 'Game.constants'])

        .directive('landing', ['$location', 'adventurers', 'validator', function ($location, adventurers, validator) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/landing.html',
                controller: ['$scope', function ($scope) {
                    $scope.join = function () {
                        if (!validator.isEmail($scope.email)) {
                            // TODO: show some error msg
                            return false;
                        }

                        adventurers.join({
                            email: $scope.email,
                            refCode: $location.search().ref
                        }, function (data) {
                            window.location.href = '/share?refCode=' + data.code + '&email=' + $scope.email
                        });
                    };
                }],
                link: function (scope) {
                    adventurers.visited($location.search().ref, function (data) { });

                    // for fb/twitter callback on new window
                    if ($location.search().close_window === 'true') {
                        window.close();
                    }

                    $('#pageOne input[type=email]').on('keyup', function (e) {
                        if (validator.isEnter(e)) {
                            scope.join();
                        }
                    });
                }
            };
        }])

        .directive('demo', ['Global', 'Main', 'GameStates', function (Global, Main, GameStates) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/demo.html',
                controller: ['$scope', function ($scope) {
                    $scope.init = function () {
                        Global.canvas = document.getElementById('EpicGame');
                        Global.game.Main = new Main();
                    };

                    $scope.restart = function () {
                        Global.game.timer.timer_activate_flag = 0;
                        clearInterval(Global.game.timer.interval_holder);

                        Global.game.main.removeChild(Global.game.hero_obj);
                        for (var i = 0; i < Global.game.monster_list.length; i++) {
                            Global.game.main.removeChild(Global.game.monster_list[i]);
                        }

                        Global.game.Main.changeState(GameStates.LOSE);
                        Global.game.Main.changeState(GameStates.START);
                    };
                }],
                link: function (scope) {
                    $('#demo_button button').on('click', function(){
                        $('.tutorial').hide();
                        $('.demo_point').hide();
                        $('#EpicGame').show();
                        scope.init();
                        $(this).html('Replay');
                        $(this).unbind('click').click(function(){
                            scope.restart();
                        });
                    });
                    $('.sel1, .sel1a').hover(function(){
                        $('.box1').css({ opacity: 1 });
                        $('.box2, .box3').css({ opacity: 0.3 });
                    });
                    $('.sel2, .sel2a').hover(function(){
                        $('.box2').css({ opacity: 1 });
                        $('.box1, .box3').css({ opacity: 0.3 });
                    });
                    $('.sel3').hover(function(){
                        $('.box3').css({ opacity: 1 });
                        $('.box1, .box2').css({ opacity: 0.3 });
                    });

                    if (/msie/.test(navigator.userAgent.toLowerCase())) {
                        $('#canvas_container, #EpicGame').css({
                            'height': '100%'
                        });
                    }
                }
            };
        }])

        .directive('customize', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/customize.html',
                link: function (scope) {
                    $('#vocabulary').on('click', function(){
                        $('.cus_point').hide();
                        $('.vocabulary').show();
                        $('.hero').addClass('faderight_hero');
                        $('.monster').addClass('fadeleft_monster');
                        $('.physics').hide();
                        $('#physics button').addClass('inactive');
                        $('#vocabulary button').removeClass('inactive');
                    });

                    $('#physics').on('click', function(){
                        $('.cus_point').hide();
                        $('.physics').show();
                        $('.spaceship').addClass('faderight_space');
                        $('.ufo').addClass('fadeleft_ufo');
                        $('.vocabulary').hide();
                        $('.q1').addClass('qFade');
                        $('.q2').addClass('qFade fade_q2');
                        $('.q3').addClass('qFade fade_q3');
                        $('.q4').addClass('qFade fade_q4');
                        $('#physics button').removeClass('inactive');
                        $('#vocabulary button').addClass('inactive');
                    });
                }
            };
        }])

        .directive('track', ['scores', function (scores) {
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
                }],
                link: function () {
                    scores.drawChart();
                    scores.drawMeter();
                    scores.populateData();
                }
            };
        }])

        .directive('publish', ['cities', function (cities) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/publish.html',
                controller: ['$scope', function ($scope) {
                    $scope.cities = cities.list();
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

        .directive('signup', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/signup.html',
                link: function (scope) {
                    $('#pageSix input[type=email]').on('keyup', function (e) {
                        if (validator.isEnter(e)) {
                            scope.join();
                        }
                    });
                }
            };
        }])

        .directive('followUs', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/followUs.html'
            };
        }])

        .directive('signupAndShare', ['validator', function (validator) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/signupAndShare.html',
                scope: {
                    pageNumber: '@page'
                },
                controller: ['$scope', function ($scope) {
                    $scope.pageTwo = 'pageTwo';
                    $scope.pageThree = 'pageThree';
                    $scope.pageFour = 'pageFour';
                    $scope.pageFive = 'pageFive';
                }],
                link: function (scope, elem, attrs) {
                    $('.join_on_sidebar.submitJoin').hide();

                    $('.join_on_sidebar.showJoinBox').on('click', function () {
                        $('.point').hide();
                        $(this).parent().parent().find('input').removeClass('hidden').focus();
                        $(this).parent().parent().find('input').on('keyup', function (e) {
                            if (validator.isEnter(e)) {
                                if (!validator.isEmail(scope.$parent.email)) {
                                    // TODO: show some error msg
                                    return false;
                                }

                                scope.$parent.join();
                            }
                        });

                        $(this).hide();
                        $('.join_on_sidebar.submitJoin.' + attrs.page).show();
                    });

                    $('.join_on_sidebar.submitJoin').on('click', function () {
                        if (!validator.isEmail(scope.$parent.email)) {
                            // TODO: show some error msg
                            return false;
                        }

                        scope.$parent.join();
                    });
                }
            };
        }]);
});
