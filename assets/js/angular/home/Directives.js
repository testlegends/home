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
                            $('.submit').addClass('submit_hide');
                            $('.subtext').addClass('subtext_hide');
                            $('.social').toggleClass('social_hide');

                            adventurers.join({
                                email: $('#email').val(),
                                refCode: $location.search().ref
                            }, function (data) {
                                $('button.facebook').on('click', function(){
                                    var facebookShareUrl = 'http://www.facebook.com/dialog/feed?' +
                                        'app_id=1412582839022573' + '&' +
                                        'link=http://testlegends.herokuapp.com/?ref=' + data.code + '&' +
                                        'message=helloworld' + '&' +
                                        'display=popup' + '&' +
                                        'redirect_uri=http://testlegends.herokuapp.com/?close_window=true';

                                    window.open(facebookShareUrl, 'popUpWindow',
                                        'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
                                    );
                                });

                                $('button.twitter').on('click', function(){
                                    var twitterShareUrl = 'http://twitter.com/share?' +
                                        'text=hello' + '&' +
                                        'url=http://testlegends.herokuapp.com/?ref=' + data.code;

                                    window.open(twitterShareUrl, 'popUpWindow',
                                        'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
                                    );
                                });
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

        .directive('demo', ['adventurers', function (adventurers) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/demo.html',
                controller: function ($scope) {

                },
                link: function () {

                }
            };
        }])

        .directive('customize', ['adventurers', function (adventurers) {
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
                }
            };
        }])

        .directive('track', ['adventurers', 'scores', function (adventurers, scores) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/track.html',
                controller: function ($scope) {

                },
                link: function () {
                    var database = scores.list();

                    /*--------metrics calculations--------*/
                    function percent_calculate (score) {
                        var numSplit = score.split('/');
                        var percentage = parseInt(numSplit[0]) / parseInt(numSplit[1]);
                        return Math.round(percentage * 1000) / 10;
                    }

                    function metrics_calculate (person) {
                        $('.answered').text(person.answered);
                        $('#answered_percentage').text(Math.round(person.answered / person.total * 1000) / 10 + '%');

                        $('.correct').text(person.correct);
                        $('#correct_percentage').text(Math.round(person.correct / person.answered * 1000) / 10 + '%');
                        $('#total_percentage').text(Math.round(person.correct / person.total * 1000) / 10 + '%');

                        $('#question_num1').text(person.question_num1);
                        $('#question1').text(person.question1);
                        $('#question_num2').text(person.question_num2);
                        $('#question2').text(person.question2);
                        $('#question_num3').text(person.question_num3);
                        $('#question3').text(person.question3);
                    }
                    /*------------------------------------*/

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

                    var person = database['Alex C'];
                    indicator_render(person);

                    /*-----------------initialize-----------------*/
                    scores.draw();
                    metrics_calculate(database['Class Average']);
                    meter_render(database['Class Average']);

                    $('.name_container p').each(function(){
                        var person = database[$(this).text()];
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
                        var person = database[name];

                        scores.draw(name);
                        metrics_calculate(person);
                        meter_render(person);
                    });
                    /*-----------------------------------------------*/
                }
            };
        }])

        .directive('publish', ['adventurers', function (adventurers) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/publish.html',
                controller: function ($scope) {

                }
            };
        }]);

});
