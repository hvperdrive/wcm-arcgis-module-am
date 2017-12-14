var async = require("async");
var Q = require("q");
var execute = require("./execute");

module.exports = function(data, path) {
	var prom = Q.defer();

	// Loop over all the request options
	async.eachSeries(data[path], function(item, callback) {
		// Execute single request
		execute(item.options)
			.then(function onSuccess(response) {
				// Save arcgisRef
				item.ref.arcgisRef = response.objectId;
				callback();
			}, function() {
				callback();
			});
	}, function() {
		prom.resolve(data);
	});

	return prom.promise;
};
