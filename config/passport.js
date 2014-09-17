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
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    bcrypt = require('bcrypt'),
    util = require('util');

Passport.serializeUser(function (user, done) {
    done(null, user.id);
});

Passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

var UserPasswordStrategy = (function(){
    function Strategy (options, verify) {
        if (typeof options == 'function') {
            verify = options;
            options = {};
        }
        if (!verify) throw new Error('OAuth 2.0 password strategy requires a verify function');

        Passport.Strategy.call(this);
        this.name = 'oauth2-user-password';
        this._verify = verify;
    }

    util.inherits(Strategy, Passport.Strategy);

    Strategy.prototype.authenticate = function (req) {
        if (!req.body || !req.body.client_id) {
          return this.fail();
        }

        var clientId = req.body.client_id;
        var self = this;

        function verified (err, client, info) {
            if (err) { return self.error(err); }
            if (!client) { return self.fail(); }
            self.success(client, info);
        }

        this._verify(clientId, verified);
    };

    return Strategy;
})();

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
                if (!res) return done(null, false, { message: 'Invalid Password' });

                delete user.password;
                user.security_logs.push({
                    action: 'Login',
                    timestamp: new Date()
                });
                user.save(function(){});

                return done(null, user);
            });
        });
    })
);

/**
 * UserPasswordStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
Passport.use(new UserPasswordStrategy(
    function (clientId, done) {
        Client.findOneById(clientId, function (err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            return done(null, client);
        });
    }
));

Passport.use(new ClientPasswordStrategy(
    function (clientId, clientSecret, done) {
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
