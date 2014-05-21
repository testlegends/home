/**
 * QuestionController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

module.exports = (function(){

    function add (req, res) {
        return res.json({
            status: 'OK',
            data: {
                content: req.body.content
            }
        });
    }

    function list (req, res) {
        return res.json({
            status: 'OK',
            data: [
                { content: 'hello' },
                { content: 'world' }
            ]
        });
    }

    function find (req, res) {
        return res.json({
            status: 'OK',
            data: {
                content: 'hello find'
            }
        });
    }

    function latest (req, res) {
        return res.json({
            status: 'OK',
            data: {
                content: 'hello latest'
            }
        });
    }

    return {
        add: add,
        list: list,
        find: find,
        latest: latest,

        _config: {
            blueprints: {
                actions: false
            }
        }
    };
})();
