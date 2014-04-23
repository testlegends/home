/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description ::
 * @docs        :: https://github.com/jaredhanson/connect-ensure-login/
 * @author      :: Jeff Lee
 * @created     :: 2014/04/21
 */

module.exports = (function ensureLoggedIn(options) {
    if (typeof options === 'string') {
        options = { redirectTo: options };
    }
    options = options || {};

    var url = options.redirectTo || '/login';
    var setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;

    return function(req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            if (setReturnTo && req.session) {
                req.session.returnTo = req.originalUrl || req.url;
            }
            return res.redirect(url);
        }
        next();
    };
})({ redirectTo: '/user/login' });
