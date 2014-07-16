/**
 * AnswerBoxElement
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

        .factory('AnswerBox', ['Global', function (Global) {

            var AnswerBox = function (ans_txt) {
                this.initialize(ans_txt);
            };

            var p = AnswerBox.prototype = new createjs.Container();

            p.answer_text = '';

            p.Container_initialize = p.initialize;
            p.initialize = function (ans_txt) {
                this.Container_initialize();
                var answer_box = this.draw_dialog_box(0, 0, ans_txt);
                this.addChild(answer_box);
                answer_box.alpha = 0;
                var tween = createjs.Tween.get(answer_box).to({ alpha: 1 }, 100);

                this.answer_text = ans_txt;
            };

            // ----------------------------
            // Dialog Box Rendering - Used by Monster
            // ----------------------------
            p.draw_dialog_box = function (x, y, txt_str) {

                // hack
                var box_scale = 1 / Global.game.scale_idx;

                var txt = new createjs.Text(txt_str, "bold 34px  Hannotate SC", "#0f40a3");
                var txt_line_height = txt.getMeasuredLineHeight();
                var txt_width = txt.getMeasuredWidth();

                var x_axis_padding = 20 * box_scale;
                var y_axis_padding = 15 * box_scale;

                txt.x = x + x_axis_padding;
                txt.y = y + y_axis_padding;

                var g = new createjs.Graphics();
                var w = txt_width + x_axis_padding * 2;
                var h = txt_line_height + y_axis_padding * 3;

                // round rect
                g.setStrokeStyle(0);
                g.beginStroke(createjs.Graphics.getRGB(255, 255, 255));
                g.beginFill(createjs.Graphics.getRGB(255, 255, 255));
                g.drawRoundRect(x, y, w, h, 10);

                // little triangle
                g.setStrokeStyle(1);
                g.beginStroke(createjs.Graphics.getRGB(255, 255, 255));

                g.moveTo(x + 13 * box_scale, y + h + 16 * box_scale); //bottom point
                g.quadraticCurveTo(x + 18 * box_scale, y + h + 9 * box_scale, x + 18 * box_scale, y + h); //left curve up

                g.lineTo(x + 36 * box_scale, y + h); //horizontal top line

                //g.moveTo(x+25,y+h);
                g.quadraticCurveTo(x + 28 * box_scale, y + h + 16 * box_scale, x + 13 * box_scale, y + h + 16 * box_scale); //right curve down

                var s = new createjs.Shape(g);

                var group = new createjs.Container();
                group.addChild(s);
                group.addChild(txt);
                return group;
            };

            return AnswerBox;
        }]);
});
