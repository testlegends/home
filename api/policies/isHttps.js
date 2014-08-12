/**
 * isHttps
 *
 * @module      :: Policy
 * @description :: Force redirect to HTTPS
 * @author      :: Jeff Lee
 * @created     :: 2014/08/11
 */

module.exports = function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
};
