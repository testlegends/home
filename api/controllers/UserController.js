/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 * @created     :: 2014/02/08
 */

var Html = require('../helpers/HtmlHelper.js'),
    Form = require('../helpers/FormHelper.js'),
    Passport = require('passport'),
    SHA256 = require('sha256'),
    Sendgrid = require("sendgrid")(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

module.exports = (function () {

    var helpers = { Html: Html, Form: Form };

    var params = {
        project_name: 'TestLegends',
        project_domain: 'http://testlegends.herokuapp.com',
        admin_email: 'admin@testlegends.com'
    };

    function loginForm (req, res) {
        return res.view(helpers);
    }

    function logout (req, res) {
        req.logout();
        return res.redirect('/');
    }

    function reset_password (req, res) {
        if (req.session.authenticated) {
            res.redirect('/');
        }

        if (_.isEmpty(req.body)) {
            if (_.isEmpty(req.param('key'))) {
                _reset_password_email_form(req, res);
            } else {
                _reset_password_reset_form(req, res);
            }
        } else {
            if (_.isEmpty(req.param('key'))) {
                _reset_password_sendmail(req, res);
            } else {
                _reset_password(req, res);
            }
        }
    }

    function _reset_password_email_form (req, res) {
        return res.view(_.extend({
            key: null
        }, helpers));
    }

    function _reset_password_reset_form (req, res) {
        var key = req.param('key');

        User.find({
            password_reset_key: key
        }).done(function(err, users) {
            if (err) {
                console.log("Error finding key");
            }

            if (users.length === 0) {
                return res.view(_.extend({
                    key: null,
                    flash: {
                        error: 'Invalid Password reset key'
                    }
                }, helpers));
            } else {
                return res.view(_.extend({
                    key: key
                }, helpers));
            }
        });
    }

    function _reset_password_sendmail (req, res) {
        var email = req.body.email;
        var key = SHA256(email + (new Date().getTime()).toString());
        var extraVars = {};

        User.update({
            email: email
        }, {
            password_reset_key: key
        }).done(function (err, users) {
            if (err) {
                return res.view(_.extend({
                    key: null,
                    flash: {
                        error: 'Something went wrong'
                    }
                }, helpers));
            } else if (users.length === 0) {
                return res.view(_.extend({
                    key: null,
                    flash: {
                        error: 'No user with such email found'
                    }
                }, helpers));
            } else {
                var mailOptions = {
                    from: params.admin_email,
                    to: email,
                    subject: params.project_name + " Password Reset",
                    text: params.project_domain + "/user/reset_password/" + key
                };

                Sendgrid.send(mailOptions, function (err, response) {
                    if (err) {
                        return res.view(_.extend({
                            key: null,
                            flash: {
                                error: 'Something went wrong'
                            }
                        }, helpers));
                    } else {
                        return res.view(_.extend({
                            key: null,
                            flash: {
                                success: 'E-mail has been sent'
                            }
                        }, helpers));
                    }
                });
            }
        });
    }

    function _reset_password (req, res) {
        var key = req.param('key');
        var password = req.body.new_password;

        var id = null;
        User.update({
            password_reset_key: key
        }, {
            password: password,
            password_reset_key: null
        }).done(function(err, user) {
            if (err) {
                return res.view(_.extend({
                    flash: {
                        error: 'Something went wrong'
                    }
                }, helpers));
            } else {
                // figure out how to add flash
                res.redirect('/user/login');
            }
        });
    }

    function index (req, res) {
        User.find().exec(function (err, users) {
            return res.view(_.extend({
                users: users
            }, helpers));
        });
    }

    function profile (req, res) {
        // Need to check if is admin or the right user
        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
        }

        return res.view(_.extend({

        }, helpers));
    }

    function import_test_data (req, res) {
        this.adapter = 'test';
    }

    return {
        login: Passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/user/login' }),
        loginForm: loginForm,
        logout: logout,
        index: index,
        reset_password: reset_password,
        profile: profile,

        /**
        * Overrides for the settings in `config/controllers.js`
        * (specific to UserController)
        */
        _config: {}
    };

})();
