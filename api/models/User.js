/**
 * User
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

var bcrypt = require('bcrypt');

module.exports = (function(){

    var tableName = 'users';

    var attributes = {
        name: {
            type: 'string',
            required: true
        },

        email: {
            type: 'email',
            required: true
        },

        role: {
            type: 'string',
            in: ['admin', 'student', 'teacher'],
            defaultsTo: 'student'
        },

        password: {
            type: 'string'
        },

        password_reset_key: {
            type: 'string',
            defaultsTo: null
        },

        games: {
            type: 'array',
            defaultsTo: []
        },

        payments: {
            type: 'array',
            defaultsTo: []
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            delete obj.password_reset_key;
            return obj;
        }
    };

    var example = {
        name: 'Jeff Lee',
        email: 'leejefon@gmail.com',
        role: 'admin',
        password: 'password',
        password_reset_key: null,
        games: [
            {
                // put this in user to support random stage access
                id: "1",
                questions_completed: 10
            }
        ],
        payments: [

        ]
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes,

        beforeCreate: function (user, cb) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) {
                        console.log(err);
                        cb(err);
                    } else {
                        user.password = hash;
                        cb(null, user);
                    }
                });
            });
        },

        beforeUpdate: function (user, cb) {
            if (user.password) {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) {
                            console.log(err);
                            cb(err);
                        } else {
                            user.password = hash;
                            cb(null, user);
                        }
                    });
                });
            } else {
                cb();
            }
        }
    };
})();
