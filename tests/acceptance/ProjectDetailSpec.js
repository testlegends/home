'use strict';

describe('Project Catalog', function () {
	xit('should redirect / to /#/projects', function() {
		var projectHome = new ProjectHome();
		projectHome.get();
		expect(projectHome.getHash()).toBe('/projects');
	});
});

var ProjectHome = function () {
	this.get = function () {
		browser.get('/');
	};

	this.getHash = function () {
		return browser.getLocationAbsUrl().then(function (url) {
			return url.split('#')[1];
		});
	};
};
