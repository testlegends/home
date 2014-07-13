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
    'game/services/Game',
    'game/elements/Preloader',
    'game/constants/Events',
    'game/constants/GameStates',
    'easeljs'
], function (gameServices) {
    'use strict';

    return gameServices

        .factory('Main', ['Global' ,'AssetManager', 'Game', 'Preloader', 'Events', 'GameStates', function (Global, AssetManager, Game, Preloader, Events, GameStates) {

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
                    case GameStates.ACTION:
                        this.currentGameStateFunction = this.gameStateAction;
                        break;
                    case GameStates.IDLE:
                        this.currentGameStateFunction = this.gameStateIdle;
                        break;
                }
            };

            p.gameStateStart = function () {
                var scene = new Game();
                Global.stage.addChild(scene);

                this.disposeCurrentScene();
                this.currentScene = scene;

                this.changeState(GameStates.IDLE);
            };

            // not used yet
            p.gameStateAction = function () {

            };

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
