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

    function getAdventurer (code, res) {
        Adventurer.findOneByCode(code, function (err, adventurer) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: adventurer
            });
        });
    }

    function addAdventurer (data, res) {
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
            if (err) {
                console.log(err);
            }

            adventurer.count = adventurer.referrals.length;
            adventurer.status = 'newly_joined';

            return res.json({
                status: 'OK',
                data: adventurer
            });
        });
    }

    function updateReferrals (email, refCode) {
        Adventurer.findOneByCode(refCode, function (err, adventurer) {
            if (adventurer && adventurer.referrals.indexOf(email) === -1) {
                adventurer.referrals.push(email);
                adventurer.save(function (err) {
                    if (err) console.log(err);
                });
            }
        });
    }

    function updateMetric (email, metric) {
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

    function updateTopic (email, topic) {
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

    function updateVisited (code, res) {
        Adventurer.findOneByCode(code, function (err, referrer) {
            if (err) {
                console.log(err);
            }

            referrer.visited++;
            referrer.save(function (err) {
                if (err) {
                    console.log(err);
                }

                return res.json({
                    status: 'OK',
                    data: referrer
                });
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
