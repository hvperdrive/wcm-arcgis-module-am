"use strict";

angular.module("wcm-arcgis-module-am_0.0.7.directives", []);
angular.module("wcm-arcgis-module-am_0.0.7.factories", []);
angular.module("wcm-arcgis-module-am_0.0.7.services", ["wcm-arcgis-module-am_0.0.7.factories"]);
angular.module("wcm-arcgis-module-am_0.0.7.controllers", ["wcm-arcgis-module-am_0.0.7.services"]);

angular
	.module("wcm-arcgis-module-am_0.0.7", [
    "pelorus.services",

    "wcm-arcgis-module-am_0.0.7.directives",
    "wcm-arcgis-module-am_0.0.7.factories",
    "wcm-arcgis-module-am_0.0.7.services",
    "wcm-arcgis-module-am_0.0.7.controllers"
])
	.run([function() {
    console.log("Arcgis AM module is available!"); // eslint-disable-line no-console
}]);
