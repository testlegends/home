/**
* Services
*
* @author      :: Jeff Lee
* @created     :: 2014/05/20
*/

define(['angular', 'goog!visualization,1,packages:[corechart]'], function (angular) {

    return angular.module('Home.services', [])

        .factory('adventurers', ['$http', function ($http) {
            return {
                join: function (data, cb) {
                    $http.put('/adventurers', {
                        email: data.email,
                        ref: data.refCode,
                        metric: data.metric,
                        topic: data.topic
                    }).success(function (response) {
                        if (response.status === 'OK') {
                            cb(response.data);
                        }
                    });
                },
                visited: function (code, cb) {
                    if (code) {
                        $http.post('/adventurer/' + code, {}).success(function (response) {
                            cb(response.data);
                        });
                    }
                },
                assessment: function (data, cb) {

                },
                topic: function (data, cb) {

                }
            };
        }])

        .factory('scores', [function () {

            var scores = {
                'Class Average':{
                    'correct':28,
                    'answered':43,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'20',
                    'question2':'Given that there is nothing more',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Danny A':{
                    'correct':37,
                    'answered':50,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 1660], ['90', 2030]
                    ]
                },
                'Michelle B':{
                    'correct':48,
                    'answered':55,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Alex C':{
                    'correct':58,
                    'answered':60,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'40',
                    'question3':'While the school was not the',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Tim D':{
                    'correct':18,
                    'answered':23,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Jason E':{
                    'correct':24,
                    'answered':45,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Denise F':{
                    'correct':35,
                    'answered':43,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Tiffany G':{
                    'correct':8,
                    'answered':28,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Sarah H':{
                    'correct':38,
                    'answered':47,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Dwayne I':{
                    'correct':4,
                    'answered':20,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'20',
                    'question2':'Given that there is nothing more',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Nathan J':{
                    'correct':34,
                    'answered':52,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Hubert K':{
                    'correct':51,
                    'answered':55,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Jeff L':{
                    'correct':54,
                    'answered':57,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'20',
                    'question2':'Given that there is nothing more',
                    'question_num3':'40',
                    'question3':'While the school was not the',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Johan M':{
                    'correct':15,
                    'answered':36,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Bianca N':{
                    'correct':18,
                    'answered':26,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Chelsea O':{
                    'correct':5,
                    'answered':23,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Alessia P':{
                    'correct':35,
                    'answered':44,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Clifford Q':{
                    'correct':35,
                    'answered':46,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Lorenzo R':{
                    'correct':8,
                    'answered':33,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Arun S':{
                    'correct':27,
                    'answered':37,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Robert T':{
                    'correct':37,
                    'answered':50,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Max U':{
                    'correct':37,
                    'answered':50,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Adi V':{
                    'correct':37,
                    'answered':50,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Falco W':{
                    'correct':37,
                    'answered':50,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Gabriella X':{
                    'correct':37,
                    'answered':50,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Ricky Y':{
                    'correct':37,
                    'answered':50,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'15',
                    'question2':'The couple were _______ when',
                    'question_num3':'21',
                    'question3':'The villagers were encouraged',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                },
                'Billy Z':{
                    'correct':35,
                    'answered':43,
                    'total':165,
                    'question_num1':'12',
                    'question1':'Lorem ipsum something out of',
                    'question_num2':'20',
                    'question2':'Given that there is nothing more',
                    'question_num3':'40',
                    'question3':'While the school was not the',
                    'history': [
                        ['60', 1000], ['70', 1170], ['80', 660], ['90', 1030]
                    ]
                }
            };

            return {
                list: function () {
                    return scores;
                },
                draw: function (name) {
                    if (!name || !scores[name]) {
                        name = 'Class Average';
                    }

                    var data = google.visualization.arrayToDataTable([
                        ['Number of Questions', 'Date']
                    ].concat(scores[name].history));

                    var options = {
                        title: 'Performance Chart',
                        legend: {
                            position: 'none'
                        },
                        hAxis: {
                            title: 'Date'
                        },
                        vAxis: {
                            title: 'Number of Questions'
                        }
                    };

                    var chart = new google.visualization.LineChart(document.getElementById('performance_chart'));
                    chart.draw(data, options);
                }
            };
        }]);

});
