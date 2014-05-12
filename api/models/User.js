/**
 * User
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/02/08
 */

var bcrypt = require('bcrypt');

module.exports = {

    tableName: 'users',

    attributes: {
        name: {
            type: 'string',
            required: true
        },

        email: {
            type: 'email',
            required: true
        },

        password: {
            type: 'string'
        },

        role: {
            type: 'string',
            in: ['admin', 'student', 'teacher'],
            defaultsTo: 'student'
        },

        password_reset_key: {
            type: 'string',
            defaultsTo: null
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            delete obj.password_reset_key;
            return obj;
        }
    },

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
