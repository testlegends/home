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
                this.draw_win_state_init();
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

            // ----------------------
            // WinState Rendering
            // used by draw_win_state_init, draw_win_state_second_step
            // ----------------------
            p.animate_sheild_and_black_stars = function(star_loc, star_scale, sheild_loc, sheild_scale, alpha_change, animate_time, next_animation_func){
              // render dark stars
              for(var i=0;i<3;i++){
                this.dark_stars[i].x = Global.canvas.width*star_loc[i][0];this.dark_stars[i].y = Global.canvas.width*star_loc[i][1];
                this.dark_stars[i].scaleX = star_scale[0];this.dark_stars[i].scaleY = star_scale[0];
                this.dark_stars[i].alpha=alpha_change[0];
                this.addChild(this.dark_stars[i]);
                var tween = createjs.Tween.get(this.dark_stars[i])
                .to({alpha:alpha_change[1],scaleX:star_scale[1],scaleY:star_scale[1],x:Global.canvas.width*star_loc[i][2],y:Global.canvas.height*star_loc[i][3]},animate_time)
              }

              // render sword sheild
              this.win.x = Global.canvas.width*sheild_loc[0];
              this.win.y = Global.canvas.height*sheild_loc[1];
              this.win.scaleX = sheild_scale[0];
              this.win.scaleY = sheild_scale[0];
              this.addChild(this.win);
              var tween = createjs.Tween.get(this.win)
              .to({alpha:1.0,scaleX:sheild_scale[1],scaleY:sheild_scale[1],x:Global.canvas.width*sheild_loc[2],y:Global.canvas.height*sheild_loc[3]},animate_time)
              .wait(0)
              .call(next_animation_func.bind(this));
            }

            p.animate_one_yellow_star = function(yellow_star, star_loc, star_scale, alpha_change, animate_time, next_animation_func){

              // render one yellow star
              yellow_star.x = Global.canvas.width*star_loc[0][0];
              yellow_star.y = Global.canvas.width*star_loc[0][1];
              yellow_star.scaleX = star_scale[0][0];
              yellow_star.scaleY = star_scale[0][0];
              yellow_star.alpha = alpha_change[0][0];
              this.addChild(yellow_star);
              var fuck_this = this;
              var tween = createjs.Tween.get(yellow_star)
              .to({alpha:alpha_change[0][1],scaleX:star_scale[0][1],scaleY:star_scale[0][1],x:Global.canvas.width*star_loc[0][2],y:Global.canvas.height*star_loc[0][3]},animate_time[0])
              .call(function(){
                yellow_star.x = Global.canvas.width*star_loc[1][0];
                yellow_star.y = Global.canvas.width*star_loc[1][1];
                yellow_star.scaleX = star_scale[1][0];
                yellow_star.scaleY = star_scale[1][0];
                yellow_star.alpha = alpha_change[1][0];
                fuck_this.addChild(yellow_star);
                var tween = createjs.Tween.get(yellow_star)
                .to({alpha:alpha_change[1][1],scaleX:star_scale[1][1],scaleY:star_scale[1][1],x:Global.canvas.width*star_loc[1][2],y:Global.canvas.height*star_loc[1][3]},animate_time[1])
              });
            }


            p.draw_win_state_init = function(){
              // this.win_bg.alpha = 0.8;
              // this.addChild(this.win_bg);

              // animate stars (small->large)
              var star_loc = [
                // smallx, smally, largex, largey
                // shift to center [-0.1,0]
                [0.475,0.355,0.409,0.507],  // black star 1
                [0.5895,0.425,0.5235,0.630], // black star 2
                [0.705,0.355,0.639,0.507]   // black star 3
              ];
              var star_scale = [0.1, 1.15] // before, after

              var sheild_loc = [0.565,0.35,0.356,0]; // smallx, smally, largex, largey
              var sheild_scale = [0.1, 0.9]; // before, after

              var alpha_change = [0, 1];
              var animate_time = 150;
              this.animate_sheild_and_black_stars(star_loc, star_scale, sheild_loc, sheild_scale, alpha_change, animate_time, this.draw_win_state_second_step);
            }


            p.draw_win_state_second_step = function(){

              // animate stars (small->large)
              var star_loc = [
                // smallx, smally, largex, largey
                [0.409,0.286,0.43,0.545],  // black star 1
                [0.5235,0.355,0.545,0.665], // black star 2
                [0.639,0.286,0.66,0.545]   // black star 3
              ];
              var star_scale = [1.15, 0.82] // before, after

              var sheild_loc = [0.356,0,0.369,0.02]; // smallx, smally, largex, largey
              var sheild_scale = [0.9, 0.85]; // before, after

              var alpha_change = [1,1];
              var animate_time = 75;
              this.animate_sheild_and_black_stars(star_loc, star_scale, sheild_loc, sheild_scale, alpha_change, animate_time, this.draw_win_state_third_step);
            }

            p.draw_win_state_third_step = function(){

              // animate stars (small->large)
              var star_loc_1 = [
                // smallx, smally, largex, largey
                [0.475,0.355,0.409,0.507],  // yellow star 1
                [0.5895,0.425,0.5235,0.630], // yellow star 2
                [0.705,0.355,0.639,0.507]   // yellow star 3
              ];

              // animate stars (large->medium)
              var star_loc_2 = [
                // smallx, smally, largex, largey
                [0.409,0.286,0.43,0.545],  // yellow star 1
                [0.5235,0.355,0.545,0.665], // yellow star 2
                [0.639,0.286,0.66,0.545]   // yellow star 3
              ];
              var star_scale_1 = [0.1, 1.15] // before, after
              var star_scale_2 = [1.15, 0.82] // before, after

              var alpha_change_1 = [0,1];
              var alpha_change_2 = [1,1];

              var animate_time_1 = 100; // grow time
              var animate_time_2 = 200; // shrink time

              var fuck_this = this;

              var num_stars = Math.ceil(Global.game.hero_obj.life_percentage*3);

              var tween = createjs.Tween.get(this.yellow_star)
              .call(function(){
                if(num_stars>0){
                  fuck_this.animate_one_yellow_star(fuck_this.yellow_stars[0],
                                                [star_loc_1[0], star_loc_2[0]],
                                                [star_scale_1, star_scale_2],
                                                [alpha_change_1, alpha_change_2],
                                                [animate_time_1, animate_time_2]);
                }
              })
              .wait(animate_time_1+animate_time_2)
              .call(function(){
                if(num_stars>1){
                  fuck_this.animate_one_yellow_star(fuck_this.yellow_stars[1],
                                                [star_loc_1[1], star_loc_2[1]],
                                                [star_scale_1, star_scale_2],
                                                [alpha_change_1, alpha_change_2],
                                                [animate_time_1, animate_time_2]);
                }
              })
              .wait(animate_time_1+animate_time_2)
              .call(function(){
                if(num_stars>2){
                  fuck_this.animate_one_yellow_star(fuck_this.yellow_stars[2],
                                                [star_loc_1[2], star_loc_2[2]],
                                                [star_scale_1, star_scale_2],
                                                [alpha_change_1, alpha_change_2],
                                                [animate_time_1, animate_time_2]);
                }
              });
            }



            return GameWin;
        }]);
});
