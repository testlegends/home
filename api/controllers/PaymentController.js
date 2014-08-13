/**
 * PaymentController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/09
 */

var Html = require('../helpers/HtmlHelper.js'),
    Form = require('../helpers/FormHelper.js');

module.exports = (function(){

    var helpers = { Html: Html, Form: Form };

    function index (req, res) {
        return res.view(_.extend({
            stripeKey: process.env.STRIPE_KEY_PUBLIC
        }, helpers));
    }

    function charge (req, res) {
        var token = req.body.stripeToken;
        var email = req.body.email;
        var name = req.body.name;
        var cardType = req.body.cardType;

        PaymentService.chargeByPlan('BetaUserPromotion', {
            token: token,
            email: email,
            name: name,
            cardType: cardType
        }, function (err, charge) {
            if (err) {
                console.log(err);

                return res.json({
                    status: 'ERROR',
                    error: err
                })
            }

            return res.json({
                status: 'OK',
                data: charge
            });
        });
    }

    return {
        index: index,
        charge: charge,

        _config: {}
    };
})();
