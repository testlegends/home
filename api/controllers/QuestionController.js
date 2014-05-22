/**
 * QuestionController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

module.exports = (function(){

    function list (req, res) {
        var game = req.param('game');

        DemoQuestion.find({
            game: game
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

    return {
        list: list,

        _config: {
            blueprints: {
                actions: false
            }
        }
    };
})();
