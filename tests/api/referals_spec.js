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
            code: String,
            status: String,
            count: Number,
            visited: Number
        }
    })
    .expectJSON({
        status: 'OK',
        data: {
            email: 'q@q.cc',
            count: 0,
            visited: 0,
            status: 'newly_joined'
        }
    })
    .afterJSON(function (referal) {
        frisby.create('Join Adventure with Referal Code')
            .put(serverUrl + '/referals', {
                email: 'a@a.cc',
                ref: referal.data.code
            })
            .expectStatus(200)
            .expectJSON({
                data: {
                    email: 'a@a.cc'
                }
            })
            .afterJSON(function (referred) {
                frisby.create('Referer Updated')
                    .get(serverUrl + '/referal/' + referal.data.code)
                    .expectStatus(200)
                    .expectJSONLength('data.referals', 1)
                    .expectJSON({
                        status: 'OK',
                        data: {
                            referals: ['a@a.cc']
                        }
                    })
                    .toss();
            })
            .toss();


        frisby.create('Join Adventure with existing record')
            .put(serverUrl + '/referals', {
                email: 'q@q.cc'
            })
            .expectStatus(200)
            .expectJSONTypes({
                status: String,
                data: {
                    status: String
                }
            })
            .expectJSON({
                status: 'OK',
                data: {
                    status: 'joined'
                }
            })
            .toss();


        frisby.create('Visit page with Referal Code')
            .post(serverUrl + '/referal/' + referal.data.code, {})
            .expectStatus(200)
            .expectJSONTypes({
                status: String,
                data: {
                    visited: Number
                }
            })
            .expectJSON({
                status: 'OK',
                data: {
                    visited: 1
                }
            })
            .toss();
    })
    .toss();
