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
            type: 'json'
        }
    }
};

var example = {

    content: '',

    options: {
        correct: '',
        wrong: [
            { text: '' },
            { text: '' },
            { text: '' }
        ]
    }
};
