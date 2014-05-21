/**
 * OAuthServerSetup
 *
 * @module      :: Policy Library*
 * @description ::
 * @docs        :: https://github.com/jaredhanson/oauth2orize/tree/master/examples/all-grants
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

var OAuth2orize = require('oauth2orize'),
    bcrypt = require('bcrypt');

module.exports = (function(){

    function uid (len) {
        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var buf = [],
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    }

    // create OAuth 2.0 server
    var server = OAuth2orize.createServer();

    server.serializeClient(function(client, done) {
        return done(null, client.id);
    });

    server.deserializeClient(function(id, done) {
        Client.findOne({ id: id }, function(err, client) {
            if (err) { return done(err); }
            return done(null, client);
        });
    });

    server.grant(OAuth2orize.grant.code(function(client, redirectURI, user, ares, done) {
        var code = uid(16);
        AuthCode.create({
            code: code,
            clientId: client.id,
            userId: user[0].id,
            redirectURI: redirectURI
        }, function(err, authCode) {
            if (err) { return done(err); }
            done(null, code);
        });
    }));

    server.grant(OAuth2orize.grant.token(function(client, user, ares, done) {
        var token = uid(100);
        AccessToken.create({
            token: token,
            userId: user.id,
            clientId: client.clientId
        }, function(err, accessToken) {
            if (err) { return done(err); }
            done(null, token);
        });
    }));

    server.exchange(OAuth2orize.exchange.authorizationCode(function(client, code, redirectURI, done) {
        AuthCode.findOne({ code: code }, function (err, authCode) {
            if (err) { return done(err); }
            if (client.id !== authCode.clientId) { return done(null, false); }
            if (redirectURI !== authCode.redirectURI) { return done(null, false); }

            var token = uid(100);
            AccessToken.create({
                token: token,
                userId: authCode.userId,
                clientId: authCode.clientId
            }, function(err, accessToken) {
                if (err) { return done(err); }
                done(null, token);
            });
        });
    }));

    server.exchange(OAuth2orize.exchange.password(function (client, username, password, scope, done) {
        Client.findOne({ id: client.id }, function (err, localClient) {
            if (err) { return done(err); }
            if (localClient === null) {
                return done(null, false);
            }
            if (localClient.clientSecret !== client.clientSecret) {
                return done(null, false);
            }

            User.findOneByEmail(username, function (err, user) {
                if (err) { return done(null, err); }
                if (!user || user.length < 1) { return done(null, false, { message: 'Incorrect User'}); }
                bcrypt.compare(password, user.password, function (err, res) {
                    if (!res) return done(null, false, { message: 'Invalid Password'});

                    //Everything validated, return the token
                    var token = uid(100);
                    AccessToken.create({
                        token: token,
                        userId: user.id,
                        clientId: client.clientId
                    }, function (err, accessToken) {
                        if (err) { return done(err); }
                        done(null, token);
                    });
                });
            });
        });
    }));

    server.exchange(OAuth2orize.exchange.clientCredentials(function(client, scope, done) {
        Client.findOne({ id: client.id }, function(err, localClient) {
            if (err) { return done(err); }
            if (localClient === null) {
                return done(null, false);
            }
            if (localClient.clientSecret !== client.clientSecret) {
                return done(null, false);
            }

            var token = uid(100);
            //Pass in a null for user id since there is no user with this grant type
            AccessToken.create({
                token: token,
                userId: null,
                clientId: client.clientId
            }, function(err, accessToken) {
                if (err) { return done(err); }
                done(null, token);
            });
        });
    }));

    return server;

})();
