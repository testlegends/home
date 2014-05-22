/**
* Services
*
* @author      :: Jeff Lee
* @created     :: 2014/05/20
*/

define(['angular'], function (angular) {

    return angular.module('Home.services', [])

        .factory('adventurers', ['$http', function ($http) {
            return {
                join: function (data, cb) {
                    $http.put('/adventurers', {
                        email: data.email,
                        ref: data.refCode,
                        metric: data.metric,
                        topic: data.topic
                    }).success(function (response) {
                        if (response.status === 'OK') {
                            cb(response.data);
                        }
                    });
                },
                visited: function (code, cb) {
                    if (code) {
                        $http.post('/adventurer/' + code, {}).success(function (response) {
                            cb(response.data);
                        });
                    }
                }
            };
        }])

        .factory('questions', ['$http', function ($http) {
            return {
                list: function (game, cb) {
                    $http.get('/questions/' + game).success(function (response) {
                        if (response.status === 'OK') {
                            cb(response.data);
                        }
                    });
                }
            };
        }]);

});
