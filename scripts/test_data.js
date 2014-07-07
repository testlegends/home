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
            referals: [
                "hubert.pt.ka@gmail.com"
            ],
            meta: {
                user_agent: {
                    device: 'iPhone',
                    os: 'iOS X',
                    browser: 'Chrome'
                }
            },
            _id: new ObjectID("537c0713e478890b0037d97a"),
        }
    ],

    clients_test: [
        {
            name: "TestLegends App",
            clientSecret: "9532e520710b03bc7fd827fe4094240cd578a658195c3bba8c3520d8386a405a",
            userId: "1",
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
            userId: "1",
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
            payments: [],
            _id: "1"
        }
    ],

    /*
    demo_questions_test: [
        {
            game: 'Physics',
            content: "What is the acceleration due to gravity on Earth?",
            options: {
                correct: "9.81 m/s^2",
                wrong: [
                    { text: "6.67x10-11 m^3kg^-1s^-2" },
                    { text: "the same as on the Sun" },
                    { text: "all of the above" }
                ]
            }
        },
        {
            game: 'English',
            content: "When did Christopher Columbus first land on the shores of America?",
            options: {
                correct: "July 4, 1776 AD",
                wrong: [
                    { text: "Jan 1, 0 AD" },
                    { text: "Oct 12, 1492 AD" },
                    { text: "in the 14th century" }
                ]
            }
        },
        {
            game: 'Game of Thrones',
            content: "What does the character Jon Snow from Game of Thrones know?",
            options: {
                correct: "Nothing",
                wrong: [
                    { text: "Hodor!" },
                    { text: "Valar Morghulis" },
                    { text: "don't be related to Sean Bean's character" }
                ]
            }
        },
        {
            game: 'Physics',
            content: "if n=8, which of the following is equivalent to xn2 + xn + x?",
            options: {
                correct: "8(x^2 + x + 1)",
                wrong: [
                    { text: "8(x^2 + 1)" },
                    { text: "8(x^2 + x + 1)" },
                    { text: "8(x + 1)^2" }
                ]
            }
        }
    ]*/

};
