module.exports = function(data) {
	data.shapes.forEach(function(item) {
		// Set default geometry settings
		item.geometry = [{
			geometry: {
				spatialReference: {
					wkid: 4326,
				},
			},
			attributes: item.attributes,
		}];

		switch (item.shape.geometry.type) {
			// Set polygon geometry
			case "Polygon":
				item.geometry[0].geometry.rings = item.shape.geometry.coordinates;
				break;

			// Set point geometry
			case "Point":
				item.geometry[0].geometry.x = item.shape.geometry.coordinates[0];
				item.geometry[0].geometry.y = item.shape.geometry.coordinates[1];
				break;

			// Set polyLine geometry
			case "LineString":
				item.geometry[0].geometry.rings = item.shape.geometry.coordinates;
				break;

			default:
				console.log("%s not supported at the moment.", item.geometry.type); // eslint-disable-line no-console
		}
	});

	return data;
};
