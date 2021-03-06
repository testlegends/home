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
            function Questions () {
                this.data = [
                    {
                        Question: "Definition: conforming to moral and ethical principles.",
                        Answer  : 'virtuous',
                        Options : ['pragmatic', 'virtuous', 'virtuality', 'pragmatize']
                    },
                    {
                        Question: "Studying for school in the 21st century was no longer _________ to paper and pen.",
                        Answer  : 'confined',
                        Options : ['managed', 'confirmed', 'confined', 'all of the above']
                    },
                    {
                        Question: "Definition: to give intellectual light to; instruct; impart knowledge to",
                        Answer  : 'enlighten',
                        Options : ['complex', 'delight', 'perplex', 'enlighten']
                    },
                    {
                        Question: "Which choice below is not a source of light?",
                        Answer  : 'Chlorescence',
                        Options : ['Fluorescence', 'Bioluminescence', 'Chemiluminescence', 'Chlorescence']
                    },
                    {
                        Question: "The formation of frost is an example of:",
                        Answer  : 'deposition',
                        Options : ['condensation', 'evaporation', 'deposition', 'melting point']
                    },
                    {
                        Question: "Which of these is a scalar quantity?",
                        Answer  : 'speed',
                        Options : ['velocity', 'acceleration', 'displacement', 'speed']
                    },
                    {
                        Question: "The mastermind behind the website hoped to live a(n) ________ life once the site made him a millionaire.",
                        Answer  : 'opulent',
                        Options : ['opulent', 'reiterate', 'insidious', 'tentative']
                    },
                    {
                        Question: "What is the acceleration due to gravity on Earth?",
                        Answer  : '9.81 m/s^2',
                        Options : ['6.67 x 10^-11', '9.81 m/s^2', 'the same as on the sun', 'all of the above']
                    }
                ];

                this.getList = function () {
                    return this.data;
                };
            }

            return Questions;
        }]);
});
