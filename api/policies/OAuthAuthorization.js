/**
 * OAuthAuthorization
 *
 * @module      :: Policy
 * @description ::
 * @docs        :: https://github.com/jaredhanson/oauth2orize/tree/master/examples/all-grants
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

var Server = require('./OAuthServerSetup');

module.exports = Server.authorization(function (clientId, redirectURI, done) {
    Client.findOneById(clientId).done(function(err, client) {
        if (err) { return done(err); }
        return done(null, client, redirectURI);
    });
}, function (client, user, done) {
    AuthCode.find({
        clientId: client.id,
        userId: user[0].id
    }, function (err, codes) {
        if (err) { return done(err); }
        if (codes.length > 0) {
            return done(null, true);
        } else {
            return done(null,false);
        }
    });
});
