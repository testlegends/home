/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to restrict admin only area
 * @author      :: Jeff Lee
 * @created     :: 2014/02/09
 */

module.exports = function(req, res, next) {
    if (req.user[0].role === 'admin') {
        return next();
    }

    return res.forbidden('You are not permitted to perform this action.');
};
