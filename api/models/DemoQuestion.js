/**
 * DemoQuestion
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

module.exports = (function(){

    var tableName = 'demo_questions';

    var attributes = {
        content: {
            type: 'string',
            required: true
        },

        options: {
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
