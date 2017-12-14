"use strict";

angular
	.module("arcgis-am_1.1.7")
	.config([
		"$stateProvider",
		"arcgisAMConfigProvider",

		function(
			$stateProvider,
			acpaassearchConfigProvider
		) {

			var moduleFolder = acpaassearchConfigProvider.API.modulePath;

			$stateProvider
			.state("pelorus.arcgis-am.index", {
				url: "",
				access: {
					requiresLogin: true,
				},
				ncyBreadcrumb: {
					label: "{{breadcrumb}}",
				},
				templateUrl: moduleFolder + "views/overview.html",
				controller: "arcgisAMOverviewController",
			});
		},
	]
);
