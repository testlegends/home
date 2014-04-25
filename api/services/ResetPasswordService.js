/**
 * ResetPasswordService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/24
 */

var EmailService = require('./EmailService'),
    SHA256 = require('sha256');

module.exports = (function(){

    function emailForm (req, res, helpers) {
        return res.view(_.extend({
            key: null
        }, helpers));
    }

    function resetForm (req, res, helpers) {
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

    function sendmail (req, res, helpers) {
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
                req.flash('error', 'No user with the email found');
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

    function reset (req, res, helpers) {
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
                req.flash('Something went wrong');
                return res.view(helpers);
            } else {
                req.flash('success', 'Password reset successfully');
                res.redirect('/user/login');
            }
        });
    }

    return {
        emailForm: emailForm,
        resetForm: resetForm,
        sendmail: sendmail,
        reset: reset
    };

})();
