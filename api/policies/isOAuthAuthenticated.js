/**
 * isOAuthAuthenticated
 *
 * @module      :: Policy
 * @description ::
 * @docs        :: https://github.com/jaredhanson/oauth2orize/tree/master/examples/all-grants
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

var Passport = require('passport');

module.exports = Passport.authenticate(['basic', 'oauth2-client-password'], { session: false });
