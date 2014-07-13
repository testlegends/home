/**
 * GameService
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/services'
], function (gameServices) {
    'use strict';

    return gameServices

        .factory('Global', [function () {
            return {
                game: {
                    assets: {},
                    monster_list: [],
                    scale_idx: 1
                },
                stage: {},
                canvas: null
            };
        }]);
});
