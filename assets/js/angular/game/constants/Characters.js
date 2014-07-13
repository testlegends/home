/**
 * CharactersConstant
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/12
 */

define(['game/constants'], function (gameConstants) {
    'use strict';

    return gameConstants

        .factory('Characters', [function () {
            return {
                Hero: {

                },
                Monster: {

                }
            };
        }]);
});
