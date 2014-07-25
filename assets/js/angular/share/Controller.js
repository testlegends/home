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
				var facebookShareUrl = 'https://www.facebook.com/dialog/feed?' +
					'app_id=1412582839022573' + '&' +
					'link=http://testlegends.com/?ref=' + $scope.refCode + '&' +
					'display=popup' + '&' +
					'redirect_uri=http://testlegends.com/?close_window=true';

				window.open(facebookShareUrl, 'popUpWindow',
					'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
				);
			};

			$scope.twitterShared = function () {
				var twitterShareUrl = 'http://twitter.com/share?' +
					"text=You don't need to be a developer to #gamifyEducation anymore. Teachers can too! via @TestLegendsApp" + '&' +
					'url=http://testlegends.com/?ref=' + $scope.refCode;

				window.open(twitterShareUrl, 'popUpWindow',
					'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
				);
			};

			$scope.emailShared = function () {
				window.location.href="mailto:?Subject=TestLegends";
			};
		}]);
});
