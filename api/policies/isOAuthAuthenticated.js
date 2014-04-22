var Passport = require('passport');

module.exports = Passport.authenticate(['basic', 'oauth2-client-password'], { session: false });
