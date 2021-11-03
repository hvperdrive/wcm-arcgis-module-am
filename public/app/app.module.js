"use strict";

angular.module("arcgis-am_1.1.12.directives", []);
angular.module("arcgis-am_1.1.12.factories", []);
angular.module("arcgis-am_1.1.12.services", ["arcgis-am_1.1.12.factories"]);
angular.module("arcgis-am_1.1.12.controllers", ["arcgis-am_1.1.12.services"]);

angular
	.module("arcgis-am_1.1.12", [
		"pelorus.services",

		"arcgis-am_1.1.12.directives",
		"arcgis-am_1.1.12.factories",
		"arcgis-am_1.1.12.services",
		"arcgis-am_1.1.12.controllers",
	])
	.run([function() {
		console.log("Arcgis AM module is available!"); // eslint-disable-line no-console
	}]);
