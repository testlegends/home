var iniparser = require('iniparser');
var _ = require('underscore');

iniparser.parse('.env', function(err, data){
	if (!err) {
		process.env = _.extend(process.env, data);
	}

	if (!_.isUndefined(process.env.NEW_RELIC_LICENSE_KEY)) {
		require('newrelic');
	}

	if (!_.isUndefined(process.env.NODETIME_ACCOUNT_KEY)) {
		require('nodetime').profile({
			accountKey: process.env.NODETIME_ACCOUNT_KEY,
			appName: 'TestLegends'
		});
	}

	require('sails').lift(require('optimist').argv);
});
