"use strict";

angular
    .module("wcm-arcgis-module-am_0.0.7")
    .config([
        "$stateProvider",
        "arcgisAMConfigProvider",

        function(
            $stateProvider,
            acpaassearchConfigProvider
        ) {

            var moduleFolder = acpaassearchConfigProvider.API.modulePath;

            $stateProvider
                .state("pelorus.wcm-arcgis-module-am.index", {
                    url: "",
                    access: {
                        requiresLogin: true
                    },
                    ncyBreadcrumb: {
                        label: "{{breadcrumb}}"
                    },
                    templateUrl: moduleFolder + "views/overview.html",
                    controller: "arcgisAMOverviewController"
                });
        }
    ]
    );
