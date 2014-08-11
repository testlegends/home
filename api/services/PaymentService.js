/**
 * PaymentService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/08/10
 */

var stripe = require('stripe')(process.env.STRIPE_KEY_SECRET);

module.exports = (function(){

    var plans = {
        BetaUserPromotion: {
            
        }
    };

    function chargeByPlan (plan, params, cb) {
        stripe.charges.create({
            amount: 100,
            currency: "usd",
            card: token,
            description: "Charge for " + email
        }, function(err, charge) {
            cb(err, charge);
        });
    }

    function refund (id, cb) {

    }

    return {

    };

})();
