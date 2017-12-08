var request = require("request");
var _ = require("lodash");
var Q = require("q");

var handleUpsertResponse = function handleUpsertResponse(body) {
	var keys = Object.keys(body);

	if (keys.length === 1 && (keys[0] === "addResults" || keys[0] === "updateResults")) {
		body = body[keys[0]];

		if (_.get(body, "[0].objectId", false) && _.get(body, "[0].success", false) && body[0].success) {
			// Everything IS fine
			return Q.when({
				objectId: body[0].objectId,
			});
		}
		return Q.reject("ObjectId not received from ArcGIS");
	}

	return Q.reject("Unknown ArcGIS error");
};

var handleGetResponse = function handleGetResponse(body) {
	return _.get(body, "objectIds", false) ? Q.when(body) : Q.reject("Invalid result from Arcgis");
};

module.exports = function(options) {
	var prom = Q.defer();

	// Execute call to arcgis
	request(options, function(err, data, body) {
		if (_.get(data, "statusCode", false) === 200) { // Everything SEEMS fine
			if (options.method.toLowerCase() !== "get") {
				return handleUpsertResponse(body).then(prom.resolve, prom.reject);
			}

			return handleGetResponse(body).then(prom.resolve, prom.reject);
		}

		return prom.reject(err);
	});

	return prom.promise;
};
