var R = require("ramda");

module.exports = function(data) {
	data.shapes = R.reduce(function(arr, item) {
		if (!data.variables[item.ref.type + "Url"]) {
			return arr;
		}

		// Set create/update request
		return arr.concat(R.set(R.lensProp("options"), {
			json: true,
			method: "POST",
			url: data.variables[item.ref.type + "Url"] + "/" + item.method,
			formData: {
				features: JSON.stringify(item.geometry),
				f: "json",
			},
		}, item));
	}, [], data.shapes);

	return data;
};
