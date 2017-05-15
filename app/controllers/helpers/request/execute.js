var request = require("request");
var _ = require("lodash");
var Q = require("q");

module.exports = function(options) {
    var prom = Q.defer();

    // Execute call to arcgis
    request(options, function(err, data, body) {
        if (data && data.hasOwnProperty("statusCode") && data.statusCode === 200) { // Everything SEEMS fine
            var keys = Object.keys(body);

            if (keys.length === 1 && (keys[0] === "addResults" || keys[0] === "updateResults")) {
                body = body[keys[0]];

                if (_.get(body, "[0].objectId", false) && _.get(body, "[0].success", false) && body[0].success) {
                    // Everything IS fine
                    prom.resolve({
                        objectId: body[0].objectId
                    });
                } else {
                    prom.reject("ObjectId not received from ArcGIS");
                }
            } else {
                prom.reject("Unknown ArcGIS error");
            }
        } else {
            prom.reject(err);
        }
    });

    return prom.promise;
};
