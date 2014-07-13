/**
 * AssetManagerService
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/services',
    'game/services/Global',
    'game/constants/Events',
    'game/sprites/game_sprite_sheet',
    'game/sprites/special_effects_sprite_sheet',
    'easeljs',
    'preloadjs'
], function (gameServices) {
    'use strict';

    return gameServices

        .factory('AssetManager', ['Global', 'Events', 'GameSprite', 'SpecialEffectSprite', function (Global, Events, GameSprite, SpecialEffectSprite) {

            var AssetManager = function () {
                this.initialize();
            };

            var p = AssetManager.prototype = new createjs.EventDispatcher();

            p.EventDispatcher_initialize = p.initialize;
            p.initialize = function () {
                this.EventDispatcher_initialize();

                this.manifest = [
                    { manifest: GameSprite, src: '/' },
                    { manifest: SpecialEffectSprite, src: '/' },
                ];
            };

            p.preloadAssets = function () {
                this.queue = new createjs.LoadQueue();
                this.queue.loadManifest(this.manifest);
                this.queue.on(Events.QUEUE_PROGRESS, this.assetsProgress, this);
                this.queue.on(Events.QUEUE_COMPLETE, this.assetsLoaded, this);
            };

            // even with jsonp, preloadjs will count progress, so we can operate after load
            p.assetsProgress = function (e) {
                this.loadProgress = e.progress;
                var event = new createjs.Event(Events.ASSETS_PROGRESS);
                this.dispatchEvent(event);
            };

            p.assetsLoaded = function (e) {
                var event = new createjs.Event(Events.ASSETS_COMPLETE);
                this.dispatchEvent(event);
            };

            return AssetManager;
        }]);
});
