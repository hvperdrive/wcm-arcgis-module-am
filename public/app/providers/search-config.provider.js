"use strict";

angular
	.module("wcm-arcgis-module-am_0.0.7")
	.provider("arcgisAMConfig", [

    function membersConfig(MODULE_ENV_CONFIG) {
        this.API = {
            name: "wcm-arcgis-module-am",
            version: "0.0.7",
            basePath: "app/modules/"
        };

        this.API.modulePath = this.API.basePath + this.API.name + "_" + this.API.version + "/";

        this.$get = function get() {
            return this.API;
        };
    }
]);
