/**
 * AdventurerController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

var validator = require('validator');

module.exports = (function(){

    function join (req, res) {
        var email = req.body.email;

        if (!email || !validator.isEmail(email)) {
            return res.json({
                status: 'ERROR',
                msg: 'E-mail invalid'
            });
        }

        Adventurer.findByEmail(email, function (err ,adventurers) {
            if (err) {
                console.log(err);
            }

            if (adventurers.length > 0) {
                adventurers[0].count = adventurers[0].referrals.length;
                adventurers[0].status = 'already_joined';

                return res.json({
                    status: 'OK',
                    data: adventurers[0]
                });
            } else {
                var refCode = req.body.refCode;
                if (refCode) {
                    AdventurerService.updateReferrals(email, refCode);
                }

                var code = AdventurerService.uid(6);
                AdventurerService.addAdventurer({
                    email: email,
                    code: code,
                }, function (err, adventurer) {
                    if (err) {
                        console.log(err);
                    }

                    EmailService.sendWelcomeEmail({
                        email: adventurer.email,
                        code: adventurer.code
                    }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });

                    adventurer.count = adventurer.referrals.length;
                    adventurer.status = 'newly_joined';

                    return res.json({
                        status: 'OK',
                        data: adventurer
                    });
                });
            }
        });
    }

    function get (req, res) {
        var code = req.param('code');

        if (code) {
            AdventurerService.getAdventurer(code, function (err, adventurer) {
                if (err) {
                    console.log(err);
                }

                return res.json({
                    status: 'OK',
                    data: adventurer
                });
            });
        }
    }

    function visited (req, res) {
        var code = req.param('code');

        if (!code) {
            return res.json({
                status: 'OK',
                data: 'No code specified'
            })
        }

        AdventurerService.updateVisited(code, function (err, referrer) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: referrer
            });
        });
    }

    function updateSurvey (req, res) {
        var code = req.param('code');
        var satisfaction = req.body.level;

        if (!code) {
            return res.json({
                status: 'OK',
                data: 'No code specified'
            })
        }

        AdventurerService.updateSurvey(code, {
            satisfaction: satisfaction
        }, function (err, adventurer) {
            return res.json({
                status: 'OK',
                data: adventurer
            });
        });
    }

    function getShares (req, res) {
        var code = req.param('code');

        if (!code) {
            return res.json({
                status: 'ERROR',
                msg: 'No code specified'
            })
        }

        AdventurerService.getAdventurer(code, function (err, adventurer) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: adventurer.referrals
            });
        });
    }

    return {
        join: join,
        visited: visited,
        updateSurvey: updateSurvey,
        get: get,
        getShares: getShares,

        _config: {
            blueprints: {
                actions: false
            }
        }
    };
})();
