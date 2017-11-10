var VariablesHelper = require("./helpers/variables");

module.exports = function(app, hooks, info) {
	VariablesHelper.set(info);

	// Require controllers to start listeners
	require("./controllers/create");
	require("./controllers/update");
	require("./controllers/remove");
};
