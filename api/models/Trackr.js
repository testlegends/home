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
        name: {
            type: 'string'
        },
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes
    };
})();
