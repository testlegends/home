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

        .factory('GameWin', ['Global', function (Global) {
            var GameWin = function () {
              this.initialize();
            }

            var p = GameWin.prototype = new createjs.Container();

            p.Container_initialize = p.initialize;

            p.initialize = function () {
                this.Container_initialize();
                this.draw_dark_shading();
                this.createWinLoseSprite();
                this.draw_win_state();
            }

            p.draw_dark_shading = function(){
              var graphics = new createjs.Graphics().beginFill("#000000").drawRect(0, 0, Global.canvas.width, Global.canvas.height);
              var shape = new createjs.Shape(graphics);
              shape.alpha = 0.5;
              this.addChild(shape);
            }

            this.win_bg = null;
            this.win = null;
            this.yellow_stars = null;
            this.dark_stars = null;

            p.createWinLoseSprite = function () {
              // create
              this.win_bg = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'win-mock');
              this.win = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'win');

              this.yellow_stars = [];
              this.dark_stars = [];
              for(var i=0;i<3;i++){
                this.yellow_stars.push(new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'star1'));
                this.dark_stars.push(new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'star2'));
              }
            }

            p.draw_win_state = function(){

              // this.win_bg.alpha = 0.8;
              // this.addChild(this.win_bg);

              // animate stars
              var star_loc = [
                // smallx, smally, largex, largey
                [0.375,0.355,0.33,0.545],
                [0.495,0.425,0.445,0.665],
                [0.61,0.355,0.565,0.535]
              ]


              // render dark stars
              // this.dark_stars[0].x = Global.canvas.width*0.33;
              // this.dark_stars[0].y = Global.canvas.width*0.307;
              // this.dark_stars[0].scaleX = 0.82;
              // this.dark_stars[0].scaleY = 0.82;
              // this.addChild(this.dark_stars[0]);
              //
              // this.dark_stars[1].x = Global.canvas.width*0.445;
              // this.dark_stars[1].y = Global.canvas.width*0.375;
              // this.dark_stars[1].scaleX = 0.82;
              // this.dark_stars[1].scaleY = 0.82;
              // this.addChild(this.dark_stars[1]);
              //
              // this.dark_stars[2].x = Global.canvas.width*0.565;
              // this.dark_stars[2].y = Global.canvas.width*0.301;
              // this.dark_stars[2].scaleX = 0.82;
              // this.dark_stars[2].scaleY = 0.82;
              // this.addChild(this.dark_stars[2]);

              for(var i=0;i<3;i++){
                this.dark_stars[i].x = Global.canvas.width*star_loc[i][0];this.dark_stars[i].y = Global.canvas.width*star_loc[i][1];
                this.dark_stars[i].scaleX = 0.1;this.dark_stars[i].scaleY = 0.1;
                this.dark_stars[i].alpha=0;
                this.addChild(this.dark_stars[i]);
                var tween = createjs.Tween.get(this.dark_stars[i])
                .to({alpha:1.0,scaleX:0.82,scaleY:0.82,x:Global.canvas.width*star_loc[i][2],y:Global.canvas.height*star_loc[i][3]},150)
              }


            this.win.x = Global.canvas.width*0.47;
            this.win.y = Global.canvas.height*0.35;
            this.win.scaleX = 0.1;
            this.win.scaleY = 0.1;
            this.addChild(this.win);

            var fuck_this = this;
            var tween = createjs.Tween.get(this.win)
            .to({alpha:1.0,scaleX:0.85,scaleY:0.85,x:Global.canvas.width*0.27,y:Global.canvas.height*0.02},150)
            .wait(100)
            .call(function(){
                // decide how many stars to give out, max 3, min 1
                var num_stars = Math.ceil(Global.game.hero_obj.life_percentage*3);

                for(var i=0;i<num_stars;i++){
                    fuck_this.yellow_stars[i].x = Global.canvas.width*star_loc[i][0];fuck_this.yellow_stars[i].y = Global.canvas.width*star_loc[i][1];
                    fuck_this.yellow_stars[i].scaleX = 0.1;fuck_this.yellow_stars[i].scaleY = 0.1;
                    fuck_this.yellow_stars[i].alpha=0;
                    fuck_this.addChild(fuck_this.yellow_stars[i]);
                }

                var tween = createjs.Tween.get(fuck_this.yellow_stars[0])
                .to({alpha:1.0,scaleX:0.82,scaleY:0.82,x:Global.canvas.width*star_loc[0][2],y:Global.canvas.height*star_loc[0][3]},110)
                .wait(200)
                .call(function(){
                    var tween = createjs.Tween.get(fuck_this.yellow_stars[1])
                    .to({alpha:1.0,scaleX:0.82,scaleY:0.82,x:Global.canvas.width*star_loc[1][2],y:Global.canvas.height*star_loc[1][3]},110)
                    .wait(200)
                    .call(function(){
                        var tween = createjs.Tween.get(fuck_this.yellow_stars[2])
                        .to({alpha:1.0,scaleX:0.82,scaleY:0.82,x:Global.canvas.width*star_loc[2][2],y:Global.canvas.height*star_loc[2][3]},110);
                    });
                });
            });
            }

            return GameWin;
        }]);
});
