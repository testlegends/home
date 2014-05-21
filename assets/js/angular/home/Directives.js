/**
 * Directives
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/12
 */

define(['angular', 'home/Services'], function (angular) {

    return angular.module('Home.directives', ['Home.services'])

        .directive('landing', ['$location', 'referals', function ($location, referals) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/landing.html',
                link: function (scope) {
                    referals.visited($location.search().ref, function (data) { });

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

                            referals.join({
                                email: $('#email').val(),
                                refCode: $location.search().ref
                            }, function (data) {
                                if (data.status === 'newly_joined') {
                                    alert("just joined " + data.code);
                                } else {
                                    alert("already joined " + data.code);
                                }
                            });
                        });
                    });
                }
            };
        }])

        .directive('demo', ['referals', 'questions', function (referals, questionss) {
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

        .directive('generate', ['referals', 'questions', function (referals, questions) {
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
                            $('.action img').click();
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

        .directive('last', ['referals', function (referals) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/last.html',
                controller: function ($scope) {

                }
            };
        }]);

});
