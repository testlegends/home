/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {

    '/': { controller: 'home', action: 'index' },

    'GET  /user/login'             : { controller: 'user', action: 'loginForm' },
    'POST /user/login'             : { controller: 'user', action: 'login' },
    'GET  /user/profile/:username' : { controller: 'user', action: 'profile' },

    '/user/reset_password/:key' : { controller: 'user', action: 'reset_password' }

};
