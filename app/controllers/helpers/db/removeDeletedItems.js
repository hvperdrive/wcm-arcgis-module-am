require("rootpath")();
var _ = require("lodash");
var Q = require("q");
var ArcgisModel = require("../../../models/arcgis");

module.exports = function(data) {
	var prom = Q.defer();

	// Remove deleted shapes
	ArcgisModel
		.remove({
			_id: {
				$in: _.map(data.toDelete, "_id"),
			},
		})
		.exec();
	prom.resolve(data);

	return prom.promise;
};
