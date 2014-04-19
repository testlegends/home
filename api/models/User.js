/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 * @created     :: 2014/02/08
 */

var bcrypt = require('bcrypt');

module.exports = {

    tableName: 'users',

    attributes: {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string'
        },
        email: {
            type: 'email'
        },
        role: {
            type: 'string',
            in: ['admin', 'regular']
        },
        password_reset_key: {
            type: 'string',
            defaultsTo: null
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
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
