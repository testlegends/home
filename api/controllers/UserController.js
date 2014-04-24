/**
 * UserController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

var Html = require('../helpers/HtmlHelper.js'),
    Form = require('../helpers/FormHelper.js'),
    Passport = require('passport'),
    SHA256 = require('sha256');

module.exports = (function () {

    var helpers = { Html: Html, Form: Form };

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
                req.flash('error', 'Invalid Password reset key');
                return res.view(_.extend({
                    key: null
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
                req.flash('error', 'Something went wrong');
                return res.view(_.extend({
                    key: null
                }, helpers));
            } else if (users.length === 0) {
                req.flash('error', 'No user with the email found')
                return res.view(_.extend({
                    key: null
                }, helpers));
            } else {
                EmailService.sendResetPasswordEmail({
                    email: email,
                    key: key
                }, function (err, response) {
                    if (err) {
                        req.flash('error', 'Something went wrong');
                        return res.view(_.extend({
                            key: null
                        }, helpers));
                    } else {
                        req.flash('success', 'E-mail has been sent');
                        return res.view(_.extend({
                            key: null
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
                // TODO: Figure out how to add flash
                res.redirect('/user/login');
            }
        });
    }

    function register (req, res) {
        return res.view(helpers);
    }

    function add (req, res) {
        User.create({
            name: '',
            email: '',
            password: ''
        }).done(function (err, user) {
            if (err) {
                return console.log(err);
            } else {
                return res.view(_.extend({

                }, helpers));
            }
        });
    }

    function edit (req, res) {
        return res.view(_.extend({
            user: req.user[0]
        }, helpers));
    }

    function update (req, res) {
        var user = req.user[0];
        var updated = {};

        if (req.body.name !== user.name) { updated.name = req.body.name; }
        if (req.body.email !== user.email) { updated.email = req.body.email; }
        if (!_.isEmpty(req.body.password)) { updated.password = req.body.password; }

        User.update({ id: req.user[0].id }, updated).done(function (err, user) {
            if (err) {
                return console.log(err);
            } else {
                return res.view(_.extend({

                }, helpers));
            }
        });

        return res.view(_.extend({

        }, helpers));
    }

    function index (req, res) {
        User.find().exec(function (err, users) {
            return res.view(_.extend({
                users: users
            }, helpers));
        });
    }

    function profile (req, res) {
        // TODO Need to check if is admin or the right user
        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
        }

        return res.view(_.extend({

        }, helpers));
    }

    return {
        login: Passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/user/login', failureFlash: 'Wrong username or password.' }),
        loginForm: loginForm,
        logout: logout,
        reset_password: reset_password,
        register: register,
        add: add,
        edit: edit,
        update: update,
        index: index,
        profile: profile,

        _config: {}
    };

})();
