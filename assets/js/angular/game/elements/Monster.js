/**
 * MonsterElement
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/elements',
    'game/elements/StatusBar',
    'game/services/Global',
    'game/constants/Events',
    'easeljs',
    'tweenjs'
], function (gameElements) {
    'use strict';

    return gameElements

        .factory('Monster', ['Global', 'StatusBar', 'Events', function (Global, StatusBar, Events) {

            var Monster = function(idx,x,y) {
                this.initialize(idx,x,y);
            };

            var p = Monster.prototype = new createjs.Container();

            p.Container_initialize = p.initialize;

            // --------------------
            // AnswerBox
            // --------------------
            p.answer_box = null;
            p.idx = 0;

            p.initialize = function (idx,x,y) {
              this.Container_initialize();
              this.createMonsterSprite();
              this.addChild(this.breathingSprite);
              this.setMonsterPosition(x,y);
              this.setMonsterHealthBar();
              this.setMonsterIndex(idx);
              this.set_animation_event_listener();

              // Desktop Only
              this.mouse_listener_setup();
            }

            // --------------------
            // Sprite Util
            // --------------------
            p.createMonsterSprite = function () {
              // create
              this.breathingSprite = new createjs.Sprite(Global.game.assets.spritesheet,'monster-breathe');
              this.deadSprite = new createjs.Sprite(Global.game.assets.spritesheet,'monster-dead');
              this.dodgeSprite = new createjs.Sprite(Global.game.assets.spritesheet,'monster-dodge');
              this.endouchSprite = new createjs.Sprite(Global.game.assets.spritesheet,'monster-end-ouch');
              this.jumpSprite = new createjs.Sprite(Global.game.assets.spritesheet,'monster-jump');
              this.landedSprite = new createjs.Sprite(Global.game.assets.spritesheet,'monster-landed');
              this.preouchSprite = new createjs.Sprite(Global.game.assets.spritesheet,'monster-pre-ouch');
              this.returnSprite = new createjs.Sprite(Global.game.assets.spritesheet,'monster-return');
              this.selectSprite = new createjs.Sprite(Global.game.assets.spritesheet,'monster-select');

              this.puff0 = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'puff0');
              this.puff1 = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'puff1');
              this.puff2 = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'puff2');
              this.puff3 = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'puff3');
              this.puff4 = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'puff4');
              this.puff_back = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet,'puff_back');


              this.shrink_sprite_by_half(this.breathingSprite);
              this.shrink_sprite_by_half(this.deadSprite);
              this.shrink_sprite_by_half(this.dodgeSprite);
              this.shrink_sprite_by_half(this.endouchSprite);
              this.shrink_sprite_by_half(this.jumpSprite);
              this.shrink_sprite_by_half(this.landedSprite);
              this.shrink_sprite_by_half(this.preouchSprite);
              this.shrink_sprite_by_half(this.returnSprite);
              this.shrink_sprite_by_half(this.selectSprite);

              this.shrink_sprite_by_half(this.puff0);
              this.shrink_sprite_by_half(this.puff1);
              this.shrink_sprite_by_half(this.puff2);
              this.shrink_sprite_by_half(this.puff3);
              this.shrink_sprite_by_half(this.puff4);
              this.shrink_sprite_by_half(this.puff_back);

            }

            // -- this part is hack
            p.shrink_sprite_by_half = function(sprite){
              sprite.scaleX = sprite.scaleX*0.5;
              sprite.scaleY = sprite.scaleY*0.5;
            }

            p.setMonsterPosition = function(x,y){
              this.x = x;
              this.y = y;
            }

            p.setMonsterIndex = function(idx){
              this.idx = idx;
            }

            p.show = function (selected_bitmap_animation) {
              this.addChild(selected_bitmap_animation);
            }

            p.hide = function (selected_bitmap_animation) {
              this.removeChild(selected_bitmap_animation);
            }


            // --------------------
            // Mouse Listener
            // --------------------
            p.set_animation_event_listener = function(){
              this.selectSprite.on('click', this.trigger_hero_attack.bind(this));
              this.dodgeSprite.addEventListener('animationend',this.dodge_animation_attack.bind(this));
              this.landedSprite.addEventListener('animationend',this.return_to_original_pos.bind(this));
              this.preouchSprite.addEventListener('animationend',this.get_hit_by_hero_pre.bind(this));
              this.endouchSprite.addEventListener('animationend',this.get_hit_by_hero_end.bind(this));
            }


            // --------------------
            // HealthBar
            // --------------------
            p.setMonsterHealthBar = function(){
              this.hp_bar = new StatusBar('life');

              // setup x,y
              this.hp_bar.x = 55/Global.game.scale_idx;
              this.hp_bar.y = 210/Global.game.scale_idx;

              this.addChild(this.hp_bar);

              // animate init health
              this.hp_bar.update_bar(0,1,this.hp_bar.colorsets['life_bar_lightred']);
              this.life_percentage = 1;
            }

            p.toggle_status_bar = function (action) {
              if(action==='show'){
                var tween = createjs.Tween.get(this.hp_bar)
                .to({alpha:1},300);
              }else if(action==='hide'){
                var tween = createjs.Tween.get(this.hp_bar)
                .to({alpha:0},300);
              }
            }

            // --------------------
            //  Animation
            // --------------------
            p.trigger_hero_attack = function(){
              var event = new createjs.Event(Events.TRIGGER_HERO_ATTACK);
              event.target_monster = this;
              Global.game.hero_obj.dispatchEvent(event);

              this.set_monster_hoverbility(false);
            }

            // ---------------------------------
            // ---------------------------------
            // Monster Animation (GOT HIT)
            // ---------------------------------
            // ---------------------------------

            p.get_hit_by_hero_pre = function(){
              this.hide(this.preouchSprite);
              this.show(this.endouchSprite);
            }

            p.get_hit_by_hero_end = function(){

              this.hide(this.endouchSprite);
              this.show(this.breathingSprite);

              var isAnswerCorrect = Global.game.question.did_user_get_it_right(this);
              if(isAnswerCorrect){
                // dec in health
                this.hp_bar.update_bar(this.life_percentage,this.life_percentage-0.5,this.hp_bar.colorsets['life_bar_lightred']);
                this.life_percentage = this.life_percentage - 0.5;

                // handle monster death
                if(this.life_percentage===0){

                  this.hide(this.breathingSprite);
                  this.show(this.deadSprite);

                  // this.show(this.deadSprite);
                  this.deadSprite.regX= 200/Global.game.scale_idx;
                  this.deadSprite.regY = 147/Global.game.scale_idx;

                  // Mobile HACK
                  this.deadSprite.x += 50;
                  this.deadSprite.y += 38;



                  var flyout_path = [ 150/Global.game.scale_idx,150/Global.game.scale_idx,
                                      400/Global.game.scale_idx, -200/Global.game.scale_idx,
                                      600/Global.game.scale_idx,120/Global.game.scale_idx];

                  // this.draw_a_dot(200/2,147/2);
                  // this.draw_a_dot(flyout_path[0],flyout_path[1]);
                  // this.draw_a_dot(flyout_path[2],flyout_path[3]);
                  // this.draw_a_dot(flyout_path[4],flyout_path[5]);

                  // animate monster dead and puff
                  var tween = createjs.Tween.get(this.deadSprite)
                  .to({guide:{path:flyout_path}, rotation:360},800)
                  .call(this.play_dead_out_and_puff.bind(this))
                  .wait(500)
                  .to({alpha:0},1000);

                  this.remove_monster();

                }

                if(Global.game.hero_obj.life_percentage!==0){
                  Global.game.question.render_next_question();
                }

                // // unlock monster
                this.set_monster_hoverbility(true);
              }
            }


            p.play_dead_out_and_puff = function(){

              this.deadSprite.gotoAndStop(3);

              var puff_list = [this.puff0,this.puff1,this.puff2,this.puff3,this.puff4];
              var time_list = [180,480,330,480,330];
              var expand_list = [150,200,150,200,150];

              for(var i=0;i<puff_list.length;i++){
                puff_list[i].x = 620/Global.game.scale_idx;
                puff_list[i].y = 210/Global.game.scale_idx;
                puff_list[i].scaleX = 0.1;
                puff_list[i].scaleY = 0.1;
                puff_list[i].alpha = 1;
                var tween = createjs.Tween.get(puff_list[i])
                .to({scaleX:0.7,scaleY:0.7,x:470/Global.game.scale_idx,y:40/Global.game.scale_idx}, expand_list[i])
                .to({alpha:0},time_list[i]);
              }

              this.puff_back.x =  620/Global.game.scale_idx;
              this.puff_back.y = 210/Global.game.scale_idx;
              this.puff_back.scaleX = 0.1;
              this.puff_back.scaleY = 0.1;
              this.puff_back.alpha = 1;
              var tween = createjs.Tween.get(this.puff_back)
              .to({scaleX:0.7,scaleY:0.7,x:470/Global.game.scale_idx,y:40/Global.game.scale_idx}, 150)
              .to({alpha:0},180);

              this.addChildAt(this.puff_back, this.getChildIndex(this.deadSprite));
              this.addChild(this.puff0,this.puff1,this.puff2,this.puff3,this.puff4);
            }


            p.remove_monster = function () {
              // remove life bar
              this.toggle_status_bar('hide');

              // remove monster from list
              var idx = _.indexOf(Global.game.monster_list,this);
              Global.game.monster_list.splice(idx, 1);

              // remove speech box
              var tween = createjs.Tween.get(this.answer_box)
              .to({alpha:0},500);
            }

            // ---------------------------------
            // ---------------------------------
            // Monster Animation (DODGE)
            // ---------------------------------
            // ---------------------------------

            Monster.prototype.dodge_animation_config = function(){

              var pivot_coordinates = {
                1:[950,100, 1100, 650, 1100,300],
                2:[950,100, 1100, 650, 1400,500],
                3:[950,100, 1100, 650, 1600,650],
                4:[950,200, 1100, 650, 1300,800]
              }
              var pivot = pivot_coordinates[this.idx];

              // draw path pivot points (debug use)
              // this.draw_a_dot(pivot[0]/Global.game.scale_idx-this.x,pivot[1]/Global.game.scale_idx-this.y);
              // this.draw_a_dot(pivot[2]/Global.game.scale_idx-this.x,pivot[3]/Global.game.scale_idx-this.y);
              // this.draw_a_dot(pivot[4]/Global.game.scale_idx-this.x,pivot[5]/Global.game.scale_idx-this.y);

              // monster dodge and attack path

              // var expend_scale = 1+1/Global.game.scale_idx;
              var expend_scale = 3;
              var fuck_scale = 2;

              var path_pos_1 = [  55,20,
                                  pivot[0]/Global.game.scale_idx-this.x, pivot[1]/Global.game.scale_idx-this.y,
                                  Global.game.hero_obj.breathingSprite.x+200*expend_scale-this.x,Global.game.hero_obj.breathingSprite.y+170*expend_scale-this.y];

              var path_pos_2 = [  Global.game.hero_obj.breathingSprite.x+200*expend_scale-this.x,Global.game.hero_obj.breathingSprite.y+170*expend_scale-this.y,
                                  pivot[2]/Global.game.scale_idx-this.x, pivot[3]/Global.game.scale_idx-this.y,
                                  Global.game.hero_obj.breathingSprite.x+530*fuck_scale-this.x,Global.game.hero_obj.breathingSprite.y+270*2.3-this.y];

              var path_pos_3 = [  Global.game.hero_obj.breathingSprite.x+530*fuck_scale-this.x,Global.game.hero_obj.breathingSprite.y+270*2.3-this.y,
                                  pivot[4]/Global.game.scale_idx-this.x, pivot[5]/Global.game.scale_idx-this.y,
                                  0,this.breathingSprite.y];

              return [path_pos_1,path_pos_2,path_pos_3];
            }


            p.dodge_animation_attack = function(){

              var path_config = this.dodge_animation_config();

              this.hide(this.dodgeSprite);
              this.show(this.jumpSprite);

              // compensating for rotation x pos change
              this.jumpSprite.x = path_config[0][0];
              this.jumpSprite.y = 0;
              this.jumpSprite.rotation = 0;

              // // monster complete dodge process
              var tween = createjs.Tween.get(this.jumpSprite)
              .to({rotation:-20},400) // smooth into rotation
              .to({guide:{path:path_config[0]}}, 300)
              .call(Global.game.hero_obj.hit_by_monster.bind(Global.game.hero_obj))
              .to({guide:{path:path_config[1]}}, 300,createjs.Ease.cubicIn)
              .to({rotation:0},100)
              .call(this.dodge_animation_smile.bind(this));

              // remove life bar
              this.toggle_status_bar('hide');
              // hide ansewr box
              var tween = createjs.Tween.get(this.answer_box)
              .to({alpha:0},200);
            }

            p.dodge_animation_smile = function(){
              var path_config = this.dodge_animation_config();
              // hide jump and show smile for one iteration
              this.hide(this.jumpSprite);
              this.landedSprite.x = path_config[2][0];
              this.landedSprite.y = path_config[2][1];
              this.show(this.landedSprite);
            }

            p.return_to_original_pos = function(){

              var path_config = this.dodge_animation_config();
              var fuck_this = this;
              var tween = createjs.Tween.get(this.landedSprite)
              .to({guide:{path:path_config[2]}}, 400,createjs.Ease.cubicIn)
              .wait(200)
              .call(function(){

                // unlock hover for all monsters
                if(Global.game.hero_obj.life_percentage!==0){
                  Global.game.question.render_next_question();
                }

                // show breath
                fuck_this.hide(fuck_this.landedSprite);
                fuck_this.show(fuck_this.breathingSprite);


                // show life bar
                fuck_this.toggle_status_bar('show');

                // Desktop
                fuck_this.set_monster_hoverbility(true);
              });
            }



            p.draw_a_dot = function(x,y){
              var g = new createjs.Graphics();
              g.setStrokeStyle(1); g.beginStroke(createjs.Graphics.getRGB(0,0,0));
              g.beginFill(createjs.Graphics.getRGB(255,0,0));
              g.drawCircle(0,0,10);
              var s = new createjs.Shape(g);
              s.x = x ; s.y = y;
              this.addChild(s);
            }


            // --------------------
            // Mouse Event
            // --------------------
            p.isHoverListening = false;

            p.mouse_listener_setup = function () {
              var parent = this;
              // hover start listening
              this.breathingSprite.addEventListener('mouseover', this.monster_hover_in.bind(this));
              this.selectSprite.addEventListener('mouseout', this.monster_hover_out.bind(this));
              this.selectSprite.cursor = 'pointer';
              this.isHoverListening = true;
            }

            // ----------------------------
            // Mouse Hover Listener: didn't get removeEventListener doesn't work, otherwise I will use it.
            // ----------------------------

            p.monster_hover_in = function () {
              console.log('hover in');
              var parent = this; // parent is monster scope we passed in
              if(this.isHoverListening===true){
                for(var i=0;i<Global.game.monster_list.length;i++){
                  Global.game.monster_list[i].hide(Global.game.monster_list[i].selectSprite);
                  Global.game.monster_list[i].show(Global.game.monster_list[i].breathingSprite);
                }
                parent.hide(parent.breathingSprite);
                parent.show(parent.selectSprite);
              }
            }

            p.monster_hover_out = function () {
              var parent = this; // parent is monster scope we passed in
              if(this.isHoverListening){
                parent.show(parent.breathingSprite);
                parent.hide(parent.selectSprite);
              }
            }

            p.set_monster_hoverbility = function (action) {
              for(var i=0;i<Global.game.monster_list.length;i++){
                Global.game.monster_list[i].isHoverListening = action;
              }
            }

            return Monster;
        }]);
});
