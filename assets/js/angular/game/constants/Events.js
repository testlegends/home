/**
 * EventsConstant
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define(['game/constants'], function (gameConstants) {
    'use strict';

    return gameConstants

        .factory('Events', [function () {
            return {
                TRIGGER_HERO_ATTACK: 'trigger hero attack',
                ASSETS_PROGRESS: 'assets progress',
                ASSETS_COMPLETE: 'assets complete',
                QUEUE_PROGRESS: 'progress',
                QUEUE_COMPLETE: 'complete',
                TICK: 'tick'
            };
        }]);
});
