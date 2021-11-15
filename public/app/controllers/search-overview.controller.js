"use strict";

angular
	.module("arcgis-am_1.1.12.controllers")
	.controller("arcgisAMOverviewController", [
		"$scope",
		"$timeout",
		"arcgisAMFactory",
		"LabelService",
		"NotificationService",

		function(
			$scope,
			$timeout,
			acpaassearchFactory,
			LabelService,
			NotificationService
		) {
			$scope.reindexing = false;

			$scope.reindexSearch = function() {
				$scope.reindexing = true;
				acpaassearchFactory
					.reindexSearch()
					.then(function() {
						NotificationService.showNotification(
							LabelService.getString("The search is reindexing..."),
							"top",
							"success",
							7000
						);

						$timeout(function() {
							$scope.reindexing = false;
						}, 10000);
					}, function(err) {
						NotificationService.showNotification(
							LabelService.getString(err),
							"top",
							"error",
							7000
						);

						$scope.reindexing = false;
					});
			};
		},
	]);
