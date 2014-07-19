/**
 * TrackrService
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/17
 */

define([
    'game/services',
], function (gameServices) {
    'use strict';

    return gameServices

        .factory('Trackr', ['$http', function ($http) {
            var trackr = (function () {
                var url = '/trackr';

                function get () {
                    
                }

                return {
                    get: get
                }
            })();

            function questionAnswered (question, answer) {

            }

            return {

            };
        }]);
});
