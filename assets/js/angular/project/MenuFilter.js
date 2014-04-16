
define(['angular'], function (angular) {
	'use strict';

	return angular.module('Project.filters', [])
		.filter('filterMenu', function () {
			return function (input, filterPredicate) {
				var out = [];

				if (filterPredicate.name === '' && filterPredicate.item === '') {
					return input;
				}

				for (var i = 0; i < input.length; i++) {
					if (filterPredicate.name === "Category" && $.inArray(filterPredicate.item, input[i].info.category) !== -1) {
						out.push(input[i]);
					} else if (filterPredicate.name === "Purpose" && $.inArray(filterPredicate.item, input[i].info.purpose) !== -1) {
						out.push(input[i]);
					} else if (filterPredicate.name === "Year" && filterPredicate.item === input[i].info.year) {
						out.push(input[i]);
					} else if (filterPredicate.name === "Status" && filterPredicate.item === input[i].info.status) {
						out.push(input[i]);
					}
				}

				return out;
			};
		});
});