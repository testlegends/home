
module.exports = {

    tableName: 'access_tokens',

    attributes: {
        userId: {
            type: 'string'
        },
        clientId: {
            type: 'string'
        },
        token: {
            type: 'string'
        }
    }
};
