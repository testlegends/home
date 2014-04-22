
var Server = require('./OAuthServerSetup');

module.exports = Server.authorization(function(clientId, redirectURI, done) {
    Client.findOneById(clientId).done(function(err, client) {
        if (err) { return done(err); }
        return done(null, client, redirectURI);
    });
});
