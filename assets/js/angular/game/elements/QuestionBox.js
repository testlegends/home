/**
 * QuestionBoxElement
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'underscore',
    'game/elements',
    'game/elements/AnswerBox',
    'game/services/Global',
    'game/services/Questions',
    'easeljs'
], function (_, gameElements) {
    'use strict';

    return gameElements

        .factory('QuestionBox', ['Global', 'Questions', 'AnswerBox', function (Global, Questions, AnswerBox) {

          var QuestionBox = function(x,y,question_str) {
            this.initialize(x,y,question_str);
          }

          var p = QuestionBox.prototype = new createjs.Container();

          p.Container_initialize = p.initialize;
          p.current_question = '',
          p.current_question_text = '',

          p.initialize = function (x,y,question_str) {
            this.Container_initialize();
            this.set_question_box_position(x, y);
            this.question_list = Questions.getList();
            this.render_next_question();
          }

          p.set_question_box_position = function(x,y){
              this.x = x;
              this.y = y;
          }

          // ----------------------------
          // Question Manager
          // ----------------------------
          p.render_next_question = function () {

            // user win
            if(this.question_list.length===0){
              Global.game.main.win_handler();
            }
            else{
              var next_q = this.question_list.pop();


              // dealing with question
              if (this.current_question){
                this.removeChild(this.current_question);
              }

              // render
              this.current_question = this.draw_question_box(
                  Global.canvas.width * 0.28 * Global.game.scale_idx,
                  Global.canvas.height * 0.042 * Global.game.scale_idx,
                  next_q.Question
              );

              this.current_question_text = next_q;
              this.addChild(this.current_question);

              var idx = _.indexOf(next_q.Options, next_q.Answer);

              // dealing with options (handle monster dead)
              next_q.Options.splice(idx,1);
              var newlist = [next_q.Answer];
              for(var i=0;i<Global.game.monster_list.length-1;i++){
                  newlist.push(next_q.Options[i]);
              }
              newlist = _.shuffle(newlist);

              // loading monster answer box
              for(var i=0;i<Global.game.monster_list.length;i++){

                // remove old answer box
                if(Global.game.monster_list[i].answer_box){
                  Global.game.monster_list[i].removeChild(Global.game.monster_list[i].answer_box);
                }

                // add answer box
                Global.game.monster_list[i].answer_box = new AnswerBox(newlist[i]);
                Global.game.monster_list[i].answer_box.x = 0 + Global.canvas.width*0.085*Global.game.scale_idx;
                Global.game.monster_list[i].answer_box.y = 0 - Global.canvas.height*0.065*Global.game.scale_idx;
                Global.game.monster_list[i].addChild(Global.game.monster_list[i].answer_box);
              }

              // reset timer
              Global.game.timer.reset_timer();
            }

          }

          // Tracking correct so we know how many stars to give
          p.did_user_get_it_right = function (targetM) {
              var select_w = targetM.answer_box.answer_text;
              var answer_w = this.current_question_text.Answer;

              return (select_w===answer_w);
          }


          // ----------------------------
          // Question Box Rendering
          // ----------------------------
          p.draw_question_box = function(x,y,txt_str){

            // txt = new createjs.Text(txt_str, "40px Tw Cen MT", "#000000");
            var txt = new createjs.Text(txt_str, "40px Tw Cen MT", "#000000");

            // round rect box padding
            var x_axis_padding = 40/Global.game.scale_idx;
            var y_axis_padding = 20/Global.game.scale_idx;


            // round rect width
            // -- width is global
            var question_box_width = Global.canvas.width*0.4*Global.game.scale_idx+80/Global.game.scale_idx;


            // calculate round box height
            var txt_width = txt.getMeasuredWidth();
            var num_of_lines_needed = Math.ceil(txt_width/(question_box_width - x_axis_padding*Global.game.scale_idx));
            var txt_line_height = txt.getMeasuredLineHeight()+10;
            var txt_height = num_of_lines_needed*txt_line_height;
            txt.set({lineHeight:txt.getMeasuredLineHeight()+10});

            // get rendered round rect
            // -- +5 makes it look better
            var round_rect = this.draw_round_rect_box(question_box_width, txt_height + (y_axis_padding + 5) * Global.game.scale_idx);
            round_rect.alpha = 0.8;


            // start rendering text
            txt.x = x_axis_padding;
            txt.y = y_axis_padding;

            // text line width (max length of each line of text in box)
            txt.lineWidth = question_box_width - x_axis_padding*Global.game.scale_idx-60/Global.game.scale_idx;

            // group the round rect and text
            var group = new createjs.Container();
            group.addChild(round_rect);

            group.addChild(txt);

            return group;
          }

          // ----------------------------
          // Base Functions - Used by draw_dialog_box, draw_question_box
          // ----------------------------
          p.draw_round_rect_box = function(w,h){

            var g = new createjs.Graphics();

            // round rect
            g.setStrokeStyle(1);
            g.beginStroke(createjs.Graphics.getRGB(255,255,255));
            g.beginFill(createjs.Graphics.getRGB(255,255,255));

            // x,y,w,h,border-radius
            g.drawRoundRect(0,0,w,h,10);

            var s = new createjs.Shape(g);
            return s;
          }

            return QuestionBox;
        }]);
});
