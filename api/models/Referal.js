/**
 * Referal
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

module.exports = (function(){

    var tableName = 'referals';

    var attributes = {
        email: {
            type: 'email',
            required: true
        },

        code: {
            type: 'string',
            required: true
        },

        referals: {
            type: 'array'
        },

        visited: {
            type: 'integer'
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
