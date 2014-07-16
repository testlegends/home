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
                            'link=http://testlegends.com/?ref=' + code + '&' +
                            'message=helloworld' + '&' +
                            'display=popup' + '&' +
                            'redirect_uri=http://testlegends.com/?close_window=true';

                        window.open(facebookShareUrl, 'popUpWindow',
                            'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
                        );
                    });

                    $('button.twitter').on('click', function(){
                        var twitterShareUrl = 'http://twitter.com/share?' +
                            'text=hello' + '&' +
                            'url=http://testlegends.com/?ref=' + code;

                        window.open(twitterShareUrl, 'popUpWindow',
                            'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
                        );
                    });
                }
            };
        }])

        .factory('scores', [function () {

            var scores_data = {
                'Class Average': {
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
                        ['Sep 1', 27], ['Sep 8', 18], ['Sep 15', 20], ['Sep 22', 25],
                        ['Sep 29', 32], ['Oct 6', 37], ['Oct 13', 39], ['Oct 20', 45],
                        ['Oct 27', 65], ['Nov 3', 70], ['Nov 10', 86]
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
                        ['Sep 1', 87], ['Sep 8', 73], ['Sep 15', 72], ['Sep 22', 68],
                        ['Sep 29', 82], ['Oct 6', 73], ['Oct 13', 72], ['Oct 20', 78],
                        ['Oct 27', 70], ['Nov 3', 86], ['Nov 10', 74]

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
                        ['Sep 1', 92], ['Sep 8', 75], ['Sep 15', 77], ['Sep 22', 83],
                        ['Sep 29', 89], ['Oct 6', 88], ['Oct 13', 83], ['Oct 20', 88],
                        ['Oct 27', 91], ['Nov 3', 88], ['Nov 10', 87.3]
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
                        ['Sep 1', 100], ['Sep 8', 92], ['Sep 15', 94], ['Sep 22', 97],
                        ['Sep 29', 100], ['Oct 6', 96], ['Oct 13', 99], ['Oct 20', 98],
                        ['Oct 27', 95], ['Nov 3', 100], ['Nov 10', 96.7]
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
                        ['Sep 1', 80], ['Sep 8', 54], ['Sep 15', 68], ['Sep 22', 80],
                        ['Sep 29', 85], ['Oct 6', 78], ['Oct 13', 73], ['Oct 20', 80],
                        ['Oct 27', 65], ['Nov 3', 70], ['Nov 10', 78.3]
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
                        ['Sep 1', 27], ['Sep 8', 18], ['Sep 15', 20], ['Sep 22', 35],
                        ['Sep 29', 32], ['Oct 6', 37], ['Oct 13', 38], ['Oct 20', 39],
                        ['Oct 27', 40], ['Nov 3', 49], ['Nov 10', 53.3]
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
                        ['Sep 1', 34], ['Sep 8', 30], ['Sep 15', 40], ['Sep 22', 45],
                        ['Sep 29', 50], ['Oct 6', 55], ['Oct 13', 57], ['Oct 20', 60],
                        ['Oct 27', 65], ['Nov 3', 68], ['Nov 10', 81.4]
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
                        ['Sep 1', 27], ['Sep 8', 18], ['Sep 15', 23], ['Sep 22', 27],
                        ['Sep 29', 31], ['Oct 6', 25], ['Oct 13', 17], ['Oct 20', 18],
                        ['Oct 27', 22], ['Nov 3', 23], ['Nov 10', 28.6]
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
                        ['Sep 1', 75], ['Sep 8', 67], ['Sep 15', 74], ['Sep 22', 70],
                        ['Sep 29', 65], ['Oct 6', 68], ['Oct 13', 70], ['Oct 20', 75],
                        ['Oct 27', 82], ['Nov 3', 85], ['Nov 10', 80.9]
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
                        ['Sep 1', 11], ['Sep 8', 15], ['Sep 15', 18], ['Sep 22', 25],
                        ['Sep 29', 25], ['Oct 6', 25], ['Oct 13', 25], ['Oct 20', 20],
                        ['Oct 27', 20], ['Nov 3', 20], ['Nov 10', 20]
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
                        ['Sep 1', 10], ['Sep 8', 15], ['Sep 15', 20], ['Sep 22', 25],
                        ['Sep 29', 28], ['Oct 6', 30], ['Oct 13', 45], ['Oct 20', 55],
                        ['Oct 27', 62.3], ['Nov 3', 70], ['Nov 10', 65.4]
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
                        ['Sep 1', 50], ['Sep 8', 30], ['Sep 15', 40], ['Sep 22', 65],
                        ['Sep 29', 70], ['Oct 6', 75], ['Oct 13', 85], ['Oct 20', 90],
                        ['Oct 27', 90], ['Nov 3', 95], ['Nov 10', 92.7]
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
                        ['Sep 1', 50], ['Sep 8', 60], ['Sep 15', 65], ['Sep 22', 68],
                        ['Sep 29', 76], ['Oct 6', 70], ['Oct 13', 80], ['Oct 20', 85],
                        ['Oct 27', 95], ['Nov 3', 100], ['Nov 10', 94.7]
                    ]
                },
                'Adi M':{
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
                        ['Sep 1', 27], ['Sep 8', 18], ['Sep 15', 20], ['Sep 22', 35],
                        ['Sep 29', 32], ['Oct 6', 37], ['Oct 13', 38], ['Oct 20', 39],
                        ['Oct 27', 40], ['Nov 3', 49], ['Nov 10', 41.7]
                    ]
                },
                'Arun N':{
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
                        ['Sep 1', 10], ['Sep 8', 15], ['Sep 15', 20], ['Sep 22', 25],
                        ['Sep 29', 28], ['Oct 6', 30], ['Oct 13', 45], ['Oct 20', 55],
                        ['Oct 27', 62.3], ['Nov 3', 70], ['Nov 10', 69.2]
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
                        ['Sep 1', 11], ['Sep 8', 15], ['Sep 15', 18], ['Sep 22', 25],
                        ['Sep 29', 25], ['Oct 6', 25], ['Oct 13', 25], ['Oct 20', 20],
                        ['Oct 27', 20], ['Nov 3', 20], ['Nov 10', 21.7]
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
                        ['Sep 1', 75], ['Sep 8', 67], ['Sep 15', 74], ['Sep 22', 70],
                        ['Sep 29', 65], ['Oct 6', 68], ['Oct 13', 70], ['Oct 20', 75],
                        ['Oct 27', 82], ['Nov 3', 85], ['Nov 10', 79.5]
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
                        ['Sep 1', 75], ['Sep 8', 67], ['Sep 15', 74], ['Sep 22', 70],
                        ['Sep 29', 65], ['Oct 6', 78], ['Oct 13', 60], ['Oct 20', 65],
                        ['Oct 27', 72], ['Nov 3', 75], ['Nov 10', 76.1]
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
                        ['Sep 1', 11], ['Sep 8', 15], ['Sep 15', 18], ['Sep 22', 25],
                        ['Sep 29', 25], ['Oct 6', 25], ['Oct 13', 25], ['Oct 20', 20],
                        ['Oct 27', 20], ['Nov 3', 20], ['Nov 10', 24.2]
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
                        ['Sep 1', 27], ['Sep 8', 18], ['Sep 15', 20], ['Sep 22', 25],
                        ['Sep 29', 32], ['Oct 6', 37], ['Oct 13', 39], ['Oct 20', 45],
                        ['Oct 27', 65], ['Nov 3', 70], ['Nov 10', 86]
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
                        ['Sept 1', 30], ['Sept 8', 22], ['Sept 15', 54], ['Sept 22', 65]
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
                drawChart: function (name) {
                    if (!name || !scores_data[name]) {
                        name = 'Class Average';
                    }

                    var data = google.visualization.arrayToDataTable([
                        ['Date', 'score (%)']
                    ].concat(scores_data[name].history));

                    var options = {
                        title: 'Performance Chart',
                        curveType: 'function',
                        pointSize: 8,
                        height: 270,
                        colors: ['orange'],
                        chartArea: {
                            left: 80, width: '85%'
                        },
                        legend: {
                            position: 'none'
                        },
                        hAxis: {
                            title: 'Date'
                        },
                        vAxis: {
                            title: 'percentage correct (%)',
                            viewWindow: {
                                min: 0,
                                max: 105
                            }
                        }
                    };

                    var chart = new google.visualization.LineChart(document.getElementById('performance_chart'));
                    chart.draw(data, options);
                },
                drawMeter: function (name) {
                    if (!name || !scores_data[name]) {
                        name = 'Class Average';
                    }

                    var person = scores_data[name];
                    render_timer(person.answered, person.total, "QAmeter");
                    render_timer(person.correct, person.answered, "QCmeter");

                    function render_timer (remain_seconds, total_seconds, meter) {
                        yellow_portion = Math.floor(parseFloat(total_seconds - remain_seconds) / parseFloat(total_seconds) * 360);
                        white_portion = Math.floor(parseFloat(remain_seconds) / parseFloat(total_seconds) * 360);

                        var data = [white_portion, yellow_portion];
                        var colors = [["black", "black"], ["#666666", "#666666"]];

                        colors = color_gradient(remain_seconds, total_seconds);

                        canvas = document.getElementById(meter);
                        var context = canvas.getContext("2d");

                        for (var i = 0; i < data.length; i++) {
                            drawSegment(canvas, context, i, data, colors[i]);
                        }
                    }

                    function color_gradient (top, bottom) {
                        var colorG = [["black", "black"], ["#666666", "#666666"]];
                        if (top / bottom < 0.25) {
                            colorG = [["#FF0000", "#DD0000"], ["#666666", "#666666"]];
                        } else if (top / bottom < 0.5) {
                            colorG = [["#FF9D00", "#FF7B00"], ["#666666", "#666666"]];
                        } else if (top / bottom < 0.75) {
                            colorG = [["#FFFF00", "#FFEC00"], ["#666666", "#666666"]];
                        } else {
                            colorG = [["#89FF00", "#13FF00"], ["#666666", "#666666"]];
                        }
                        return colorG;
                    }

                    function drawSegment (canvas, context, i, data, color) {
                        context.save();
                        var centerX = Math.floor(canvas.width / 2);
                        var centerY = Math.floor(canvas.height / 2);
                        radius = Math.floor(canvas.width / 2);

                        // angle hack -> used to start at 45 deg
                        // now it starts at 0 deg
                        start_angle_input = sumTo(data, i) - 90;
                        if (start_angle_input < 0) {
                            start_angle_input = start_angle_input + 360;
                        }

                        var startingAngle = degreesToRadians(start_angle_input);
                        var arcSize = degreesToRadians(data[i]);
                        var endingAngle = startingAngle + arcSize;

                        context.beginPath();
                        context.moveTo(centerX, centerY);
                        context.arc(centerX, centerY, radius, startingAngle, endingAngle, false);
                        context.closePath();

                        var my_gradient = context.createLinearGradient(0, 0, 0, 170);
                        my_gradient.addColorStop(0, color[0]);
                        my_gradient.addColorStop(1, color[1]);
                        context.fillStyle = my_gradient;

                        // context.fillStyle = colors[i];
                        context.fill();

                        context.restore();
                    }

                    function degreesToRadians (degrees) {
                        return (degrees * Math.PI) / 180;
                    }

                    function sumTo (a, i) {
                        var sum = 0;
                        for (var j = 0; j < i; j++) {
                            sum += a[j];
                        }
                        return sum;
                    }
                },
                populateData: function (name) {
                    if (!name || !scores_data[name]) {
                        name = 'Class Average';
                    }

                    var person = scores_data[name];

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
                'San Francisco, CA': {
                    topic: 'Math - Gr. 2, Fractions',
                    avatar: 'images/teachers/anthony.jpg',
                    top: '40%',
                    left: '3%'
                },
                'New York, NY': {
                    topic: 'Gr 8 Science',
                    avatar: 'images/teachers/regine.jpg',
                    top: '26.5%',
                    left: '87.5%'
                },
                'Chicago, IL': {
                    topic: 'English, Jane Eyre hwk',
                    avatar: 'images/teachers/emily.jpg',
                    top: '31%',
                    left: '64%'
                },
                'Los Angeles, CA': {
                    topic: 'Spanish, beginner prep',
                    avatar: 'images/teachers/jason.jpg',
                    top: '55.5%',
                    left: '8%'
                },
                'Dallas, TX': {
                    topic: 'Earth and Space Science',
                    avatar: 'images/teachers/albert.jpg',
                    top: '66%',
                    left: '50%'
                },
                'Denver, CO': {
                    topic: 'Environmental Studies',
                    avatar: 'images/teachers/chris.jpg',
                    top: '41%',
                    left: '35%'
                },
                'Atlanta, GA': {
                    topic: 'Penguins',
                    avatar: 'images/teachers/alyx.jpg',
                    top: '58%',
                    left: '73%'
                }
            };

            return {
                list: function () {
                    return cities;
                }
            };
        }]);

});
