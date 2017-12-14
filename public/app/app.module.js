"use strict";

angular.module("arcgis-am_1.1.10.directives", []);
angular.module("arcgis-am_1.1.10.factories", []);
angular.module("arcgis-am_1.1.10.services", ["arcgis-am_1.1.10.factories"]);
angular.module("arcgis-am_1.1.10.controllers", ["arcgis-am_1.1.10.services"]);

angular
	.module("arcgis-am_1.1.10", [
		"pelorus.services",

		"arcgis-am_1.1.10.directives",
		"arcgis-am_1.1.10.factories",
		"arcgis-am_1.1.10.services",
		"arcgis-am_1.1.10.controllers",
	])
	.run([function() {
		console.log("Arcgis AM module is available!"); // eslint-disable-line no-console
	}]);
