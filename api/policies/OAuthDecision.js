/**
 * OAuthDecision
 *
 * @module      :: Policy
 * @description ::
 * @docs        :: https://github.com/jaredhanson/oauth2orize/tree/master/examples/all-grants
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

var Server = require('./OAuthServerSetup');

module.exports = Server.decision();
