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

    'GET /': 'HomeController.index',
    'GET /share': 'HomeController.share',

    'GET  /users'                    : 'UserController.index',
    'GET  /user/profile'             : 'UserController.profile',
    'GET  /user/login'               : 'UserController.loginForm',
    'POST /user/login'               : 'UserController.login',
    'GET  /user/logout'              : 'UserController.logout',
    'GET  /user/register'            : 'UserController.register',
    'POST /user/add'                 : 'UserController.add',
    'GET  /user/edit'                : 'UserController.edit',
    'POST /user/update'              : 'UserController.update',
    'GET  /user/reset_password'      : 'UserController.reset_password',
    'POST /user/reset_password'      : 'UserController.reset_password',
    'GET  /user/reset_password/:key' : 'UserController.reset_password',
    'POST /user/reset_password/:key' : 'UserController.reset_password',

    'PUT  /adventurers'             : 'AdventurerController.join',
    'GET  /adventurer/:code'        : 'AdventurerController.get',
    'POST /adventurer/:code'        : 'AdventurerController.visited',
    'POST /adventurer/:code/survey' : 'AdventurerController.updateSurvey',
    'GET  /adventurer/:code/shares' : 'AdventurerController.getShares',

    'GET  /trackr/view' : 'HomeController.trackrView',
    'POST /trackr'      : 'HomeController.trackr',

    'GET  /payment' : 'PaymentController.index',
    'POST /payment' : 'PaymentController.charge'
};
