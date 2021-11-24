"use strict";

angular.module("arcgis-am_1.1.13.directives", []);
angular.module("arcgis-am_1.1.13.factories", []);
angular.module("arcgis-am_1.1.13.services", ["arcgis-am_1.1.13.factories"]);
angular.module("arcgis-am_1.1.13.controllers", ["arcgis-am_1.1.13.services"]);

angular
	.module("arcgis-am_1.1.13", [
		"pelorus.services",

		"arcgis-am_1.1.13.directives",
		"arcgis-am_1.1.13.factories",
		"arcgis-am_1.1.13.services",
		"arcgis-am_1.1.13.controllers",
	])
	.run([function() {
		console.log("Arcgis AM module is available!"); // eslint-disable-line no-console
	}]);
