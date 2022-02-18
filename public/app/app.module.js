"use strict";

angular.module("arcgis-am_1.1.18.directives", []);
angular.module("arcgis-am_1.1.18.factories", []);
angular.module("arcgis-am_1.1.18.services", ["arcgis-am_1.1.18.factories"]);
angular.module("arcgis-am_1.1.18.controllers", ["arcgis-am_1.1.18.services"]);

angular
	.module("arcgis-am_1.1.18", [
		"pelorus.services",

		"arcgis-am_1.1.18.directives",
		"arcgis-am_1.1.18.factories",
		"arcgis-am_1.1.18.services",
		"arcgis-am_1.1.18.controllers",
	])
	.run([function() {
		console.log("Arcgis AM module is available!"); // eslint-disable-line no-console
	}]);
