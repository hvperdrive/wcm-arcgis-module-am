var Helpers = require("./helpers");
var VariableHelper = require("../helpers/variables");

module.exports = function(project) {
	// Get the latest variables
	VariableHelper()
		.then(function onSuccessVariables(variables) {
			if (Helpers.validate(project, variables)) { // Check the CT
				// Set start object
				var initialVariables = Helpers.map.init(project, variables);

				Helpers.db.findExistingItems(initialVariables) // Find existing arcgis items
					.then(Helpers.map.attributes) // Set attributes for points/polygons
					.then(Helpers.map.geometry) // Set correct geometry data
					.then(Helpers.request.prepare.upsert) // Create all request objects
					.then(function onSuccess(response) {
						return Helpers.request.multiple(response, "shapes"); // Loop over request objects
					})
					.then(Helpers.db.updateExistingItems) // Update arcgis items
					.then(Helpers.db.findDeletedItems) // Find items that were deleted on the map
					.then(Helpers.map.deletedItems) // Map deleted items with existing items
					.then(Helpers.request.prepare.remove) // Create all request objects
					.then(function onSuccess(response) {
						return Helpers.request.multiple(response, "toDelete"); // Loop over request objects
					})
					.then(Helpers.db.removeDeletedItems) // Update arcgis items
					.catch(function(err) {
						console.log("Oh ooh...", err); // eslint-disable-line no-console
					});
			}
		});
};
