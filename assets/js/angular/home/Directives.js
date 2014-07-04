/**
 * Directives
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/12
 */

define(['angular', 'home/Services'], function (angular) {

    return angular.module('Home.directives', ['Home.services'])

        .directive('landing', ['$location', 'adventurers', function ($location, adventurers) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/landing.html',
                controller: ['$scope', function ($scope) {
                    $scope.joined = function () {
                        // join to submit, hide email inputs or join us buttons
                        $('#pageTwo .user_sub').hide();
                        $('#pageThree .user_sub').hide();
                        $('#pageFour .submission input').hide();
                        $('#pageFour .join_us button').text('Submit');
                        $('#pageFive .submission input').hide();
                        $('#pageFive .join_us button').text('Submit');
                    };
                }],
                link: function (scope) {
                    adventurers.visited($location.search().ref, function (data) { });

                    // for fb/twitter callback on new window
                    if ($location.search().close_window === 'true') {
                        window.close();
                    }

                    $('#join').on('click', function(e){
                        $('.submit').addClass('submit_box');
                        $(this).addClass('join_with_input');
                        $(this).html("&nbsp;");
                        $(this).animate({
                            width: '21%'
                        }, 200, 'linear', function(){
                            $(this).html("Join");
                            $('#email').focus();
                        });

                        $(this).unbind("click");
                        $(this).on('click', function(){
                            adventurers.join({
                                email: $('#email').val(),
                                refCode: $location.search().ref
                            }, function (data) {
                                scope.joined();
                                $('.submit').addClass('submit_hide');
                                $('.subtext').addClass('subtext_hide');
                                $('.social').toggleClass('social_hide');
                                adventurers.share(data.code);

                                if (data.status === 'newly_joined') {
                                    // show thank you
                                } else {
                                    // show referrals count
                                }
                            });
                        });
                    });
                }
            };
        }])

        .directive('demo', ['$location', 'adventurers', function ($location, adventurers) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/demo.html',
                controller: ['$scope', function ($scope) {

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
                        $('.physics').hide();
                        $('#physics button').addClass('inactive');
                        $('#history button').addClass('inactive');
                        $('#vocabulary button').removeClass('inactive');
                    });

                    $('#physics').on('click', function(){
                        blinker.stopBlinking();
                        $('.physics').show();
                        $('.vocabulary').hide();
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
                    $(document).ready(function(){
                        $.each(scope.cities, function (name, pos) {
                            var city = $('<div />').addClass('cities').css({
                                top: pos.top,
                                left: pos.left
                            }).html(name);

                            $('#publish_map').append(city);
                        });

                        var curr = 1;
                        setInterval(function(){
                            var length = $('.cities').length;
                            $('.cities').fadeOut();
                            $('.cities:nth-child(' + curr + ')').fadeIn();

                            // TODO not sure why is > instead of ===
                            if (curr > length) {
                                curr = 1;
                            } else {
                                curr++;
                            }
                        }, 2000);
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

                }],
                link: function (scope) {

                }
            };
        }]);

});
