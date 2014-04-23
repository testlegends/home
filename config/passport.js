/**
 * Passport
 *
 * @description ::
 * @docs        :: https://github.com/jaredhanson/oauth2orize/tree/master/examples/all-grants
 * @author      :: Jeff Lee
 * @created     :: 2014/04/19
 */

var Passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    BasicStrategy = require('passport-http').BasicStrategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    bcrypt = require('bcrypt');

Passport.serializeUser(function (user, done) {
    done(null, user.id);
});

Passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
Passport.use(new LocalStrategy({
        usernameField: 'email'
    }, function (email, password, done) {
        User.findOneByEmail(email, function (err, user) {
            if (err) { return done(null, err); }
            if (!user || user.length < 1) { return done(null, false, { message: 'Incorrect User'}); }
            bcrypt.compare(password, user.password, function (err, res) {
                if (!res) return done(null, false, { message: 'Invalid Password'});
                return done(null, user);
            });
        });
    })
);

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
Passport.use(new BasicStrategy(
    function(clientId, password, done) {
        Client.findOneById(clientId, function (err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret != password) { return done(null, false); }
            return done(null, client);
        });
    }
));

Passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        Client.findOneById(clientId, function (err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret != clientSecret) { return done(null, false); }
            return done(null, client);
        });
    }
));


module.exports = {
    express: {
        customMiddleware: function (app) {
            app.use(Passport.initialize());
            app.use(Passport.session());
        }
    }
};
