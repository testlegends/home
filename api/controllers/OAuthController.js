/**
 * OAuthController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/19
 */

var _ = require('underscore'),
    Html = require('../helpers/HtmlHelper.js'),
    Form = require('../helpers/FormHelper.js'),
    Passport = require('passport');

module.exports = (function(){

    var helpers = { Html: Html, Form: Form };

    function authorize (req, res) {
        return res.view(_.extend({
            transactionID: req.oauth2.transactionID,
            user: req.user,
            client: req.oauth2.client
        }, helpers));
    }

    function decision (req, res) {

    }

    function token (req, res) {

    }

    return {
        authorize: authorize,
        decision: decision,
        token: token,

        _config: {}
    };
})();
