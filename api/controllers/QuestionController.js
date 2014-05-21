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
        DemoQuestion.create({
            content: req.body.content,
            options: req.body.options
        }, function (err, question) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: question
            });
        });
    }

    function list (req, res) {
        DemoQuestion.find({

        }, function (err, questions) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: questions
            });
        });
    }

    function find (req, res) {
        var id = req.param('id');

        DemoQuestion.findOne({
            id: id
        }, function (err, question) {
            if (err) {
                console.log(err);
            }

            return res.json({
                status: 'OK',
                data: question
            });
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
