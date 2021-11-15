var _ = require("lodash");
var Q = require("q");
var VariableHelper = require("@wcm/module-helper").variables;

var packageInfo = null;

var checkUrl = function(url) {
    // Check if last character is a /
	if (url.slice(-1) === "/") {
        // Remove / at the end
		url = url.slice(0, -1);
	}

	return url;
};

var checkVariables = function(response) {
	var prom = Q.defer();

	// Check if variables are defined
	if (_.get(response, "features.variables")) {
		response = response.features.variables;
		// Check if both url's are proved
		if (response.hasOwnProperty("polygonUrl") && response.polygonUrl !== "" && response.hasOwnProperty("pointUrl") && response.pointUrl !== "" && response.hasOwnProperty("polylineUrl") && response.polylineUrl !== "") {
			// Validate url
			response.polygonUrl = checkUrl(response.polygonUrl);
			response.pointUrl = checkUrl(response.pointUrl);
			response.polylineUrl = checkUrl(response.polylineUrl);
			prom.resolve(response);
		} else {
			prom.reject("Url's not set");
		}
	} else {
		prom.reject("Unable to get variables");
	}

	return prom.promise;
};
var set = function set(info) {
	packageInfo = info;
};

module.exports = function(info) {
	var prom = Q.defer();

	if (info) {
		set(info);
	}

	// Get variables from cms
	VariableHelper
		.getAll(packageInfo.name, packageInfo.version)
		.then(function onSuccess(response) {
			return checkVariables(response);
		})
		.then(function onSuccess(response) {
			prom.resolve(response);
		})
		.catch(function onError(responseError) {
			prom.reject(responseError);
		});

	return prom.promise;
};

module.exports.set = set;
module.exports.get = function get() {
	return packageInfo;
};

