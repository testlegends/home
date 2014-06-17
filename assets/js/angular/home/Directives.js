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
                controller: function ($scope) {
                    $scope.joined = function () {
                        // join to submit, hide email inputs or join us buttons
                        $('#pageTwo .user_sub').hide();
                        $('#pageThree .user_sub').hide();
                        $('#pageFour .submission input').hide();
                        $('#pageFour .join_us button').text('Submit');
                        $('#pageFive .submission input').hide();
                        $('#pageFive .join_us button').text('Submit');
                    };
                },
                link: function (scope) {
                    adventurers.visited($location.search().ref, function (data) { });

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
                            $('#email').attr({
                                placeholder: "email"
                            }).focus();
                        });

                        $(this).unbind("click");
                        $(this).on('click', function(){
                            adventurers.join({
                                email: $('#email').val(),
                                refCode: $location.search().ref
                            }, function (data) {
                                $scope.joined();
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
                controller: function ($scope) {

                },
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
                controller: function ($scope) {

                },
                link: function (scope) {
                    var isOpen = false;
                    $('#vocabulary').on('click', function(){
                        $('.vocabulary').show();
                        $('.physics').hide();
                        $('#physics button').addClass('inactive');
                        $('#history button').addClass('inactive');
                        $('#vocabulary button').removeClass('inactive');
                    });
                    $('#physics').on('click', function(){
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
                controller: function ($scope) {
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
                },
                link: function () {
                    var scores_data = scores.list();

                    /*-----------------------meter draw--------------------------*/
                    function color_gradient (top, bottom) {
                        var colorG = [["black", "black"], ["#666666", "#666666"]];
                        if (top / bottom < 0.25) {
                            colorG = [["#FF0000", "#DD0000"], ["#666666", "#666666"]];
                        } else if (top / bottom < 0.5) {
                            colorG = [["#FF9D00", "#FF7B00"], ["#666666", "#666666"]];
                        } else if (top / bottom < 0.75) {
                            colorG = [["#FFFF00", "#FFEC00"], ["#666666", "#666666"]];
                        } else {
                            colorG = [["#89FF00", "#13FF00"], ["#666666", "#666666"]];
                        }
                        return colorG;
                    }

                    function render_timer (remain_seconds, total_seconds, meter) {
                        yellow_portion = Math.floor(parseFloat(total_seconds - remain_seconds) / parseFloat(total_seconds) * 360);
                        white_portion = Math.floor(parseFloat(remain_seconds) / parseFloat(total_seconds) * 360);

                        var data = [white_portion, yellow_portion];
                        var colors = [["black", "black"], ["#666666", "#666666"]];

                        colors = color_gradient(remain_seconds, total_seconds);

                        canvas = document.getElementById(meter);
                        var context = canvas.getContext("2d");

                        for (var i = 0; i < data.length; i++) {
                            drawSegment(canvas, context, i, data, colors[i]);
                        }
                    }

                    function drawSegment (canvas, context, i, data, color) {
                        context.save();
                        var centerX = Math.floor(canvas.width / 2);
                        var centerY = Math.floor(canvas.height / 2);
                        radius = Math.floor(canvas.width / 2);

                        // angle hack -> used to start at 45 deg
                        // now it starts at 0 deg
                        start_angle_input = sumTo(data, i) - 90;
                        if (start_angle_input < 0) {
                            start_angle_input = start_angle_input + 360;
                        }

                        var startingAngle = degreesToRadians(start_angle_input);
                        var arcSize = degreesToRadians(data[i]);
                        var endingAngle = startingAngle + arcSize;

                        context.beginPath();
                        context.moveTo(centerX, centerY);
                        context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
                        context.closePath();

                        var my_gradient = context.createLinearGradient(0, 0, 0, 170);
                        my_gradient.addColorStop(0, color[0]);
                        my_gradient.addColorStop(1, color[1]);
                        context.fillStyle = my_gradient;

                        // context.fillStyle = colors[i];
                        context.fill();

                        context.restore();
                    }

                    function degreesToRadians (degrees) {
                        return (degrees * Math.PI) / 180;
                    }

                    function sumTo (a, i) {
                        var sum = 0;
                        for (var j = 0; j < i; j++) {
                            sum += a[j];
                        }
                        return sum;
                    }

                    function meter_render(person){
                        render_timer(person.answered, person.total, "QAmeter");
                        render_timer(person.correct, person.answered, "QCmeter");
                    }
                    /*-----------------------------------------------------------*/

                    var person = scores_data['Alex C'];
                    indicator_render(person);

                    /*-----------------initialize-----------------*/
                    scores.draw();
                    scores.metrics_calculate(scores_data['Class Average']);
                    meter_render(scores_data['Class Average']);

                    $('.name_container p').each(function(){
                        var person = scores_data[$(this).text()];
                        var indicator = $(this).parent().find('.grade_ind');
                        indicator_render(person, indicator);
                    });

                    function indicator_render (person, indicator) {
                        var indicator_div = $(indicator);
                        if (person.correct / person.answered < 0.25) {
                            indicator_div.css('background-color', '#E80000');
                        } else if (person.correct / person.answered < 0.5) {
                            indicator_div.css('background-color', '#FF9D00');
                        } else if (person.correct / person.answered < 0.75) {
                            indicator_div.css('background-color', '#FFFF00');
                        } else {
                            indicator_div.css('background-color', '#89FF00');
                        }
                    }
                    /*--------------------------------------------*/

                    /*-------------------selection------------------*/
                    $('.name_container p').on('click', function(){
                        for (var i = 0; i < 26; i++) {
                            $('.name_container p').removeClass('selected');
                        }

                        $(this).addClass('selected');

                        var name = $(this).text();
                        var person = scores_data[name];

                        scores.draw(name);
                        scores.metrics_calculate(person);
                        meter_render(person);
                    });
                    /*-----------------------------------------------*/
                }
            };
        }])

        .directive('publish', ['$location', 'adventurers', function ($location, adventurers) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/publish.html',
                controller: function ($scope) {
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
                }
            };
        }]);

});
