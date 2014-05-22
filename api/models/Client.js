/**
 * Client
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/19
 */

module.exports = (function(){

    var tableName = 'clients';

    var attributes = {
        name: {
            type: 'string'
        },

        clientSecret: {
            type: 'string'
        },

        userId: {
            type: 'string'
        },

        redirectURI: {
            type: 'json'
        },

        icon: {
            type: 'string'
        }
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes
    };
})();
