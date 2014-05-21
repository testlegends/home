/**
 * DemoQuestion
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

module.exports = {

    tableName: 'demo_questions',

    attributes: {
        content: {
            type: 'string',
            required: true
        },

        options: {
            type: 'array'
        }
    }
};

var example = {

    content: '',

    options: [
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' }
    ]
};
