/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 * @created     :: 2014/02/08
 */

 module.exports = {

     tableName: 'users',

     attributes: {
         username: {
             type: 'string',
             required: true
         },
         password: {
             type: 'string'
         },
         email: {
             type: 'email'
         },
         role: {
             type: 'string',
             in: ['admin', 'regular']
         },
         password_reset_key: {
             type: 'string',
             defaultsTo: null
         }
     }
};
