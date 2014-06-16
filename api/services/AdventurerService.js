/**
 * ReferalService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/21
 */

var Q = require('q');

module.exports = (function(){

    function getAdventurer (code, done) {
        Adventurer.findOneByCode(code, function (err, adventurer) {
            done(err, adventurer);
        });
    }

    function addAdventurer (data, done) {
        Adventurer.create({
            email: data.email,
            code: data.code,
            referrals: [],
            visited: 0,
            survey: {
                metric: data.metric,
                topic: data.topic
            }
        }, function (err, adventurer) {
            done(err, adventurer);
        });
    }

    function updateReferrals (email, refCode, done) {
        Adventurer.findOneByCode(refCode, function (err, adventurer) {
            if (adventurer && adventurer.referrals.indexOf(email) === -1) {
                adventurer.referrals.push(email);
                adventurer.save(function (err) {
                    if (err) console.log(err);
                });
            }
        });
    }

    function updateMetric (email, metric, done) {
        Adventurer.update({
            email: email
        }, {
            'survey.metric': metric
        }, function (err, adventurer) {
            if (err) {
                console.log(err);
            }
        });
    }

    function updateTopic (email, topic, done) {
        Adventurer.update({
            email: email
        }, {
            'survey.topic': topic
        }, function (err, adventurer) {
            if (err) {
                console.log(err);
            }
        });
    }

    function updateVisited (code, done) {
        Adventurer.findOneByCode(code, function (err, referrer) {
            if (err) {
                console.log(err);
                done(err, null);
                return;
            }

            referrer.visited++;
            referrer.save(function (err) {
                done(err, referrer);
            });
        });
    }

    function uid (len) {
        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var buf = [],
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    }

    return {
        addAdventurer: addAdventurer,
        getAdventurer: getAdventurer,
        updateReferrals: updateReferrals,
        updateMetric: updateMetric,
        updateTopic: updateTopic,
        updateVisited: updateVisited,
        uid: uid
    };
})();
