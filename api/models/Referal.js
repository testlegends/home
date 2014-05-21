/**
 * Referal
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

module.exports = {

    tableName: 'referals',

    attributes: {
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
    }
};

var example = {

    email: 'me@email.com',

    code: 'code',

    referals: [
        'a@email.com', 'b@email.com', 'c@email.com'
    ],

    visited: 3
};
