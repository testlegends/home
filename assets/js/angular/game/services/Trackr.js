/**
 * TrackrService
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/20
 */

define(['game/services'], function (gameServices) {
    'use strict';

    return gameServices

        .factory('Trackr', ['$http', function ($http) {
            var appName = "TestLegends Home";

            var trackr = (function(){
                var url = '/trackr';

                return {
                    save: function (data, cb) {
                        $http.post(url, data).success(cb);
                    }
                }
            })();

            function questionAnswered (answer) {
                var data = {
                    name: appName;
                    info: {
                        event: 'Game',
                        elem: answer
                    }
                };

                trackr.save(data, function (response) {
                    // console.log('logged ' + answer);
                });
            }

            return {
                questionAnswered: questionAnswered
            };
        }]);
});
