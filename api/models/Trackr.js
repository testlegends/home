/**
 * Trackr
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/06/28
 */

module.exports = (function(){

    var tableName = 'trackr';

    var attributes = {
        trackrId: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        eventHistory: {
            type: 'array'
        },
        userInfo: {
            type: 'json'
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
