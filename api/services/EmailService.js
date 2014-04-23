/**
 * EmailService
 *
 * @module      :: Service
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/22
 */

var Sendgrid = require("sendgrid")(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

module.exports = (function(){

    var generalParams = {
        project_name: 'TestLegends',
        admin_email: 'admin@testlegends.com'
    };

    function sendWelcomeEmail (params, callback) {

    }

    function sendResetPasswordEmail (params, callback) {
        var mailOptions = {
            from: generalParams.admin_email,
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

    return {
        sendWelcomeEmail: sendWelcomeEmail,
        sendResetPasswordEmail: sendResetPasswordEmail
    };

})();
