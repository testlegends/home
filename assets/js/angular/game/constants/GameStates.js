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
                WIN: 'win',
                LOSE: 'lose'
            };
        }]);
});
