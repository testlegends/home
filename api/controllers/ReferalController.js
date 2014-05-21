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
                        count: referals[0].length
                    }
                });
            } else {
                var code = uid(6);
                Referal.create({
                    email: email,
                    code: code,
                    referals: []
                }, function (err, referal) {
                    if (err) {
                        console.log(err);
                    }

                    return res.json({
                        status: 'OK',
                        data: {
                            email: referal.email,
                            code: referal.code
                        }
                    });
                });
            }
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

        _config: {
            blueprints: {
                actions: false
            }
        }
    };
})();
