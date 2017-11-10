require("rootpath")();
var Emitter = require("app/middleware/emitter");

var Helpers = require("./helpers");
var VariableHelper = require("../helpers/variables");

Emitter.on("contentRemoved", function(project) {
    if (Helpers.validate(project)) { // Check the CT
        // Get the latest variables
        VariableHelper()
            .then(function onSuccess(variables) {
                return Helpers.map.init(project, variables); // Set start objec()
            })
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
