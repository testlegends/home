/**
 * referrals_spec
 *
 * @module      :: Specs
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/05/20
 */

var frisby = require('frisby');

var serverUrl = 'http://localhost:1338';

frisby.create('Join Adventure')
    .put(serverUrl + '/adventurers', {
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
    .afterJSON(function (adventurer) {

        // TODO very mysterious that this one and next one switch will cause referrer updated not working
        frisby.create('Join Adventure with Referral Code')
            .put(serverUrl + '/adventurers', {
                email: 'a@a.cc',
                ref: adventurer.data.code
            })
            .expectStatus(200)
            .expectJSON({
                data: {
                    email: 'a@a.cc'
                }
            })
            .afterJSON(function (referred_adventurer) {
                frisby.create('Referrer Updated')
                    .get(serverUrl + '/adventurer/' + adventurer.data.code)
                    .expectStatus(200)
                    .expectJSONLength('data.referrals', 1)
                    .expectJSON({
                        status: 'OK',
                        data: {
                            referrals: [referred_adventurer.data.email]
                        }
                    })
                    .toss();
            })
            .toss();


        frisby.create('Join Adventure with existing record')
            .put(serverUrl + '/adventurers', {
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
                    status: 'already_joined'
                }
            })
            .toss();


        frisby.create('Visit page with Referral Code')
            .post(serverUrl + '/adventurer/' + adventurer.data.code, {})
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

frisby.create('Join Adventure with assessment')
    .put(serverUrl + '/adventurers', {
        email: 'm@m.cc',
        assessment: 'Percentage scored'
    })
    .expectStatus(200)
    .expectJSONTypes({
        status: String,
        data: {
            survey: Object,
            status: String
        }
    })
    .expectJSON({
        status: 'OK',
        data: {
            survey: {
                assessment: 'Percentage scored'
            },
            status: 'newly_joined'
        }
    })
    .afterJSON(function (adventurer) {
        frisby.create('Existing adventurer submit with topic')
            .put(serverUrl + '/adventurers', {
                email: 'm@m.cc',
                topic: 'American History'
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
                    status: 'already_joined'
                }
            })
            .toss();
    })
    .toss();
