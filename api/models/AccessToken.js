/**
 * AccessToken
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/19
 */

module.exports = (function(){

    var tableName = 'access_tokens';

    var attributes = {
        userId: {
            type: 'string'
        },

        clientId: {
            type: 'string'
        },

        token: {
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
