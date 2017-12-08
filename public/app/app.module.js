"use strict";

angular.module("arcgis-am_1.0.1.directives", []);
angular.module("arcgis-am_1.0.1.factories", []);
angular.module("arcgis-am_1.0.1.services", ["arcgis-am_1.0.1.factories"]);
angular.module("arcgis-am_1.0.1.controllers", ["arcgis-am_1.0.1.services"]);

angular
	.module("arcgis-am_1.0.1", [
		"pelorus.services",

		"arcgis-am_1.0.1.directives",
		"arcgis-am_1.0.1.factories",
		"arcgis-am_1.0.1.services",
		"arcgis-am_1.0.1.controllers",
	])
	.run([function() {
		console.log("Arcgis AM module is available!"); // eslint-disable-line no-console
	}]);
