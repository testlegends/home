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

    'GET /questions'       : 'QuestionController.list',
    'PUT /questions'       : 'QuestionController.add',
    'GET /question/latest' : 'QuestionController.latest',
    'GET /question/:id'    : 'QuestionController.find',

    'PUT /referals'        : 'ReferalController.join',
    'POST /referal/:code'  : 'ReferalController.visited'
};
