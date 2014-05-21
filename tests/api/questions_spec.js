/**
 * questions_spec
 *
 * @module      :: Specs
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

var frisby = require('frisby');

var serverUrl = 'http://localhost:1338';

frisby.create('Add questions')
    .put(serverUrl + '/questions', {
        content: 'hello'
    })
    .expectStatus(200)
    .expectJSONTypes({
        status: String,
        data: {
            content: String,
            options: Array
        }
    })
    .expectJSON({
        status: 'OK',
        data: {
            content: 'hello'
        }
    })
    .toss();

frisby.create('Get a list of questions')
    .get('http://localhost:1338/questions')
    .expectStatus(200)
    .expectJSONLength(2)
    .expectJSONTypes({
        status: String,
        data: Array
    })
    .toss();

var id = 2;
frisby.create('Get question by Id')
    .get(serverUrl + '/question/' + id)
    .expectStatus(200)
    .expectJSONTypes({
        status: String,
        data: {
            content: String,
            options: Array
        }
    })
    .expectJSON({
        status: 'OK',
        data: {
            content: 'hello find'
        }
    })
    .toss();

frisby.create('Get latest question')
    .get(serverUrl + '/question/latest')
    .expectStatus(200)
    .expectJSONTypes({
        status: String,
        data: {
            content: String,
            options: Array
        }
    })
    .expectJSON({
        status: 'OK',
        data: {
            content: 'hello latest'
        }
    })
    .toss();
