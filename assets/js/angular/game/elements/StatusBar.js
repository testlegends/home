/**
 * StatusBarElement
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/elements',
    'game/services/Global',
    'easeljs',
    'tweenjs'
], function (gameElements) {
    'use strict';

    return gameElements

        .factory('StatusBar', ['Global', function (Global) {

            var StatusBar = function (bar_type) {
                this.initialize(bar_type);
            };

            var p = StatusBar.prototype = new createjs.Container();

            // color config
            p.colorsets = {
                life_bg_darkred: createjs.Graphics.getRGB(110, 8, 8),
                life_bar_lightred: createjs.Graphics.getRGB(242, 17, 17),
                magic_bg_darkblue: createjs.Graphics.getRGB(9, 98, 102),
                magic_bar_lightblue: createjs.Graphics.getRGB(30, 228, 249)
            };

            p.Container_initialize = p.initialize;
            p.initialize = function (bar_type) {
                this.Container_initialize();
                this.draw_status_bar_background(bar_type);

                this.max_height = 18 / Global.game.scale_idx;
                this.stroke = 5 / Global.game.scale_idx;
                this.max_width = 170 / Global.game.scale_idx;
            };

            p.draw_status_bar = function (Fillcolor, stroke, old_val) {
                var graphics = new createjs.Graphics();
                if (stroke !== 0) {
                    graphics.setStrokeStyle(this.stroke);
                    graphics.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
                }
                if (Fillcolor !== 0) {
                    graphics.beginFill(Fillcolor);
                }

                graphics.drawRoundRect(0, 0, this.max_width * old_val, this.max_height, 10); // x,y,w,h,border-radius
                return graphics;
            };

            p.draw_status_bar_background = function (bar_type) {
                var bar_bg;

                if (bar_type === 'life') {
                    bar_bg = this.draw_status_bar(this.colorsets.life_bg_darkred, 0, 1);
                } else if (bar_type === 'magic') {
                    bar_bg = this.draw_status_bar(this.colorsets.magic_bg_darkblue, 0, 1);
                }
                var bar_bg_s = new createjs.Shape(bar_bg);
                this.addChild(bar_bg_s);
            };

            p.update_bar = function (old_val, new_val, color) {
                if (old_val === 0) {
                    old_val = 0.01;
                }

                var scale_raitio = new_val / old_val;

                if (this.s_redbar) {
                    this.removeChild(this.s_redbar);
                }
                if (this.s_outline) {
                    this.removeChild(this.s_outline);
                }

                // draw actual red bar
                var redbar = this.draw_status_bar(color, 0, old_val);
                this.s_redbar = new createjs.Shape(redbar);
                createjs.Tween.get(this.s_redbar).to({ scaleX: scale_raitio }, 1000);

                // draw thick outline on top
                var outline = this.draw_status_bar(0, 5, 1);
                this.s_outline = new createjs.Shape(outline);

                this.addChild(this.s_redbar,this.s_outline);
            };

            return StatusBar;
        }]);
});
