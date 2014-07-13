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
                    [504,298,388,388],
                    [2,2,388,388],
                    [894,298,500,294],
                    [894,2,500,294],
                    [504,688,500,294],
                    [2,688,500,294],
                    [392,2,500,294],
                    [2,392,500,294]
                ],
                "animations": {
                    "hit_red":[0],
                    "hit_white":[1],
                    "puff0":[2],
                    "puff1":[3],
                    "puff2":[4],
                    "puff3":[5],
                    "puff4":[6],
                    "puff_back":[7]
                },
                "texturepacker": [
                    "SmartUpdateHash: $TexturePacker:SmartUpdate:8417356aba5a338f728a2a7ded46dd30:946bf83c4ccb65bffe7432b15d3d163b:4e903d96d316f5b813639bdaaf93d125$",
                    "Created with TexturePacker (http://www.texturepacker.com) for EaselJS"
                ]
            };

            Global.game.assets.specialEffectsSpriteSheet = new createjs.SpriteSheet(data);

            return data;
        }]);
});
