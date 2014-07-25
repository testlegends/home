/**
* Services
*
* @author      :: Jeff Lee
* @created     :: 2014/07/24
*/

define(['angular'], function (angular) {

    return angular.module('Share.services', [])

        .factory('share', ['$http', function ($http) {
            return {
                get: function (code, cb) {
                    var url = '/adventurer/' + code + '/shares';
                    $http.get(url).success(function (response) {
                        if (response.status === 'OK') {
                            cb(null, response.data);
                        } else {
                            cb(response.msg, null);
                        }
                    });
                },
                updateSatisfaction: function (code, level) {
                    var url = '/adventurer/' + code + '/survey';
                    $http.post(url, {
                        level: level
                    }).success(function (response) {

                    });
                }
            };
        }]);

});
