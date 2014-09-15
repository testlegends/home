/**
 * EmailService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/22
 */

var Sendgrid = require("sendgrid")(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var fs = require('fs');
var _ = require('underscore');

module.exports = (function(){

    var generalParams = {
        project_name: 'TestLegends',
        admin_email: 'admin@testlegends.com'
    };

    function sendWelcomeEmail (params, callback) {
        _useTemplate('signup', function (emailtpl) {
            var mailOptions = {
                from: generalParams.admin_email,
                fromname: generalParams.project_name,
                to: params.email,
                subject: 'Thank you for joining TestLegends!',
                html: emailtpl({
                    refCode: params.code,
                    email: params.email
                })
            };

            Sendgrid.send(mailOptions, callback);
        });
    }

    function sendInviteEmail (params, callback) {
        _useTemplate('invite', function (emailtpl) {
            var mailOptions = {
                from: generalParams.admin_email,
                fromname: generalParams.project_name,
                to: params.email,
                subject: 'Someone just invited you to a class',
                html: emailtpl({
                    key: params.password_reset_key,
                    classInfo: params.classInfo
                })
            };

            Sendgrid.send(mailOptions, callback);
        });
    }

    function sendResetPasswordEmail (params, callback) {
        var mailOptions = {
            from: generalParams.admin_email,
            fromname: generalParams.project_name,
            to: params.email,
            subject: '[' + generalParams.project_name + '] Password Reset',
            text: (function(){
                var reset_url = process.env.PROJECT_URL + "/user/reset_password/" + params.key;
                var content = "Click the following link to reset your password ";

                return content + reset_url;
            })()
        };

        Sendgrid.send(mailOptions, callback);
    }

    function _useTemplate (name, callback) {
        var templateUrl = 'views/emailtpls/' + name + '.html';

        fs.exists(templateUrl, function (exists) {
            if (exists) {
                var buffer = fs.readFile(templateUrl, 'utf8', function (err, data) {
                    var emailtpl = _.template(data);
                    callback(emailtpl);
                });
            }
        });
    }

    return {
        sendWelcomeEmail: sendWelcomeEmail,
        sendInviteEmail: sendInviteEmail,
        sendResetPasswordEmail: sendResetPasswordEmail
    };

})();
