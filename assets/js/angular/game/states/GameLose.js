/**
 * GameState
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/states',
    'game/services/Global',
    'easeljs',
    'tweenjs'
], function (gameStates) {
    'use strict';

    return gameStates

        .factory('GameLose', ['Global', function (Global) {
            var GameLose = function () {
                this.initialize();
            };

            var p = GameLose.prototype = new createjs.Container();

            p.Container_initialize = p.initialize;

            p.initialize = function () {
                this.Container_initialize();
                this.createLoseSprite();
                this.draw_dark_shading();
                this.draw_lose_state();
            }

            p.draw_dark_shading = function(){
                var graphics = new createjs.Graphics().beginFill("#000000").drawRect(0, 0, Global.canvas.width, Global.canvas.height);
                var shape = new createjs.Shape(graphics);
                shape.alpha = 0.5;
                this.addChild(shape);
            }

            p.createLoseSprite = function () {
                this.lose = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'lose');
                this.lose_bg = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'lose-mock');
            }

            p.draw_lose_state = function(){
                // this.lose_bg.alpha = 0.8;
                // this.addChild(this.lose_bg);

                this.lose.x = Global.canvas.width*0.46;
                this.lose.y = Global.canvas.height*0.4;
                this.lose.scaleX = 0.1;
                this.lose.scaleY = 0.1;
                this.lose.alpha=0;
                this.addChild(this.lose);

                var tween = createjs.Tween.get(this.lose)
                .to({alpha:1.0,scaleX:0.85,scaleY:0.85,x:Global.canvas.width*0.185,y:Global.canvas.height*0.14},300);
            }

            return GameLose;
        }]);
});
