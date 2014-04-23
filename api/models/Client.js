/**
 * Client
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/19
 */

module.exports = {

    tableName: 'clients',

    attributes: {
        name: {
            type: 'string'
        },
        clientSecret: {
            type: 'string'
        }
    }
};
