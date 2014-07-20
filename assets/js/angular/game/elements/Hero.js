/**
 * HeroElement
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

        .factory('Hero', ['Global', 'StatusBar', 'Events', function (Global, StatusBar, Events) {

            var Hero = function (x, y) {
                this.initialize(x, y);
            };

            var p = Hero.prototype = new createjs.Container();

            p.targetMonster = null;

            p.Container_initialize = p.initialize;
            p.initialize = function (x, y) {
                this.Container_initialize();

                this.createHeroSprite();
                this.addChild(this.breathingSprite);

                this.setHeroPosition(x, y);
                this.setHeroHealthBar();
                this.set_animation_event_listener();

                this.spark_hacks();
            };

            p.createHeroSprite = function () {
                this.breathingSprite = new createjs.Sprite(Global.game.assets.spritesheet, 'warrior-breathe');
                this.preAttackSprite = new createjs.Sprite(Global.game.assets.spritesheet, 'warrior-pre-attack');
                this.endAttackSprite = new createjs.Sprite(Global.game.assets.spritesheet, 'warrior-end-attack');
                this.AttackSprite = new createjs.Sprite(Global.game.assets.spritesheet, 'warrior-hack');
                this.ouchSprite = new createjs.Sprite(Global.game.assets.spritesheet, 'warrior-ouch');
                this.moveSprite = new createjs.Sprite(Global.game.assets.spritesheet, 'warrior-breathe');

                this.hitRedSprite = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet, 'hit_red');
                this.hitWhiteSprite = new createjs.Sprite(Global.game.assets.specialEffectsSpriteSheet, 'hit_white');

                this.shrink_sprite_by_half(this.breathingSprite);
                this.shrink_sprite_by_half(this.preAttackSprite);
                this.shrink_sprite_by_half(this.endAttackSprite);
                this.shrink_sprite_by_half(this.AttackSprite);
                this.shrink_sprite_by_half(this.ouchSprite);
                this.shrink_sprite_by_half(this.moveSprite);

                this.shrink_sprite_by_half(this.hitRedSprite);
                this.shrink_sprite_by_half(this.hitWhiteSprite);
            };

            // -- this part is hack
            p.shrink_sprite_by_half = function (sprite) {
                sprite.scaleX = sprite.scaleX * 0.5;
                sprite.scaleY = sprite.scaleY * 0.5;
            };

            p.setHeroPosition = function (x, y) {
                this.x = x;
                this.y = y;
            };

            p.setHeroHealthBar = function () {
                this.hp_bar = new StatusBar('life');

                // setup x,y
                this.hp_bar.x = 170 / Global.game.scale_idx;
                this.hp_bar.y = 450 / Global.game.scale_idx;

                this.addChild(this.hp_bar);

                // animate init health
                this.hp_bar.update_bar(0, 1, this.hp_bar.colorsets.life_bar_lightred);
                this.life_percentage = 1;
            };

            p.show = function (selected_bitmap_animation) {
                this.addChild(selected_bitmap_animation);
            };

            p.hide = function (selected_bitmap_animation) {
                this.removeChild(selected_bitmap_animation);
            };

            p.set_target_monster = function (target_monster) {
                this.targetMonster = target_monster;
            };

            // --------------------
            // Animation Listener
            // --------------------
            p.set_animation_event_listener = function () {
                this.on(Events.TRIGGER_HERO_ATTACK, this.move_and_swing_swords);
                this.AttackSprite.addEventListener('animationend', this.return_to_original_pos.bind(this));
                this.preAttackSprite.addEventListener('animationend', this.play_explode_attack_monster.bind(this));
                this.endAttackSprite.addEventListener('animationend', this.end_attack_response.bind(this));
            };

            p.toggle_status_bar = function (action) {
                if (action === 'show') {
                    createjs.Tween.get(this.hp_bar).to({ alpha: 1 }, 300);
                } else if (action === 'hide') {
                    createjs.Tween.get(this.hp_bar).to({ alpha: 0 }, 300);
                }
            };

            // --------------------
            // Animation
            // --------------------
            p.move_and_swing_swords = function (e) {

                // set target monster
                var target_monster = e.target_monster;
                this.set_target_monster(target_monster);

                // deal with laywer z order (monster top or hero top)
                for (var i = 0; i < Global.game.monster_list.length; i++) {
                    Global.game.main.setChildIndex(this, 7);
                }

                if (this.targetMonster === Global.game.monster_list[2]) {
                    var hero_idx = Global.game.main.getChildIndex(Global.game.monster_list[3]);
                    Global.game.main.setChildIndex(this,hero_idx);
                }

                // -- show hero move
                this.hide(this.breathingSprite);
                this.show(this.moveSprite);

                // // (Mobile) - change monster to selected
                // target_monster.hide(target_monster.breathingSprite);
                // target_monster.hide(target_monster.selectSprite);

                // hide status bar
                this.toggle_status_bar('hide');

                // -- move hero to monster
                var this_hero = this;
                createjs.Tween.get(this.moveSprite).to({x:target_monster.x-400/Global.game.scale_idx-this.x}, 300);
                createjs.Tween.get(this.moveSprite).to({y:target_monster.y-230/Global.game.scale_idx-this.y}, 300).
                call(function(){
                    var isAnswerCorrect = Global.game.question.did_user_get_it_right(target_monster);
                    if(isAnswerCorrect){
                        // -- hide monster select animation
                        target_monster.hide(target_monster.selectSprite);
                        target_monster.show(target_monster.preouchSprite);

                        this_hero.preAttackSprite.x = target_monster.x-400/Global.game.scale_idx-this_hero.x;
                        this_hero.preAttackSprite.y = target_monster.y-230/Global.game.scale_idx-this_hero.y;
                        this_hero.hide(this_hero.moveSprite);
                        this_hero.show(this_hero.preAttackSprite);

                    }else{
                        // -- hide monster select animation
                        target_monster.hide(target_monster.selectSprite);
                        target_monster.show(target_monster.dodgeSprite);

                        this_hero.AttackSprite.x = target_monster.x-400/Global.game.scale_idx-this_hero.x;
                        this_hero.AttackSprite.y = target_monster.y-230/Global.game.scale_idx-this_hero.y;
                        this_hero.hide(this_hero.moveSprite);
                        this_hero.show(this_hero.AttackSprite);
                    }
                });
            };

            p.return_to_original_pos = function(){

                this.moveSprite.x = this.AttackSprite.x;
                this.moveSprite.y = this.AttackSprite.y;

                this.hide(this.AttackSprite);
                this.show(this.moveSprite);

                // hero start moving back to original location
                createjs.Tween.get(this.moveSprite).to({x:0}, 300);
                createjs.Tween.get(this.moveSprite).to({y:0}, 300);

                // show status bar
                this.toggle_status_bar('show');
            };

            p.play_explode_attack_monster = function(){

                var spark_scale_idx = 2;

                this.hitRedSprite.x = this.preAttackSprite.x+230*spark_scale_idx;
                this.hitRedSprite.y = this.preAttackSprite.y+145*spark_scale_idx;
                this.hitRedSprite.rotation = -110;
                this.hitRedSprite.alpha = 1;
                this.hitRedSprite.scaleX = 0.1;
                this.hitRedSprite.scaleY = 0.1;


                this.hitWhiteSprite.x = this.preAttackSprite.x+230*spark_scale_idx;
                this.hitWhiteSprite.y = this.preAttackSprite.y+145*spark_scale_idx;
                this.hitWhiteSprite.rotation = -110;
                this.hitWhiteSprite.alpha = 1;
                this.hitWhiteSprite.scaleX = 0.1;
                this.hitWhiteSprite.scaleY = 0.1;

                this.addChildAt(this.hitWhiteSprite,this.getChildIndex(this.preAttackSprite));
                this.show(this.hitRedSprite);


                createjs.Tween.get(this.hitRedSprite)
                    .to({scaleX:0.6,scaleY:0.6,x:this.preAttackSprite.x+220*spark_scale_idx,y:this.preAttackSprite.y+215*spark_scale_idx}, 150)
                    .to({alpha:0},200);

                // //------------------------
                // // HACK - Dangerous Hack Applied Here
                // //------------------------
                var fuck_this = this;
                var tween = createjs.Tween.get(this.hitWhiteSprite)
                    .to({scaleX:0.6,scaleY:0.6,x:this.preAttackSprite.x+220*spark_scale_idx,y:this.preAttackSprite.y+215*spark_scale_idx}, 150)
                    .to({alpha:0},200)
                    .call(function(){
                        fuck_this.spark_hacks();
                    });

                this.endAttackSprite.x = this.preAttackSprite.x;
                this.endAttackSprite.y = this.preAttackSprite.y;
                this.hide(this.preAttackSprite);
                this.show(this.endAttackSprite);
            };

            p.end_attack_response = function(){
                var targetM = this.targetMonster;

                // show hero move
                this.hide(this.endAttackSprite);
                this.show(this.moveSprite);

                // hero start moving back to original location
                createjs.Tween.get(this.moveSprite).to({x:0}, 300);
                createjs.Tween.get(this.moveSprite).to({y:0}, 300);

                // show status bar
                this.toggle_status_bar('show');
            };

            p.hit_by_monster = function(){
                // hide hero move
                this.hide(this.moveSprite);
                this.show(this.ouchSprite);

                // putting hero ouch under monster jump
                Global.game.main.addChildAt(this, Global.game.main.getChildIndex(this.targetMonster));

                // play hero get hit
                this.ouchSprite.gotoAndStop(36);

                this.hitRedSprite.x = Global.game.hero_obj.x + 242 / Global.game.scale_idx;
                this.hitRedSprite.y = Global.game.hero_obj.y + 215 / Global.game.scale_idx;
                this.hitRedSprite.rotation = 0;
                this.hitRedSprite.alpha = 1;
                this.hitRedSprite.scaleX = 0.1;
                this.hitRedSprite.scaleY = 0.1;

                this.hitWhiteSprite.x = 242 / Global.game.scale_idx;
                this.hitWhiteSprite.y = 215 / Global.game.scale_idx;
                this.hitWhiteSprite.rotation = 0;
                this.hitWhiteSprite.alpha = 1;
                this.hitWhiteSprite.scaleX = 0.1;
                this.hitWhiteSprite.scaleY = 0.1;

                var tween = createjs.Tween.get(this.hitRedSprite)
                // .to({scaleX:1.0,scaleY:1.0,x:65,y:50/2}, 150)
                .to({scaleX:1.0,scaleY:1.0,x:Global.game.hero_obj.x+50,y:Global.game.hero_obj.y+50/Global.game.scale_idx}, 150)
                .to({alpha:0},200);

                var fuck_this = this;
                tween = createjs.Tween.get(this.hitWhiteSprite)
                    .to({scaleX:1.0,scaleY:1.0,x:65,y:55/Global.game.scale_idx}, 150)
                    // .to({scaleX:1.0,scaleY:1.0,x:Global.game.hero_obj.x+50,y:Global.game.hero_obj.y+55/2}, 150)
                    .to({alpha:0},200)
                    .call(function(){
                        fuck_this.hide(fuck_this.ouchSprite);
                        fuck_this.show(fuck_this.breathingSprite);

                        // dec in health
                        fuck_this.hp_bar.update_bar(fuck_this.life_percentage,fuck_this.life_percentage-0.25,fuck_this.hp_bar.colorsets.life_bar_lightred);
                        fuck_this.life_percentage = fuck_this.life_percentage - 0.25;

                        if (fuck_this.life_percentage === 0) {
                            Global.game.main.game_over_handler();
                        }

                        //------------------------
                        // HACK - Dangerous Hack Applied Here
                        //------------------------
                        fuck_this.spark_hacks_hit_by_monster();
                    });

                // putting hit_white under monster_jump
                this.show(this.hitWhiteSprite);
                // putting hit_red on top of everyone
                Global.game.main.addChild(this.hitRedSprite);
            };

            // --------------------
            // Very Fuckedup Hacks
            // Reasons:
            //    When hitRed,hitWhite are scaling up, there is performance delay that is unacceptable
            //    This is not caused by preload assets, really not sure why the fuck it does this.
            // Solution:
            //    I can't find any pretty solution, but I find out that if I render the sprite somewhere
            //    prior to scaling it with Tween, it won't give me trouble. So I pre render both hitWhite,hitRed
            //    behind the fucking background, hopefully we will find the solution for this soon
            // --------------------
            p.spark_hacks = function () {
                this.removeChild(this.hitRedSprite);
                this.removeChild(this.hitWhiteSprite);
                Global.game.main.removeChild(this.hitRedSprite);
                Global.game.main.removeChild(this.hitWhiteSprite);

                this.hitRedSprite.x = -100;
                this.hitRedSprite.y = -200;
                this.hitRedSprite.rotation = -110;
                this.hitRedSprite.alpha = 1;
                this.hitRedSprite.scaleX = 0.5;
                this.hitRedSprite.scaleY = 0.5;

                this.hitWhiteSprite.x = -100;
                this.hitWhiteSprite.y = -200;
                this.hitWhiteSprite.rotation = -110;
                this.hitWhiteSprite.alpha = 1;
                this.hitWhiteSprite.scaleX = 0.5;
                this.hitWhiteSprite.scaleY = 0.5;
                Global.game.main.addChildAt(this.hitRedSprite, 0);
                Global.game.main.addChildAt(this.hitWhiteSprite, 0);
            };

            p.spark_hacks_hit_by_monster = function () {
                Global.game.main.removeChild(this.hitRedSprite);
                this.removeChild(this.hitWhiteSprite);

                this.hitRedSprite.x = -100;
                this.hitRedSprite.y = -200;
                this.hitRedSprite.rotation = -110;
                this.hitRedSprite.alpha = 1;
                this.hitRedSprite.scaleX = 0.5;
                this.hitRedSprite.scaleY = 0.5;

                this.hitWhiteSprite.x = -100;
                this.hitWhiteSprite.y = -200;
                this.hitWhiteSprite.rotation = -110;
                this.hitWhiteSprite.alpha = 1;
                this.hitWhiteSprite.scaleX = 0.5;
                this.hitWhiteSprite.scaleY = 0.5;
                Global.game.main.addChildAt(this.hitRedSprite,0);
                Global.game.main.addChildAt(this.hitWhiteSprite,0);
            };

            return Hero;
        }]);
});
