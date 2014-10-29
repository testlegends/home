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
    Client.findOneById(clientId, function (err, client) {
        if (err) { return done(err); }
        return done(null, client, redirectURI);
    });
}, function (client, user, done) {
    var TestLegendsAppID = '536c7df8fe3a9bf0fa000216';
    var TestLegendsBuildID = '53562b9335e2e5c84c0001fa';
    var VersalID = '545061a8925a4d23af0018cc';

    if (client.id === TestLegendsBuildID || client.id === TestLegendsAppID || client.id === VersalID) {
        return done(null, true);
    }

    AuthCode.find({
        clientId: client.id,
        userId: user[0].id
    }, function (err, codes) {
        if (err) { return done(err); }
        if (codes.length > 0) {
            return done(null, true);
        } else {
            return done(null, false);
        }
    });
});
