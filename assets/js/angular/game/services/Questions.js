/**
 * QuestionsService
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/12
 */

define(['game/services'], function (gameServices) {
    'use strict';

    return gameServices

        .factory('Questions', [function () {
            var data = [
                {
                    Question: "On 11th december 1936 the king ________d in favor of his brother, the Duke of York, who became George VI.",
                    Answer  : 'abdicate',
                    Options : ['abdicate', 'aberration', 'abash', 'abhor']
                },
                {
                    Question: "We should all _____ the illegal importing of fish, as they pose a great risk of disease to our existing fish stocks.",
                    Answer  : 'abhor',
                    Options : ['abdicate', 'aberration', 'abash', 'abhor']
                },
                {
                    Question: "Naturally, I was rather _____ed at the prospect of meeting a couple who have taken such an interest in me and the college.",
                    Answer  : 'abash',
                    Options : ['abdicate', 'aberration', 'abash', 'abhor']
                },
                {
                    Question: "Far from being an __________, advancing technology today is more like the new normal.",
                    Answer  : 'aberration',
                    Options : ['abate', 'abhor', 'aberration', 'abdicate']
                },
                {
                    Question: "The villagers would rather support the council's objective of delivering 500 affordable homes whilst minimizing effort on ultimately ________ schemes that might never be completed.",
                    Answer  : 'abortive',
                    Options : ['abdicate', 'abortive', 'abhor', 'abstract']
                },
                {
                    Question: "This ________ beginner's guide to tic tac toe is designed so simple that even a caveman could use it.",
                    Answer  : 'absolute',
                    Options : ['absolute', 'absolve', 'abysmal', 'aberration']
                },
                {
                    Question: "Mr. Jobling stood wringing his hands helplessly, his flaccid features expressive of ______ despair.",
                    Answer  : 'abject',
                    Options : ['abject', 'abdicate', 'abate', 'abnegate']
                }
            ];

            return {
                getList: function () {
                    return data;
                }
            };
        }]);
});
