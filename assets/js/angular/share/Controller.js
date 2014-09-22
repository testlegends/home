/**
 * ShareControllers
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/07/22
 */

define(['angular', 'share/Service'], function (angular) {
	'use strict';

	return angular.module('Share.controllers', ['Share.services'])

		.controller('ShareController', ['$scope', '$location', 'share', function ($scope, $location, share) {

            $scope.name = "ShareController";

			$scope.refCode = $location.search().refCode;

			share.get($scope.refCode, function (err, data) {
				$scope.progress = data.length / 5 * 100;
			});

			if ($location.search().s) {
				share.updateSatisfaction($scope.refCode, $location.search().s);
			}

			$scope.facebookShared = function () {
				var facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?' +
					'u=https://home.testlegends.com/?ref=' + $scope.refCode;

				window.open(facebookShareUrl, 'popUpWindow',
					'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
				);
			};

			$scope.twitterShared = function () {
				var twitterShareUrl = 'https://twitter.com/share?' +
					"text=You don't need to be a developer to %23gamifyEducation anymore. Teachers can too! via %40TestLegendsApp" + '&' +
					'url=https://home.testlegends.com/?ref=' + $scope.refCode;

				window.open(twitterShareUrl, 'popUpWindow',
					'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
				);
			};

			$scope.emailShared = function () {
				window.location.href="mailto:?Subject=TestLegends";
			};
		}]);
});
