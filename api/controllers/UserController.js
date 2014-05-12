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
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password_reset_key: null,
            role: req.body.role
        }).done(function (err, user) {
            if (err) {
                console.log(err);
                req.flash('error', err);
                return res.redirect('/user/register');
            } else {
                req.flash('success', 'You have successfully registered');
                return res.redirect('/user/login');
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
                return res.redirect('/user/profile');
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
        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
        }

        ProfileService.get(req.user[0].id, function(result){
            return res.view(_.extend({
                user: result.user,
                appsAuthorized: result.appsAuthorized,
                appsCreated: result.appsCreated
            }, helpers));
        });
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
