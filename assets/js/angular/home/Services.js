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
                        assessment: data.assessment,
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
                share: function (code) {
                    $('button.facebook').on('click', function(){
                        var facebookShareUrl = 'http://www.facebook.com/dialog/feed?' +
                            'app_id=1412582839022573' + '&' +
                            'link=http://testlegends.herokuapp.com/?ref=' + code + '&' +
                            'message=helloworld' + '&' +
                            'display=popup' + '&' +
                            'redirect_uri=http://testlegends.herokuapp.com/?close_window=true';

                        window.open(facebookShareUrl, 'popUpWindow',
                            'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
                        );
                    });

                    $('button.twitter').on('click', function(){
                        var twitterShareUrl = 'http://twitter.com/share?' +
                            'text=hello' + '&' +
                            'url=http://testlegends.herokuapp.com/?ref=' + code;

                        window.open(twitterShareUrl, 'popUpWindow',
                            'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
                        );
                    });
                }
            };
        }])

        .factory('scores', [function () {

            var scores_data = {
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
                }/*,
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
                }*/
            };

            return {
                list: function () {
                    return scores_data;
                },
                draw: function (name) {
                    if (!name || !scores_data[name]) {
                        name = 'Class Average';
                    }

                    var data = google.visualization.arrayToDataTable([
                        ['Number of Questions', 'Date']
                    ].concat(scores_data[name].history));

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
                },
                percent_calculate: function (score) {
                    var numSplit = score.split('/');
                    var percentage = parseInt(numSplit[0]) / parseInt(numSplit[1]);
                    return Math.round(percentage * 1000) / 10;
                },
                metrics_calculate: function (person) {
                    $('.answered').text(person.answered);
                    $('#answered_percentage').text(Math.round(person.answered / person.total * 1000) / 10 + '%');

                    $('.correct').text(person.correct);
                    $('#correct_percentage').text(Math.round(person.correct / person.answered * 1000) / 10 + '%');
                    $('#total_percentage').text(Math.round(person.correct / person.total * 1000) / 10 + '%');

                    $('#question_num1').text(person.question_num1);
                    $('#question1').text(person.question1);
                    $('#question_num2').text(person.question_num2);
                    $('#question2').text(person.question2);
                    $('#question_num3').text(person.question_num3);
                    $('#question3').text(person.question3);
                }
            };
        }])

        .factory('cities', [function () {
            var cities = {
                'San Francisco': {
                    left: '6%',
                    top: '42%',
                    topic: 'Math'
                },
                'New York': {
                    left: '81%',
                    top: '27%',
                    topic: 'Physics'
                },
                'Chicago': {
                    left: '64%',
                    top: '37%',
                    topic: 'English'
                },
                'Los Angeles': {
                    left: '11%',
                    top: '60%',
                    topic: 'History'
                },
                'Dallas': {
                    left: '50%',
                    top: '70%',
                    topic: 'Math'
                }
            };

            return {
                list: function () {
                    return cities;
                }
            };
        }]);

});
