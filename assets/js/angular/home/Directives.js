/**
 * Directives
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/12
 */

define(['angular', 'home/Services'], function (angular) {

    return angular.module('Home.directives', ['Home.services'])

        .directive('landing', ['referals', function (referals) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/landing.html',
                controller: function ($scope) {

                },
                link: function (scope) {
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

        .directive('generate', ['referals', 'questions', function (referals, questionss) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/js/angular/home/partials/generate.html',
                controller: function ($scope) {

                },
                link: function () {
                    var isOpen = false;
                    $('.action img').on('click', function(){
                        $('.share_area').toggleClass('share_change');
                        $('.demo_area').toggleClass('area_change');
                        $('.demo_box').toggleClass('box_change');
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
