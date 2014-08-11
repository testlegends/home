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
        return res.view(helpers);
    }

    function charge (req, res) {
        var token = req.body.stripe_token;
        var email = req.body.email;

        PaymentService.chargeByPlan('BetaUserPromotion', {
            token: token,
            email: email
        }, function (err, charge) {
            return res.json({

            });
        });
    }

    return {
        index: index,
        charge: charge,

        _config: {}
    };
})();
