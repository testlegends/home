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
            amount: 10000,
            currency: "USD",
            description: function (email) { return 'Beta user promotion $100 for a year (' + email + ')'; }
        }
    };

    function chargeByPlan (plan, params, cb) {
        _retrieveCustomer(params, function (err, customerId) {
            stripe.charges.create({
                customer: customerId,
                amount: plans[plan].amount,
                currency: plans[plan].currency,
                description: plans[plan].description(params.email),
                receipt_email: params.email
            }, function (err, charge) {
                if (err) {
                    console.log(err);
                    return cb(err);
                }

                cb(null, charge);
            });
        });
    }

    function _retrieveCustomer (params, cb) {
        User.findOneByEmail(params.email, function (err, user) {
            if (user && user.meta.stripeCustomerId) {
                stripe.customers.createCard(user.meta.stripeCustomerId, {
                    card: params.token
                }, function (err, card) {
                    cb(null, user.meta.stripeCustomerId);
                });

                // TODO: check card exists, but token can't be used twice, so can't do it atm
                // stripe.customers.retrieve(user.meta.stripeCustomerId, function (err, customer) {
                //     stripe.tokens.retrieve(params.token, function (err, token) {
                //         for (var i = 0; i < customer.cards.data.length; i++) {
                //             if (token.card.fingerprint === customer.cards.data[i].fingerprint) {
                //                 return cb(null, user.meta.stripeCustomerId);
                //             } else if (i === customer.cards.data.length - 1) {
                //                 stripe.customers.createCard(customer.id, {
                //                     card:
                //                 }, function (err, card) {
                //                     cb(null, user.meta.stripeCustomerId);
                //                 });
                //             }
                //         }
                //     });
                // });
            } else {
                stripe.customers.create({
                    card: params.token,
                    email: params.email,
                    description: 'Customer for ' + params.email
                }, function (err, customer) {
                    if (err) {
                        return cb(err);
                    }

                    if (user) {
                        user.meta.stripeCustomerId = customer.id;
                        user.save(function (err, user) {
                            cb(null, customer.id);
                        });
                    } else {
                        User.create({
                            name: params.name,
                            email: params.email,
                            password: 'defaultPassword',
                            role: 'teacher',
                            meta: {
                                stripeCustomerId: customer.id
                            }
                        }, function (err, user) {
                            if (err) {
                                console.log(err);
                            }

                            cb(null, customer.id);
                        })
                    }
                });
            }
        });
    }

    return {
        chargeByPlan: chargeByPlan
    };

})();
