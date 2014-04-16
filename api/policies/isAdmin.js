/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to restrict admin only area
 *                 Assumes that your login action in one of your controllers sets `req.session.isAdmin = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 * @created     :: 2014/02/09
 */

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.role === 'admin') {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
