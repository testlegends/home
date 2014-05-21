/**
 * referals_spec
 *
 * @module      :: Specs
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

var frisby = require('frisby');

var serverUrl = 'http://localhost:1338';

frisby.create('Join Adventure')
    .put(serverUrl + '/referals', {
        email: 'q@q.cc'
    })
    .expectStatus(200)
    .expectJSONTypes({
        status: String,
        data: {
            email: String,
            code: String
        }
    })
    .expectJSON({
        status: 'OK',
        data: {
            email: 'q@q.cc'
        }
    })
    .toss();
