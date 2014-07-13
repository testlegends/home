/**
 * PreloaderService
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/10
 */

define([
    'game/services',
    'easeljs'
], function (gameServices) {
    'use strict';

    return gameServices

        .factory('Preloader', [function () {

            var Preloader = function (fill, stroke) {
                this.fillColor = fill;
                this.strokeColor = stroke;
                this.width = 400;
                this.height = 40;
                this.initialize();
            };

            var p = Preloader.prototype = new createjs.Container();

            p.Container_initialize = p.initialize;
            p.initialize = function () {
                this.Container_initialize();
                this.drawPreloader();
            };

            p.drawPreloader = function () {
                var outline = new createjs.Shape();
                outline.graphics.beginStroke(this.strokeColor);
                outline.graphics.drawRect(0, 0, this.width, this.height);

                this.bar = new createjs.Shape();
                this.bar.graphics.beginFill(this.fillColor);
                this.bar.graphics.drawRect(0, 0, this.width, this.height);
                this.bar.scaleX = 0;
                this.addChild(this.bar, outline);
            };

            p.update = function (perc) {
                perc = perc > 1 ? 1 : perc;
                this.bar.scaleX = perc;
            };

            return Preloader;
        }]);
});
