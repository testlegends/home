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

frisby.create('Get a list of questions by game')
    .get('http://localhost:1338/questions')
    .expectStatus(200)
    .expectJSONLength(2)
    .expectJSONTypes({
        status: String,
        data: Array
    })
    .toss();
