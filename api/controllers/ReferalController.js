/**
 * ReferalController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

module.exports = (function(){

    function join (req, res) {
        var email = req.body.email;
        Referal.findByEmail(email, function (err ,referals) {
            if (err) {
                console.log(err);

            }

            if (referals.length > 0) {
                return res.json({
                    status: 'OK',
                    data: {
                        email: referals[0].email,
                        code: referals[0].code,
                        count: referals[0].referals.length,
                        visited: referals[0].visited,
                        status: 'joined'
                    }
                });
            } else {
                var code = uid(6);
                var refCode = req.body.ref;

                if (refCode) {
                    Referal.findOneByCode(refCode, function (err, referal) {
                        if (referal.referals.indexOf(email) !== -1) {
                            referal.referals.push(email);
                            referal.save(function (err) {
                                if (err) console.log(err);
                            });
                        }
                    });
                }

                Referal.create({
                    email: email,
                    code: code,
                    referals: [],
                    visited: 0
                }, function (err, referal) {
                    if (err) {
                        console.log(err);
                    }

                    return res.json({
                        status: 'OK',
                        data: {
                            email: referal.email,
                            code: referal.code,
                            count: referal.referals.length,
                            visited: referal.visited,
                            status: 'newly_joined'
                        }
                    });
                });
            }
        });
    }

    function get (req, res) {
        var code = req.param('code');
        Referal.findOneByCode(code, function (err, referal) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: referal
            });
        });
    }

    function visited (req, res) {
        var code = req.param('code');

        Referal.findOneByCode(code, function (err, referal) {
            if (err) {
                console.log(err);
            }

            referal.visited++;
            referal.save(function (err) {
                if (err) {
                    console.log(err);
                }

                return res.json({
                    status: 'OK',
                    data: referal
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
