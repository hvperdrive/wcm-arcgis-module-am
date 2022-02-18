var R = require("ramda");

var POLYGON_TYPE = "polygon";
var POINT_TYPE = "point";
var POLYLINE_TYPE = "polyline";

var getAllIdsOptionsOfType = R.curry(function getAllIdsOptionsOfType(type, variables) {
	return {
		json: true,
		method: "GET",
		url: variables[type + "Url"] + "/query",
		qs: {
			f: "json",
			where: "1=1",
			returnIdsOnly: true,
		},
	};
});

module.exports = R.juxt([
	getAllIdsOptionsOfType(POLYGON_TYPE),
	getAllIdsOptionsOfType(POINT_TYPE),
	getAllIdsOptionsOfType(POLYLINE_TYPE),
]);
