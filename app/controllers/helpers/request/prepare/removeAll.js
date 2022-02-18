var R = require("ramda");

var POLYGON_TYPE = "polygon";
var POINT_TYPE = "point";
var POLYLINE_TYPE = "polyline";

var getRemoveAllOptionsOfType = R.curry(function getRemoveAllOptionsOfType(type, variables, objectIds) {
	return {
		json: true,
		method: "POST",
		url: variables[type + "Url"] + "/deleteFeatures",
		formData: {
			f: "json",
			where: "1=1",
			objectIds: objectIds.join(","),
		},
	};
});

module.exports = R.curry(function(variables, polygonObjectIds, pointObjectIds, polyLineIds) {
	return [
		getRemoveAllOptionsOfType(POLYGON_TYPE, variables, polygonObjectIds),
		getRemoveAllOptionsOfType(POINT_TYPE, variables, pointObjectIds),
		getRemoveAllOptionsOfType(POLYLINE_TYPE, variables, polyLineIds),
	];
});
