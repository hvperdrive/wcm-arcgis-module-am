require("rootpath")();
var _ = require("lodash");
var Q = require("q");
var ArcgisModel = require("../../../models/arcgis");

module.exports = function(data) {
	var prom = Q.defer();
	var promises = [];

	// Loop over the shapes
	data.shapes.forEach(function(item) {
		if (_.get(item, "ref.arcgisRef")) {
			promises.push(
				// Update single shape
				ArcgisModel
					.update({
						contentRef: item.ref.contentRef,
						drawingRef: item.ref.drawingRef,
						type: item.ref.type.toLowerCase(),
					}, {
						$set: {
							contentRef: item.ref.contentRef,
							drawingRef: item.ref.drawingRef,
							type: item.ref.type.toLowerCase(),
							arcgisRef: item.ref.arcgisRef,
						},
					}, {
						upsert: true,
					})
					.lean()
					.exec()
			);
		} else {
			promises.push(true);
		}
	});

	Q.all(promises)
		.then(function() {
			prom.resolve(data);
		})
		.catch(function() {
			prom.resolve(data);
		});

	return prom.promise;
};
