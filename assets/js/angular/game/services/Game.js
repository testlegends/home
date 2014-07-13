/**
 * GameService
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/services',
    'game/services/Global',
    'game/elements/Hero',
    'game/elements/Monster',
    'game/elements/QuestionBox',
    'game/elements/Timer',
    'easeljs',
    'tweenjs'
], function (gameServices) {
    'use strict';

    return gameServices

        .factory('Game', ['Global', 'Hero', 'Monster', 'QuestionBox', 'Timer', function (Global, Hero, Monster, QuestionBox, Timer) {

            var Game = function () {
                this.initialize();
            };

            var p = Game.prototype = new createjs.Container();

            p.Container_initialize = p.initialize;
            p.initialize = function () {
                this.Container_initialize();

                // tween path installation
                createjs.MotionGuidePlugin.install();

                Global.game.main = this;

                this.createMonster(1, Global.canvas.width * 0.55  * Global.game.scale_idx, Global.canvas.height * 0.28  * Global.game.scale_idx);
                this.createMonster(2, Global.canvas.width * 0.67  * Global.game.scale_idx, Global.canvas.height * 0.38  * Global.game.scale_idx);
                this.createMonster(3, Global.canvas.width * 0.715 * Global.game.scale_idx, Global.canvas.height * 0.58  * Global.game.scale_idx);
                this.createMonster(4, Global.canvas.width * 0.555 * Global.game.scale_idx, Global.canvas.height * 0.635 * Global.game.scale_idx); // so the 4th monster is in front of character

                this.createHero(Global.canvas.width * 0.2 * Global.game.scale_idx, Global.canvas.height * 0.27 * Global.game.scale_idx);

                this.createTimerAndQuestions();
            };

            p.createMonster = function (idx, x, y) {
                var monster = new Monster(idx, x, y);
                this.addChild(monster);
                Global.game.monster_list.push(monster);
            };

            p.createHero = function (x, y) {
                this.hero = new Hero(x, y);
                this.addChild(this.hero);
                Global.game.hero_obj = this.hero;
            };

            p.createTimerAndQuestions = function () {
                var timer = new Timer(Global.canvas.width * 0.675 * Global.game.scale_idx, Global.canvas.height * 0.03 * Global.game.scale_idx);
                Global.game.timer = timer;

                var question = new QuestionBox(Global.canvas.width * 0.28 * Global.game.scale_idx, Global.canvas.height * 0.042 * Global.game.scale_idx);
                Global.game.question = question;

                this.addChild(question, timer);
            };

            return Game;
        }]);
});
