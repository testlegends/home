/**
 * GameStatesConstant
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define(['game/constants'], function (gameConstants) {
    'use strict';

    return gameConstants

        .factory('GameStates', [function () {
            return {
                IDLE: 'idle',
                START: 'start',
                ACTION: 'action',
                GAME_OVER_WIN: 'game over',
                GAME_OVER_LOSS: 'win'
            };
        }]);
});
