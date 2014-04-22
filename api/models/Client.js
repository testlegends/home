
module.exports = {

    tableName: 'clients',

    attributes: {
        name: {
            type: 'string'
        },
        clientSecret: {
            type: 'string'
        }
    },

    beforeCreate: function (client, cb) {
        Client.count(function (err, num) {
            client._id = num + 1;
            cb(null, client);
        });
    }
};
