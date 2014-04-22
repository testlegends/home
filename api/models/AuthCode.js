
module.exports = {

    tableName: 'authorization_codes',

    attributes: {
        clientId: {
            type: 'string'
        },
        userId: {
            type: 'string'
        },
        redirectURI: {
            type: 'url'
        },
        code: {
            type: 'string'
        }
    }
};
