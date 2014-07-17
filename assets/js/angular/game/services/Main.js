/**
 * MainService
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/services',
    'game/services/Global',
    'game/services/AssetManager',
    'game/states/Game',
    'game/states/GameLose',
    'game/states/GameWin',
    'game/elements/Preloader',
    'game/constants/Events',
    'game/constants/GameStates',
    'easeljs'
], function (gameServices) {
    'use strict';

    return gameServices

        .factory('Main', ['Global' ,'AssetManager', 'Game', 'GameLose', 'GameWin', 'Preloader', 'Events', 'GameStates', function (Global, AssetManager, Game, GameLose, GameWin, Preloader, Events, GameStates) {

            var Main = function () {
                this.initialize();
            };

            var p = Main.prototype = new createjs.Container();

            p.Container_initialize = p.initialize;
            p.initialize = function(){
                this.Container_initialize();
                Global.stage = new createjs.Stage(Global.canvas);
                Global.stage.enableMouseOver(); // Desktop Only
                this.preloadAssets();
            };

            p.preloadAssets = function () {
                this.assets = new AssetManager();

                // render preloader bar
                this.preloader = new Preloader('#d2354c', '#000');
                this.preloader.x = (Global.canvas.width / 2) - (this.preloader.width / 2);
                this.preloader.y = (Global.canvas.height / 2) - (this.preloader.height / 2);
                Global.stage.addChild(this.preloader);

                this.assets.on(Events.ASSETS_PROGRESS, this.onAssetsProgress, this);
                this.assets.on(Events.ASSETS_COMPLETE, this.onAssetsReady, this);
                this.assets.preloadAssets();
            };

            p.onAssetsProgress = function () {
                this.preloader.update(this.assets.loadProgress);
                Global.stage.update();
            };

            p.onAssetsReady = function () {
                Global.stage.removeChild(this.preloader);
                this.onGameReady();
            };

            p.onGameReady = function () {
                createjs.Ticker.on(Events.TICK, this.onTick, this);
                //createjs.Ticker.setFPS(40);
                this.changeState(GameStates.START);
                this.onTick();
            };

            p.onTick = function (e) {
                if (this.currentGameStateFunction !== null) {
                    this.currentGameStateFunction();
                }
                Global.stage.update();
            };

            p.changeState = function (state) {
                switch (state) {
                    case GameStates.START:
                        this.currentGameStateFunction = this.gameStateStart;
                        break;
                    case GameStates.WIN:
                        this.currentGameStateFunction = this.gameStateWin;
                        break;
                    case GameStates.LOSE:
                        this.currentGameStateFunction = this.gameStateLose;
                        break;
                    case GameStates.IDLE:
                        this.currentGameStateFunction = this.gameStateIdle;
                        break;
                }
            };

            p.gameStateStart = function () {
                var scene = new Game(this);
                Global.stage.addChild(scene);

                this.disposeCurrentScene();
                this.currentScene = scene;

                this.changeState(GameStates.IDLE);
            };

            p.gameStateWin = function () {
                var scene = new GameWin();
                Global.stage.addChild(scene);

                this.disposeCurrentScene()
                this.currentScene = scene;

                this.changeState(GameStates.IDLE);
            }

            p.gameStateLose = function () {
                var scene = new GameLose();
                Global.stage.addChild(scene);

                this.disposeCurrentScene()
                this.currentScene = scene;

                this.changeState(GameStates.IDLE);
            }

            p.gameStateIdle = function () {

            };

            p.disposeCurrentScene = function () {
                if (this.currentScene && this.currentScene !== null) {
                    Global.stage.removeChild(this.currentScene);
                    if (this.currentScene.dispose) {
                        this.currentScene.dispose();
                    }
                    this.currentScene = null;
                }
            };

            return Main;
        }]);
});
