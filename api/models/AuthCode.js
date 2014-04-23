/**
 * AuthCode
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/19
 */

module.exports = {

    tableName: 'authorization_codes',

    attributes: {
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
    }
};
