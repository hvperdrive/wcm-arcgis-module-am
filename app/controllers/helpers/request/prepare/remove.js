module.exports = function(data) {
	data.toDelete.forEach(function(item) {
		// Set delete request
		item.options = {
			json: true,
			method: "POST",
			url: data.variables[item.type + "Url"] + "/deleteFeatures",
			qs: {
				f: "json",
				objectIds: parseInt(item.arcgisRef),
			},
		};
	});

	return data;
};
