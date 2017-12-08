"use strict";

angular
	.module("arcgis-am_1.0.1")
	.config([
		"$stateProvider",
		"aarcgisAMConfigProvider",

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
