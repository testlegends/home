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

        .directive('demo', ['adventurers', 'questions', function (adventurers, questionss) {
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

        .directive('generate', ['adventurers', 'questions', function (adventurers, questions) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/generate.html',
                controller: function ($scope) {
                    questions.list(function (data) {
                        $scope.questions = data;
                    });
                },
                link: function (scope) {
                    var isOpen = false;
                    $('.action img').on('click', function(){
                        $('.share_area').toggleClass('share_change');
                        $('.demo_area').toggleClass('area_change');
                        $('.demo_box').toggleClass('box_change');
                    });

                    $('#generate').click(function(){
                        questions.add({
                            content: $('#user_input').val(),
                            options: {
                                correct: $('#correct').val(),
                                wrong: [
                                    { text: $('#wrong1').val() },
                                    { text: $('#wrong2').val() },
                                    { text: $('#wrong3').val() }
                                ]
                            }
                        }, function (data) {
                            scope.questions.unshift(data);
                            $('#user_input').val("");
                            $('#correct').val("");
                            $('#wrong1').val("");
                            $('#wrong2').val("");
                            $('#wrong3').val("");

                            if (!$('.share_area').is(':visible')) {
                                $('.action img').click();
                            }

                            // TODO show a button say "click to start playing the game"
                            // TODO game uses the questions already loaded
                            // TODO on server side, randomly pick 10 questions out to the list

                            // TODO set interval and get the latest question
                            // TODO randomize the options
                        });
                    });
                }
            };
        }])

        .directive('build', [function(){
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/build.html'
            };
        }])

        .directive('last', ['adventurers', function (adventurers) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/last.html',
                controller: function ($scope) {

                }
            };
        }]);

});
