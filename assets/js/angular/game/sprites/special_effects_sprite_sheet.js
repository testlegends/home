/**
 * SpecialEffectSprite
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/sprites',
    'game/services/Global'
], function (gameSprites) {
    'use strict';

    return gameSprites

        .factory('SpecialEffectSprite', ['Global', function (Global) {
            var data = {
                "images": ["sprites/special_effects_sprite_sheet.png"],
                "frames": [
                    [3670, 2088, 388, 388],
                    [3280, 2088, 388, 388],
                    [2, 1284, 2272, 1280],
                    [2276, 2, 1660, 900],
                    [2778, 1866, 500, 294],
                    [2276, 1866, 500, 294],
                    [3498, 1792, 500, 294],
                    [3498, 1496, 500, 294],
                    [3498, 1200, 500, 294],
                    [3498, 904, 500, 294],
                    [2568, 2162, 290, 290],
                    [2276, 2162, 290, 290],
                    [2, 2, 2272, 1280],
                    [2276, 904, 1220, 960]
                ],
                "animations": {
                    "hit_red":[0],
                    "hit_white":[1],
                    "lose-mock":[2],
                    "lose":[3],
                    "puff0":[4],
                    "puff1":[5],
                    "puff2":[6],
                    "puff3":[7],
                    "puff4":[8],
                    "puff_back":[9],
                    "star1":[10],
                    "star2":[11],
                    "win-mock":[12],
                    "win":[13]
                }
            };

            Global.game.assets.specialEffectsSpriteSheet = new createjs.SpriteSheet(data);

            return data;
        }]);
});
