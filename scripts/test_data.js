/**
 * Test DB Sample Data
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/21
 */

var ObjectID = require('mongodb').ObjectID;

module.exports = {

    adventurers_test: [
        {
            email: "leejefon@gmail.com",
            code: "Ei2MmP",
            visited: 2,
            referrals: [
                "hubert.pt.ka@gmail.com"
            ],
            survey: {
                satisfaction: 1
            },
            _id: new ObjectID("537c0713e478890b0037d97a")
        },
        {
            email: "hubert.pt.ka@gmail.com",
            code: "Ei2MmQ",
            visited: 2,
            referrals: [],
            survey: {
                satisfaction: 1
            },
            _id: new ObjectID("537c0713e478890b0f3028c3")
        }
    ],

    clients_test: [
        {
            name: "TestLegends App",
            clientSecret: "9532e520710b03bc7fd827fe4094240cd578a658195c3bba8c3520d8386a405a",
            userId: "abcdef1234567890deadbeef",
            redirectURI: {
                protocol: "http",
                domain: "app.testlegends.com"
            },
            icon: "",
            _id: new ObjectID("536c7df8fe3a9bf0fa000216")
        },
        {
            name: "TestLegends Build",
            clientSecret: "cc560cac675ef6cfe06328b05882d8f7a09dfbbf9d1f63a4208e5ac2953c49a6",
            userId: "abcdef1234567890deadbeef",
            redirectURI: {
                protocol: "http",
                domain: "build.testlegends.com"
            },
            icon: "",
            _id: new ObjectID("53562b9335e2e5c84c0001fa")
        }
    ],

    users_test: [
        {
            name: "Jeff Lee",
            email: "q@q.cc",
            password: "$2a$10$z8pa3ARMJyhMNOBKJ/XZcO2y4lbFxHosPkMpI5xAy0F2fc4UN7P5C",
            password_reset_key: null,
            role: "admin",
            games: [],
            meta: {},
            _id: new ObjectID("abcdef1234567890deadbeef")
        },
        {
            name: "Test User",
            email: "a@a.cc",
            password: "$2a$10$z8pa3ARMJyhMNOBKJ/XZcO2y4lbFxHosPkMpI5xAy0F2fc4UN7P5C",
            password_reset_key: null,
            role: "admin",
            games: [],
            meta: {},
            _id: new ObjectID("53562b9335e2098c4c0001fa")
        }
    ]
};
