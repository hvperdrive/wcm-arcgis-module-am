"use strict";

angular.module("arcgis-am_1.1.0.directives", []);
angular.module("arcgis-am_1.1.0.factories", []);
angular.module("arcgis-am_1.1.0.services", ["arcgis-am_1.1.0.factories"]);
angular.module("arcgis-am_1.1.0.controllers", ["arcgis-am_1.1.0.services"]);

angular
	.module("arcgis-am_1.1.0", [
		"pelorus.services",

		"arcgis-am_1.1.0.directives",
		"arcgis-am_1.1.0.factories",
		"arcgis-am_1.1.0.services",
		"arcgis-am_1.1.0.controllers",
	])
	.run([function() {
		console.log("Arcgis AM module is available!"); // eslint-disable-line no-console
	}]);
