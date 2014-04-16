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
Form = require('../helpers/FormHelper.js');

var Mailer = require("nodemailer");
var MD5 = require('MD5');

module.exports = (function () {

    var helpers = { Html: Html, Form: Form };

    var params = {
        project_name: 'Project Catalog',
        project_domain: 'http://leejefon-project-catalog.herokuapp.com',
        //project_domain: 'http://localhost:1337',
        admin_email: 'leejefon@gmail.com'
    };

    function login (req, res) {
        if (_.isEmpty(req.body)) {
            return res.view(helpers);
        } else {
            // verify email/password with db, and get username
            // set session

            var username = req.body.username;
            var password = MD5(req.body.password + process.env.PASSWORD_SALT);

            User.find({
                username: username,
                password: password
            }).done(function(err, user){
                if (err) {
                    console.log(err);
                } else if (user.length === 0) {
                    return res.view(_.extend({
                        flash: {
                            error: "Username/password incorrect"
                        }
                    }, helpers));
                } else if (user.length === 1) {
                    req.session.authenticated = user[0].username;
                    req.session.role = user[0].role;
                    res.redirect('/user/profile/' + user[0].username);
                }
            });
        }
    }

    function fbLogin (req, res) {
        if (!_.isEmpty(req.body)) {
            var username = req.body.username || req.body.email;

            User.find({
                username: username
            }).done(function(err, user){
                if (err) {
                    console.log(err);
                } else if (user.length === 0) {
                    User.create({
                        username: username,
                        password: null,
                        role: 'regular'
                    }).done(function(err, user){
                        if (err) {
                            console.log(err);
                        } else {
                            req.session.authenticated = user.username;
                            req.session.role = user.role;

                            res.json({
                                status: "OK",
                                url: "/user/profile/" + username
                            });
                        }
                    });
                } else {
                    req.session.authenticated = user[0].username;
                    req.session.role = user[0].role;

                    res.json({
                        status: "OK",
                        url: "/user/profile/" + username
                    });
                }
            });
        }
    }

    function logout (req, res) {
        delete req.session.authenticated;
        delete req.session.role;

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
        var key = MD5(email + (new Date().getTime()).toString());
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
                var transport = Mailer.createTransport("SMTP", {
                    service: "Gmail",
                    auth: {
                        user: "leejefon@gmail.com",
                        pass: process.env.GMAIL_PASSWORD
                    }
                });

                var mailOptions = {
                    from: params.admin_email,
                    to: email,
                    subject: params.project_name + " Password Reset",
                    text: params.project_domain + "/user/reset_password/" + key
                };

                transport.sendMail(mailOptions, function (err, response) {
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
            password: MD5(password + process.env.PASSWORD_SALT),
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
        if (!req.session.authenticated) {
            res.redirect('/user/login');
        }

        return res.view(_.extend({
            user: req.param('username')
        }, helpers));
    }

    function import_test_data (req, res) {
        this.adapter = 'test';
    }

    return {
        login: login,
        logout: logout,
        fbLogin: fbLogin,
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
