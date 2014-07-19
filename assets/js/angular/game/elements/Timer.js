/**
 * TimerElement
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/elements',
    'game/services/Global',
    'easeljs'
], function (gameElements) {
    'use strict';

    return gameElements

        .factory('Timer', ['Global', function (Global) {

            var Timer = function (x, y) {
                this.initialize(x,y);
            };

            var p = Timer.prototype = new createjs.Container();

            // Timer Global Variable
            p.timer_sprite = null;
            p.timer_activate_flag = 1;
            p.question_total_time = 20;
            p.question_remain_time = 20;

            p.Container_initialize = p.initialize;
            p.initialize = function (x, y) {
                Global.game.timer = this;
                this.Container_initialize();
                this.set_question_box_position(x, y);
                setInterval(this.main_timer_loop.bind(this), 1000);
            };

            p.set_question_box_position = function (x, y) {
                this.x = x;
                this.y = y;
            };

            // ------------------------------------
            // Main Timer Loop
            // ------------------------------------
            p.main_timer_loop = function () {
                // Time run out
                if(this.question_remain_time===0 && this.timer_activate_flag===1){
                    this.stop_timer();
                    for(var i=0;i<Global.game.monster_list.length;i++){
                        var ans_word = Global.game.question.current_question_text.Answer;
                        if(ans_word===Global.game.monster_list[i].answer_box.answer_text){
                            Global.game.hero_obj.hide(Global.game.hero_obj.breathingSprite);
                            Global.game.hero_obj.show(Global.game.hero_obj.moveSprite);
                            Global.game.monster_list[i].hide(Global.game.monster_list[i].breathingSprite);
                            Global.game.monster_list[i].dodge_animation_attack();
                        }
                    }
                    this.reset_timer();
                }

                if (this.timer_activate_flag === 1) {
                    // deduct time
                    var total_time = this.question_total_time;
                    var curr_time = this.question_remain_time;
                    curr_time = curr_time - 1;
                    curr_time = Math.max(curr_time, 0);
                    this.question_remain_time = curr_time;

                    // New
                    this.render_timer(curr_time, total_time);
                }
            };

            p.stop_timer = function () {
                this.timer_activate_flag = 0;
            };

            p.reset_timer = function () {
                this.question_remain_time = this.question_total_time;
                this.render_timer(this.question_remain_time, this.question_total_time);
                this.timer_activate_flag = 1;
            };

            // ------------------------------------
            // Canvas Timer
            // ------------------------------------
            p.render_timer = function (remain_seconds, total_seconds) {

                var main_x = 0;
                var main_y = 0;
                var base_radius = 89 / Global.game.scale_idx;

                // group
                var group = new createjs.Container();

                // ----------------
                // Outter circle behind the clock
                // ----------------
                var g = new createjs.Graphics();
                g.setStrokeStyle(1);
                g.beginStroke(createjs.Graphics.getRGB(255, 227, 5));
                g.beginFill(createjs.Graphics.getRGB(255, 227, 5));
                g.drawCircle(0, 0, base_radius * 1.15);

                var s = new createjs.Shape(g);
                s.x = main_x + base_radius;
                s.y = main_y + base_radius;

                group.addChild(s);

                // ----------------
                // Inner circle for the clock
                // ----------------
                var yellow_portion = Math.floor(parseFloat(remain_seconds) / parseFloat(total_seconds) * 360);
                var white_portion = Math.floor(parseFloat(total_seconds-remain_seconds) / parseFloat(total_seconds) * 360);

                var data = [white_portion, yellow_portion];
                var colors = [createjs.Graphics.getRGB(255, 227, 5), createjs.Graphics.getRGB(255, 255, 255)];

                g = new createjs.Graphics();

                for (var i = 0; i < data.length; i++) {
                    this.drawSegment(g, i, data, colors, main_x, main_y, base_radius);
                }
                s = new createjs.Shape(g);
                s.x = main_x;
                s.y = main_y;
                group.addChild(s);

                // update countdown
                var text_size = String(base_radius * 1.1) + 'px';
                var text;
                if (remain_seconds / 10 < 1.0) {
                    text = new createjs.Text(String(remain_seconds), text_size + "  Showcard Gothic", "#000000");
                    text.x = main_x+base_radius * 2 * 0.35;
                    text.y = main_y+base_radius * 2 * 0.7;
                    text.textBaseline = "alphabetic";
                    group.addChild(text);
                } else {
                    text = new createjs.Text(String(remain_seconds), text_size + "  Showcard Gothic", "#000000");
                    text.x = main_x+base_radius * 2 * 0.25;
                    text.y = main_y+base_radius * 2 * 0.7;
                    text.textBaseline = "alphabetic";
                    group.addChild(text);
                }

                if (this.timer_sprite !== null) {
                    this.removeChild(this.timer_sprite);
                    this.addChild(group);
                    this.timer_sprite = group;
                } else {
                    this.timer_sprite = group;
                    this.addChild(group);
                }
            };

            p.drawSegment = function (g, i, data, colors, x, y, base_radius) {
                var clock_width = base_radius;
                var centerX = Math.floor(clock_width);
                var centerY = Math.floor(clock_width);
                var radius = Math.floor(clock_width);

                // angle hack -> used to start at 45 deg
                // now it starts at 0 deg
                var start_angle_input = this.sumTo(data, i) - 90;
                if (start_angle_input < 0) {
                    start_angle_input = start_angle_input + 360;
                }

                var startingAngle = this.degreesToRadians(start_angle_input);
                var arcSize = this.degreesToRadians(data[i]);
                var endingAngle = startingAngle + arcSize;

                g.setStrokeStyle(1);
                g.beginFill(colors[i]);
                g.moveTo(centerX, centerY);
                g.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
                g.closePath();

                // var s = new Shape(g);
                // s.x = x;
                // s.y = y;
                // stage.addChild(s);
                // stage.update();
            };

            p.degreesToRadians = function (degrees) {
                return degrees * Math.PI / 180;
            };

            p.sumTo = function (a, i) {
                var sum = 0;
                for (var j = 0; j < i; j++) {
                    sum += a[j];
                }
                return sum;
            };

            return Timer;
        }]);
});
