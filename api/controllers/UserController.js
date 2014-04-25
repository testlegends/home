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
    Passport = require('passport');

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
                ResetPasswordService.emailForm(req, res, helpers);
            } else {
                ResetPasswordService.resetForm(req, res, helpers);
            }
        } else {
            if (_.isEmpty(req.param('key'))) {
                ResetPasswordService.sendmail(req, res, helpers);
            } else {
                ResetPasswordService.reset(req, res, helpers);
            }
        }
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
