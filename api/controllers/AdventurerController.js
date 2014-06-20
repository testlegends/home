/**
 * AdventurerController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

module.exports = (function(){

    function join (req, res) {
        var email = req.body.email;

        Adventurer.findByEmail(email, function (err ,adventurers) {
            if (err) {
                console.log(err);
            }

            if (adventurers.length > 0) {
                var assessment = req.body.assessment;
                var topic = req.body.topic;

                if (assessment) {
                    AdventurerService.updateAssessment(email, assessment);
                }

                if (topic) {
                    AdventurerService.updateTopic(email, topic);
                }

                adventurers[0].count = adventurers[0].referrals.length;
                adventurers[0].status = 'already_joined';

                return res.json({
                    status: 'OK',
                    data: adventurers[0]
                });
            } else {
                var refCode = req.body.ref;
                if (refCode) {
                    AdventurerService.updateReferrals(email, refCode);
                }

                var email_format = /\S+@\S+\.\S+/;
                if (!email || !email_format.test(email)) {
                    return res.json({
                        status: 'ERROR',
                        msg: 'E-mail can not be empty'
                    });
                }

                var code = AdventurerService.uid(6);
                AdventurerService.addAdventurer({
                    email: email,
                    code: code,
                    assessment: req.body.assessment,
                    topic: req.body.topic
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

        if (code) {
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
    }

    return {
        join: join,
        get: get,
        visited: visited,

        _config: {
            blueprints: {
                actions: false
            }
        }
    };
})();
