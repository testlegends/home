/**
* Services
*
* @author      :: Jeff Lee
* @created     :: 2014/05/20
*/

define(['angular'], function (angular) {

    return angular.module('Home.services', [])

        .factory('referals', ['$http', function ($http) {
            return {
                join: function (data, cb) {
                    $http.put('/referals', {
                        email: data.email,
                        ref: data.refCode
                    }).success(function (response) {
                        if (response.status === 'OK') {
                            cb(response.data);
                        }
                    });
                }
            };
        }])

        .factory('questions', ['$http', function ($http) {
            return {
                list: function (cb) {
                    $http.get('/questions').success(function (response) {
                        if (response.status === 'OK') {
                            cb(response.data);
                        }
                    });
                },
                add: function (data, cb) {
                    $http.put('/questions').success(function (response) {
                        if (response.status === 'OK') {
                            cb(response.data);
                        }
                    });
                },
                get: function (id, cb) {
                    $http.get('/question/' + id).success(function (response) {
                        if (response.status === 'OK') {
                            cb(response.data);
                        }
                    });
                },
                latest: function (cb) {
                    $http.get('/question/latest').success(function (response) {
                        if (response.status === 'OK') {
                            cb(response.data);
                        }
                    });
                }
            };
        }]);

});
