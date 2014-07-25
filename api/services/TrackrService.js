/**
 * TrackrService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/07/04
 */

var geoip = require('geoip-lite');

module.exports = (function(){

    function uid (len) {
        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        len = len || 10;

        var buf = [],
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    }

    function save (trackrData, cb) {
        Trackr.findOne({
            trackrId: trackrData.id,
            //name: trackrData.name
        }, function (err, data) {
            if (err) {
                console.log(err);
                cb(err, null);
            }

            trackrData.info.timestamp = Date.now();

            if (data) {
                if (!data.email && trackrData.email) {
                    data.email = trackrData.email;
                }

                data.eventHistory.push(trackrData.info);
                data.save(function (err) {
                    if (err) {
                        cb(err, null);
                    }

                    cb(null, data);
                });
            } else {
                data = {
                    trackrId: trackrData.id,
                    name: trackrData.name,
                    userCategory: trackrData.userCategory,
                    email: trackrData.email,
                    refCode: trackrData.refCode,

                    eventHistory: [
                        trackrData.info
                    ],
                    userInfo: {
                        remoteIP: trackrData.ip,
                        location: geoip.lookup(trackrData.ip),
                        userAgent: trackrData.userAgent
                    }
                };

                Trackr.create(data, function (err) {
                    if (err) {
                        cb(err, null);
                    }

                    cb(null, data);
                });
            }
        });
    }

    function list (cb) {
        Trackr.find().done(function (err, data) {
            if (err) {
                cb(err, null);
            }

            cb(null, data);
        });
    }

    return {
        uid: uid,
        save: save,
        list: list
    };
})();
