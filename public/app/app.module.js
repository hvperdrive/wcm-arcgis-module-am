"use strict";

angular.module("arcgis-am_1.1.7.directives", []);
angular.module("arcgis-am_1.1.7.factories", []);
angular.module("arcgis-am_1.1.7.services", ["arcgis-am_1.1.7.factories"]);
angular.module("arcgis-am_1.1.7.controllers", ["arcgis-am_1.1.7.services"]);

angular
	.module("arcgis-am_1.1.7", [
		"pelorus.services",

		"arcgis-am_1.1.7.directives",
		"arcgis-am_1.1.7.factories",
		"arcgis-am_1.1.7.services",
		"arcgis-am_1.1.7.controllers",
	])
	.run([function() {
		console.log("Arcgis AM module is available!"); // eslint-disable-line no-console
	}]);
