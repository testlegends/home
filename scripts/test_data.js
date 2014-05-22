/**
 * Test DB Sample Data
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/05/21
 */

module.exports = {

    demo_questions_test: [
        {
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
    ],

    clients_test: [
        {
            name: "TestLegends Build",
            clientSecret: "cc560cac675ef6cfe06328b05882d8f7a09dfbbf9d1f63a4208e5ac2953c49a6",
            userId: "1",
            redirectURI: {
                protocol: "http",
                domain: "build.testlegends.com"
            },
            icon: "",
            _id: "53562b9335e2e5c84c0001fa"
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
    ]
};
