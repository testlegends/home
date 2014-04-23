/**
 * AccessToken
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/19
 */

module.exports = {

    tableName: 'access_tokens',

    attributes: {
        userId: {
            type: 'string'
        },
        clientId: {
            type: 'string'
        },
        token: {
            type: 'string'
        }
    }
};
