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

    '/': 'HomeController.index',

    'GET /user/login'           : 'UserController.loginForm',
    '/user/reset_password/:key' : 'UserController.reset_password',

    'PUT  /adventurers'         : 'AdventurerController.join',
    'GET  /adventurer/:code'    : 'AdventurerController.get',
    'POST /adventurer/:code'    : 'AdventurerController.visited',

    'GET  /trackr/view'        : 'HomeController.trackrView',
    'POST /trackr'              : 'HomeController.trackr'
};
