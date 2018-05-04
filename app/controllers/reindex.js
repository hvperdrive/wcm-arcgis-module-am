var Q = require("q");
var R = require("ramda");

var Helpers = require("./helpers");
var VariableHelper = require("../helpers/variables");
var upsert = require("./upsert");

var getObjectIds = R.pathOr([], ["objectIds"]);

module.exports = function reindex(req, res) {
	var variables;

	return VariableHelper()
		.then(function(result) {
			variables = result;

			return Q.all(
				R.compose(
					R.map(Helpers.request.execute),
					Helpers.request.prepare.getAllIds
				)(variables)
			);
		})
		.then(function(results) {
			return Q.all(R.compose(
				R.map(Helpers.request.execute),
				R.apply(Helpers.request.prepare.removeAll(variables)),
				R.ap([getObjectIds])
			)(results));
		})
		.then(Helpers.db.removeAllItems)
		.then(Helpers.db.getAllProjects)
		.then(R.map(upsert))
		.then(function() {
			return res.status(200).json({ msg: "Reindex started successfully" });
		})
		.catch(function(err) {
			return res.status(503).json({ err: err });
		});
};
