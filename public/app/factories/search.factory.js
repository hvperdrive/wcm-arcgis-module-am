"use strict";

angular
    .module("wcm-arcgis-module-am_0.0.7.factories")
    .factory("arcgisAMFactory", [
        "$http",
        "configuration",

        function(
            $http,
            configuration
        ) {
            var api = configuration.serverPath + configuration.apiPrefix + configuration.apiLevel;
            var factory = {};

            factory.reindexSearch = function() {
                return $http.put(api + "arcgis-am/reindex");
            };

            return factory;
        }
    ]);
