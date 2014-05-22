/**
 * AuthCode
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/19
 */

module.exports = (function(){

    var tableName = 'authorization_codes';

    var attributes = {
        clientId: {
            type: 'string'
        },

        userId: {
            type: 'string'
        },

        redirectURI: {
            type: 'url'
        },

        code: {
            type: 'string'
        }
    };

    var example = {

    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes
    };
})();
