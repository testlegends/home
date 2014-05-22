/**
 * Client
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/04/19
 */

module.exports = (function(){

    var tableName = 'clients';

    var attributes = {
        name: {
            type: 'string'
        },

        clientSecret: {
            type: 'string'
        },

        userId: {
            type: 'string'
        },

        redirectURI: {
            type: 'json'
        },

        icon: {
            type: 'string'
        }
    };

    var example = {
        name: 'TestLegends Build',

        clientSecret: 'whatever',

        userId: '1',

        redirectURI: {
            protocol: 'http',
            domain: 'build.testlegends.com'
        },

        icon: 'icon.png'
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes
    };
})();
