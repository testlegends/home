/**
 * GameSprite
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

        .factory('GameSprite', ['Global', function (Global) {
            var scale_idx = 1.5;
            var data = {
                "images": ["sprites/game_sprite_sheet.png"],
                "frames": [
                    [2566,418,558,414],
                    [2006,2082,558,414],
                    [3412,2490,560,412],
                    [2848,2904,560,412],
                    [3128,416,840,412],
                    [2566,834,840,412],
                    [2568,2,840,412],
                    [2006,3326,840,412],
                    [2566,1662,840,412],
                    [2566,1248,840,412],
                    [2006,2912,840,412],
                    [2006,2498,840,412],
                    [2006,1666,558,414],
                    [2006,1250,558,414],
                    [3408,1662,560,412],
                    [3410,830,560,412],
                    [3408,1248,560,412],
                    [3130,2076,560,412],
                    [3410,3318,560,412],
                    [2848,2490,560,412],
                    [2566,2076,560,412],
                    [2848,3318,560,412],
                    [2006,2,560,414],
                    [2006,834,558,414],
                    [2006,2,560,414],
                    [3410,2,560,412],
                    [3410,2,560,412],
                    [2006,2,560,414],
                    [2006,418,558,414],
                    [1004,2840,1000,944],
                    [1004,1894,1000,944],
                    [1004,948,1000,944],
                    [1004,2,1000,944],
                    [2,2840,1000,944],
                    [2,1894,1000,944],
                    [2,948,1000,944],
                    [2,2,1000,944]
                ],
                "animations": {
                    "monster-breathe":{
                        frames: [0,1],
                        speed: 0.05 * scale_idx
                    },
                    "monster-dead":{
                        frames: [2,3],
                        speed: 0.05 * scale_idx
                    },
                    "monster-dodge":{
                        frames: [4,5,6,7,8,9,10,11],
                        speed: 0.2 * scale_idx
                    },
                    "monster-end-ouch":{
                        frames: [12,12,12],
                        speed: 0.15 * scale_idx
                    },
                    "monster-jump":{
                        frames: [14,15],
                        speed: 0.05 * scale_idx
                    },
                    "monster-landed":{
                        frames: [16,17,18,19,20,21],
                        speed: 0.15 * scale_idx
                    },
                    "monster-pre-ouch":{
                        frames: [22,23,24],
                        speed: 0.15 * scale_idx
                    },
                    "monster-return":{
                        frames: [25,26],
                        speed: 0.05 * scale_idx
                    },
                    "monster-select":{
                        frames: [27,28],
                        speed: 0.05 * scale_idx
                    },
                    "warrior-breathe":{
                        frames: [34,35],
                        speed: 0.05 * scale_idx
                    },
                    "warrior-pre-attack":{
                        frames: [30,31,32],
                        speed: 0.15 * scale_idx
                    },
                    "warrior-end-attack":{
                        frames: [32,32,32],
                        speed: 0.15 * scale_idx
                    },
                    "warrior-hack":{
                        frames: [30,31,32,33],
                        speed: 0.15 * scale_idx
                    },
                    "warrior-ouch":{
                        frames: [36,37],
                        speed: 0.05 * scale_idx
                    },
                    "monster-breathe-1":[0],
                    "monster-breathe-2":[1],
                    "monster-dead-1":[2],
                    "monster-dead-2":[3],
                    "monster-dodge-1":[4],
                    "monster-dodge-2":[5],
                    "monster-dodge-3":[6],
                    "monster-dodge-4":[7],
                    "monster-dodge-5":[8],
                    "monster-dodge-6":[9],
                    "monster-dodge-7":[10],
                    "monster-dodge-8":[11],
                    "monster-end-ouch-1":[12],
                    "monster-end-ouch-2":[13],
                    "monster-jump-1":[14],
                    "monster-jump-2":[15],
                    "monster-landed-1":[16],
                    "monster-landed-2":[17],
                    "monster-landed-3":[18],
                    "monster-landed-4":[19],
                    "monster-landed-5":[20],
                    "monster-landed-6":[21],
                    "monster-pre-ouch-1":[22],
                    "monster-pre-ouch-2":[23],
                    "monster-pre-ouch-3":[24],
                    "monster-return-1":[25],
                    "monster-return-2":[26],
                    "monster-select-1":[27],
                    "monster-select-2":[28],
                    "mosnter-end-ouch-3":[29],
                    "warrior-attack-1":[30],
                    "warrior-attack-2":[31],
                    "warrior-attack-3":[32],
                    "warrior-attack-4":[33],
                    "warrior-breathe-1":[34],
                    "warrior-breathe-2":[35],
                    "warrior-ouch-1":[36],
                    "warrior-ouch-2":[37]
                }
            };

            Global.game.assets.spritesheet = new createjs.SpriteSheet(data);

            return data;
        }]);
});
