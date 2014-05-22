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
                var metric = req.body.metric;
                var topic = req.body.topic;

                if (metric) {
                    AdventurerService.updateMetric(email, metric);
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

                var code = AdventurerService.uid(6);
                AdventurerService.addAdventurer({
                    email: email,
                    code: code,
                    metric: req.body.metric,
                    topic: req.body.topic
                }, res);
            }
        });
    }

    function get (req, res) {
        var code = req.param('code');

        if (code) {
            AdventurerService.getAdventurer(code, res);
        }
    }

    function visited (req, res) {
        var code = req.param('code');

        if (code) {
            AdventurerService.updateVisited(code, res);
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
