var sails = require('sails');
var iniparser = require('iniparser');

var sailsrc = {
	hooks: {
		grunt: false
	}
};

iniparser.parse('.env', function(err, data){
	if (!err) {
		process.env = sails.util.merge(process.env, data);
	}

	if (process.env.NEW_RELIC_LICENSE_KEY) {
		require('newrelic');
	}

	if (process.env.NODETIME_ACCOUNT_KEY) {
		require('nodetime').profile({
			accountKey: process.env.NODETIME_ACCOUNT_KEY,
			appName: 'TestLegends'
		});
	}

	var config = sails.util.merge(require('optimist').argv, sailsrc);
	sails.lift(config);
});
