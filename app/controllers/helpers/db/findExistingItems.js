require("rootpath")();
var Q = require("q");
var ArcgisModel = require("../../../models/arcgis");

var map = function(data, response) {
	// Map each shape
	data.shapes = response.map(function(item, i) {
		if (item === null) { // Item does not exits yet, add default property
			return {
				// Create item
				ref: {
					contentRef: data.project.uuid,
					drawingRef: data.project.fields.map.shapes[i].uid,
					type: data.project.fields.map.shapes[i].geometry.type.toLowerCase(),
				},
				shape: data.project.fields.map.shapes[i],
				method: "addFeatures",
			};
		} else { // Add update method
			return {
				// Set item
				ref: item,
				shape: data.project.fields.map.shapes[i],
				method: "updateFeatures",
			};
		}
	});
	return data;
};

module.exports = function(data) {
	var prom = Q.defer();
	var promises = [];

	// Loop over the shapes
	data.project.fields.map.shapes.forEach(function(item) {
		promises.push(
			// Find arcgis object for each shape
			ArcgisModel
				.findOne({
					contentRef: data.project.uuid,
					drawingRef: item.uid,
					type: item.geometry.type.toLowerCase(),
				})
				.lean()
				.exec()
		);
	});

	// Wait for all promises to finish
	Q.all(promises)
		.then(function onSuccess(response) {
			prom.resolve(map(data, response));
		});

	return prom.promise;
};
